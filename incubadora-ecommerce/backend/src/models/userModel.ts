import pool from '../config/database';
import bcrypt from 'bcrypt';
import { User, UserResponse } from '../types';

const SALT_ROUNDS = 10;

export const createUser = async (
  email: string,
  password: string,
  name?: string,
  role: 'client' | 'admin' = 'client'
): Promise<UserResponse> => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query<User>(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role, created_at`,
    [email, passwordHash, name || null, role]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<UserResponse | null> => {
  const result = await pool.query<UserResponse>(
    'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0] || null;
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const excludePassword = (user: User): UserResponse => {
  const { password_hash, updated_at, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
