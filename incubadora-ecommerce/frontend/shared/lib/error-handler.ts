import axios from 'axios';

interface ApiError {
  message: string;
  status?: number;
}

/**
 * Extrai mensagem de erro de forma segura de diferentes tipos de erro
 */
export function getErrorMessage(error: unknown): string {
  // Erro do Axios
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.response?.data?.message || error.message;
  }

  // Erro padrão do JavaScript
  if (error instanceof Error) {
    return error.message;
  }

  // String
  if (typeof error === 'string') {
    return error;
  }

  // Fallback
  return 'Ocorreu um erro inesperado';
}

/**
 * Extrai informações completas de erro para logging
 */
export function getErrorDetails(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.error || error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Erro desconhecido',
  };
}

/**
 * Type guard para verificar se é um erro de autenticação (401)
 */
export function isAuthError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Type guard para verificar se é erro de validação (400)
 */
export function isValidationError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 400;
  }
  return false;
}
