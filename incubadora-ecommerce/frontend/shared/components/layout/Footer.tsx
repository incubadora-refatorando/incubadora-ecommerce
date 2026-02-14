import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Shopcart</h3>
            <p className="text-gray-light text-sm">
              Seu e-commerce de confiança com os melhores produtos e preços.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Loja</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-light hover:text-white transition">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-light hover:text-white transition">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-light hover:text-white transition">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" className="text-gray-light hover:text-white transition">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-light hover:text-white transition">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Conta</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-gray-light hover:text-white transition">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-light hover:text-white transition">
                  Cadastrar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-medium mt-8 pt-8 text-center text-sm text-gray-light">
          <p>&copy; {new Date().getFullYear()} Shopcart. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
