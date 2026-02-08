import { Request, Response } from 'express';
import { z } from 'zod';
import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeFromCart,
} from '../models/cartModel';

const addToCartSchema = z.object({
  product_id: z.number().int().positive('Product ID must be a positive integer'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

const updateCartSchema = z.object({
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = addToCartSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { product_id, quantity } = parsed.data;
    const userId = req.user!.userId;

    const cartItem = await addToCart(userId, product_id, quantity);

    res.status(201).json({ cartItem });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error adding to cart';
    res.status(500).json({ error: message });
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const cartItems = await getCartByUserId(userId);

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({ cartItems, total });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartItemId = parseInt(req.params.id);

    if (isNaN(cartItemId)) {
      res.status(400).json({ error: 'Invalid cart item ID' });
      return;
    }

    const parsed = updateCartSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { quantity } = parsed.data;
    const userId = req.user!.userId;

    const updatedItem = await updateCartItem(cartItemId, userId, quantity);

    if (!updatedItem) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }

    res.status(200).json({ cartItem: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item' });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartItemId = parseInt(req.params.id);

    if (isNaN(cartItemId)) {
      res.status(400).json({ error: 'Invalid cart item ID' });
      return;
    }

    const userId = req.user!.userId;
    const removed = await removeFromCart(cartItemId, userId);

    if (!removed) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};
