export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  role: 'client' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  role: 'client' | 'admin';
  created_at: Date;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: 'client' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
