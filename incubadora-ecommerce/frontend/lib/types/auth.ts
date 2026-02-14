export interface User {
  id: number;
  email: string;
  name: string | null;
  role: 'client' | 'admin';
  created_at: Date | string;
}

export interface AuthResponse {
  token: string;
  user: User;
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
