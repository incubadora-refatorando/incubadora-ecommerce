import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware simplificado - autenticação é tratada no backend e no api-client
  // O api-client redireciona automaticamente para /login em caso de 401
  return NextResponse.next();
}

export const config = {
  matcher: ['/cart/:path*', '/orders/:path*'],
};
