import apiClient from '@/shared/lib/api-client';
import { AuthResponse, User, LoginRequest, RegisterRequest } from '../types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  me: () => apiClient.get<User>('/auth/me'),
};
