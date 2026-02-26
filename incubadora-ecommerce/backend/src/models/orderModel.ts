import pool from "../config/database";
import { Order, OrderItem, OrderItemInput, OrderWithItems } from "../types";

export const createOrder = async (
	userId: number,
	customerEmail: string,
	shippingAddress: string,
	items: OrderItemInput[],
): Promise<OrderWithItems> => {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		// Calculate total from items (fetch prices from DB)
		let totalAmount = 0;
		const orderItems: Omit<OrderItem, "id" | "order_id">[] = [];

		for (const item of items) {
			const productResult = await client.query(
				"SELECT id, price, stock FROM products WHERE id = $1",
				[item.product_id],
			);

			if (productResult.rows.length === 0) {
				throw new Error(`Product with id ${item.product_id} not found`);
			}

			const product = productResult.rows[0];

			if (product.stock < item.quantity) {
				throw new Error(`Insufficient stock for product id ${item.product_id}`);
			}

			const subtotal = product.price * item.quantity;
			totalAmount += subtotal;

			orderItems.push({
				product_id: item.product_id,
				quantity: item.quantity,
				unit_price: product.price,
				subtotal,
			});

			// Decrease stock
			await client.query(
				"UPDATE products SET stock = stock - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
				[item.quantity, item.product_id],
			);
		}

		// Create order
		const orderResult = await client.query<Order>(
			`INSERT INTO orders (user_id, total_amount, customer_email, shipping_address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
			[userId, totalAmount, customerEmail, shippingAddress],
		);

		const order = orderResult.rows[0];

		// Create order items
		const createdItems: OrderItem[] = [];
		for (const item of orderItems) {
			const itemResult = await client.query<OrderItem>(
				`INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
				[
					order.id,
					item.product_id,
					item.quantity,
					item.unit_price,
					item.subtotal,
				],
			);
			createdItems.push(itemResult.rows[0]);
		}

		await client.query("COMMIT");

		return { ...order, items: createdItems };
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}
};

export const findOrdersByUserId = async (
	userId: number,
): Promise<OrderWithItems[]> => {
	const ordersResult = await pool.query<Order>(
		"SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
		[userId],
	);

	const orders: OrderWithItems[] = [];

	for (const order of ordersResult.rows) {
		const itemsResult = await pool.query<OrderItem>(
			"SELECT * FROM order_items WHERE order_id = $1",
			[order.id],
		);
		orders.push({ ...order, items: itemsResult.rows });
	}

	return orders;
};

export const findOrderById = async (
	orderId: number,
): Promise<OrderWithItems | null> => {
	const orderResult = await pool.query<Order>(
		"SELECT * FROM orders WHERE id = $1",
		[orderId],
	);

	if (orderResult.rows.length === 0) return null;

	const order = orderResult.rows[0];

	const itemsResult = await pool.query<OrderItem>(
		"SELECT * FROM order_items WHERE order_id = $1",
		[order.id],
	);

	return { ...order, items: itemsResult.rows };
};

export const findAllOrders = async (): Promise<OrderWithItems[]> => {
	const ordersResult = await pool.query<Order>(
		"SELECT * FROM orders ORDER BY created_at DESC",
	);

	const orders: OrderWithItems[] = [];

	for (const order of ordersResult.rows) {
		const itemsResult = await pool.query<OrderItem>(
			"SELECT * FROM order_items WHERE order_id = $1",
			[order.id],
		);
		orders.push({ ...order, items: itemsResult.rows });
	}

	return orders;
};

export const simulatePayment = async (orderId: number): Promise<Order> => {
	const result = await pool.query<Order>(
		`UPDATE orders SET payment_status = TRUE, status = 'paid', updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
		[orderId],
	);

	if (result.rows.length === 0) {
		throw new Error("Order not found");
	}

	return result.rows[0];
};

export const updateOrderStatus = async (
	orderId: number,
	status: "pending" | "paid" | "shipped" | "delivered",
): Promise<Order> => {
	const result = await pool.query<Order>(
		`UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
		[status, orderId],
	);

	if (result.rows.length === 0) {
		throw new Error("Order not found");
	}

	return result.rows[0];
};
