# Frontend - E-commerce

Aplicação web de e-commerce desenvolvida com Next.js 16, React 19 e TypeScript.

## Stack

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **shadcn/ui** - Componentes UI
- **Zustand** - State management
- **React Hook Form** + **Zod** - Forms e validação
- **Axios** - Cliente HTTP

## Features

- ✅ Autenticação (Login/Registro)
- ✅ Listagem e busca de produtos
- ✅ Página de detalhes do produto
- ✅ Carrinho de compras
- ✅ Checkout com validação
- ✅ Histórico de pedidos
- ✅ Interface 100% em pt-BR
- ✅ Proteção de rotas autenticadas
- ✅ Design responsivo

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com a URL da API backend
```

## Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start
```

A aplicação estará disponível em `http://localhost:3001`

## Arquitetura

Feature-First (Domain-Driven Design)

```
frontend/
├── app/                    # App Router (Next.js 16)
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   └── (shop)/            # Rotas da loja
│       ├── cart/          # Carrinho
│       ├── orders/        # Pedidos
│       └── products/      # Produtos
│
├── features/              # Features organizadas por domínio
│   ├── auth/
│   │   ├── api/          # Chamadas API
│   │   ├── schemas/      # Validação Zod
│   │   ├── store/        # State Zustand
│   │   └── types/        # TypeScript types
│   ├── cart/
│   │   ├── components/   # CartItem, CartSummary, CheckoutModal
│   │   ├── api/
│   │   ├── store/
│   │   └── types/
│   ├── orders/
│   │   ├── components/   # OrderCard, OrderStatus
│   │   ├── api/
│   │   ├── schemas/
│   │   └── types/
│   └── products/
│       ├── components/   # ProductCard, ProductGrid, ProductRating
│       ├── api/
│       └── types/
│
└── shared/
    ├── components/
    │   ├── ui/           # shadcn/ui components
    │   └── layout/       # Header, Footer
    └── lib/              # Utilitários (api-client, utils)
```

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build produção
npm run start     # Rodar produção
npm run lint      # Lint código
```

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Importante:** A URL deve incluir `/api` no final, pois o backend serve todas as rotas sob este prefixo.

## Melhorias Sugeridas

Este é um MVP. Oportunidades de melhoria:

- [ ] Testes unitários e E2E
- [ ] Galeria de imagens dos produtos
- [ ] Filtros e ordenação de produtos
- [ ] Sistema de favoritos/wishlist
- [ ] Integração de pagamento real
- [ ] Painel administrativo
- [ ] Otimização de bundle
- [ ] SSR/SSG para SEO
- [ ] Acessibilidade (ARIA)
- [ ] Dark mode
