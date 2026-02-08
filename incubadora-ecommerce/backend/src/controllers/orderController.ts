import { Request, Response } from 'express';
import { z } from 'zod';
import {
  createOrder,
  findOrdersByUserId,
  findOrderById,
  findAllOrders,
  simulatePayment,
} from '../models/orderModel';

const createOrderSchema = z.object({
  customer_email: z.string().email('Invalid email format'),
  shipping_address: z.string().min(10, 'Address must be at least 10 characters'),
  items: z
    .array(
      z.object({
        product_id: z.number().int().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, 'At least one item is required'),
});

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { customer_email, shipping_address, items } = parsed.data;
    const userId = req.user!.userId;

    const order = await createOrder(userId, customer_email, shipping_address, items);

    res.status(201).json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creating order';

    if (message.includes('not found') || message.includes('Insufficient stock')) {
      res.status(400).json({ error: message });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const orders = await findOrdersByUserId(userId);

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await findOrderById(orderId);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Clients can only see their own orders
    if (req.user!.role !== 'admin' && order.user_id !== req.user!.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await findAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const payOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await findOrderById(orderId);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (order.user_id !== req.user!.userId && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    if (order.payment_status) {
      res.status(400).json({ error: 'Order is already paid' });
      return;
    }

    const updatedOrder = await simulatePayment(orderId);

    res.status(200).json({
      message: 'Payment successful (simulated)',
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};
