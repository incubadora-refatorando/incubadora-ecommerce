import apiClient from './client';
import { AuthResponse, User, LoginRequest, RegisterRequest } from '@/lib/types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  me: () => apiClient.get<User>('/auth/me'),
};
