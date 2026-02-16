import axios from 'axios';

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
