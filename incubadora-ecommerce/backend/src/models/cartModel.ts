import pool from '../config/database';
import { CartItem, CartItemWithProduct } from '../types';

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  // Check if item already exists in cart
  const existingItem = await pool.query<CartItem>(
    'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );

  if (existingItem.rows.length > 0) {
    // Update quantity if item exists
    const result = await pool.query<CartItem>(
      'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, userId, productId]
    );
    return result.rows[0];
  } else {
    // Insert new item
    const result = await pool.query<CartItem>(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    return result.rows[0];
  }
};

export const getCartByUserId = async (userId: number): Promise<CartItemWithProduct[]> => {
  const result = await pool.query<CartItemWithProduct>(
    `SELECT
      ci.id,
      ci.user_id,
      ci.product_id,
      ci.quantity,
      ci.created_at,
      p.id as "product.id",
      p.name as "product.name",
      p.description as "product.description",
      p.price as "product.price",
      p.image_url as "product.image_url",
      p.stock as "product.stock",
      (ci.quantity * p.price) as subtotal
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = $1
    ORDER BY ci.created_at DESC`,
    [userId]
  );

  // Transform flat result to nested structure
  return result.rows.map((row: any) => ({
    id: row.id,
    user_id: row.user_id,
    product_id: row.product_id,
    quantity: row.quantity,
    created_at: row.created_at,
    product: {
      id: row['product.id'],
      name: row['product.name'],
      description: row['product.description'],
      price: row['product.price'],
      image_url: row['product.image_url'],
      stock: row['product.stock'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    subtotal: parseFloat(row.subtotal),
  }));
};

export const updateCartItem = async (
  cartItemId: number,
  userId: number,
  quantity: number
): Promise<CartItem | null> => {
  const result = await pool.query<CartItem>(
    'UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [quantity, cartItemId, userId]
  );

  return result.rows[0] || null;
};

export const removeFromCart = async (
  cartItemId: number,
  userId: number
): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
    [cartItemId, userId]
  );

  return (result.rowCount ?? 0) > 0;
};

export const clearCart = async (userId: number): Promise<void> => {
  await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
};
