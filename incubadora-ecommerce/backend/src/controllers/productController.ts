import { Request, Response } from 'express';
import { z } from 'zod';
import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../models/productModel';

const createProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  image_url: z.string().url('Invalid URL format').optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative').optional(),
});

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  image_url: z.string().url().optional(),
  stock: z.number().int().min(0).optional(),
});

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await findAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }

    const product = await findProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = createProductSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const { name, price, description, image_url, stock } = parsed.data;
    const product = await createProduct(name, price, description, image_url, stock);

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }

    const parsed = updateProductSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    const product = await updateProduct(id, parsed.data);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }

    const deleted = await deleteProduct(id);

    if (!deleted) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
