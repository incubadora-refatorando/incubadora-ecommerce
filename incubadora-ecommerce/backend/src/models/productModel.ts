import pool from '../config/database';
import { Product } from '../types';

export const findAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query<Product>(
    'SELECT * FROM products ORDER BY created_at DESC'
  );
  return result.rows;
};

export const findProductById = async (id: number): Promise<Product | null> => {
  const result = await pool.query<Product>(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createProduct = async (
  name: string,
  price: number,
  description?: string,
  imageUrl?: string,
  stock: number = 0
): Promise<Product> => {
  const result = await pool.query<Product>(
    `INSERT INTO products (name, description, price, image_url, stock)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description || null, price, imageUrl || null, stock]
  );
  return result.rows[0];
};

export const updateProduct = async (
  id: number,
  fields: Partial<{ name: string; description: string; price: number; image_url: string; stock: number }>
): Promise<Product | null> => {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);

  if (entries.length === 0) return findProductById(id);

  const setClauses = entries.map(([key], i) => `${key} = $${i + 1}`);
  setClauses.push(`updated_at = CURRENT_TIMESTAMP`);

  const values = entries.map(([, v]) => v);
  values.push(id as any);

  const result = await pool.query<Product>(
    `UPDATE products SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );

  return result.rows[0] || null;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1',
    [id]
  );
  return (result.rowCount ?? 0) > 0;
};
