# Frontend - E-commerce

Aplicação web de e-commerce desenvolvida com Next.js 15, React 19 e TypeScript.

## 🚀 Stack Tecnológica

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utility-first
- **shadcn/ui** - Componentes UI reutilizáveis
- **Zustand** - State management leve e performático
- **React Hook Form** + **Zod** - Formulários e validação
- **Axios** - Cliente HTTP

## ✨ Features Implementadas

- ✅ Autenticação completa (Login/Registro/Logout)
- ✅ Persistência de sessão com localStorage
- ✅ Listagem de produtos com Server Components
- ✅ Página de detalhes do produto
- ✅ Carrinho de compras funcional
- ✅ Checkout com validação de formulário
- ✅ Histórico completo de pedidos
- ✅ Visualização de detalhes do pedido
- ✅ Interface 100% em português (pt-BR)
- ✅ Proteção de rotas autenticadas
- ✅ Design responsivo (mobile-first)
- ✅ Loading states e skeleton screens
- ✅ Toast notifications com Sonner

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend rodando em `http://localhost:3000`
- npm ou yarn

## ⚙️ Instalação

1. Entre na pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

⚠️ **IMPORTANTE:** Coloque `NEXT_PUBLIC_` antes de variáveis que serão usadas no browser!

## 🏃 Executar

### Modo desenvolvimento:
```bash
npm run dev
```

Aplicação disponível em `http://localhost:3001`

### Build para produção:
```bash
npm run build
npm start
```

### Lint:
```bash
npm run lint
```

## 📁 Arquitetura

Feature-First (Domain-Driven Design) + Server/Client Components

```
frontend/
├── app/                    # App Router (Next.js 15)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   │   ├── login/         # Página de login
│   │   └── register/      # Página de registro
│   ├── (shop)/            # Grupo de rotas da loja
│   │   ├── layout.tsx     # Layout compartilhado
│   │   ├── page.tsx       # Home (produtos)
│   │   ├── cart/          # Carrinho
│   │   ├── orders/        # Pedidos
│   │   │   ├── page.tsx   # Lista de pedidos
│   │   │   └── [id]/      # Detalhe do pedido
│   │   └── products/      # Produtos
│   │       ├── page.tsx   # Lista de produtos
│   │       └── [id]/      # Detalhe do produto
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Providers globais
│   └── globals.css        # Estilos globais
│
├── features/              # Features por domínio
│   ├── auth/
│   │   ├── schemas/       # Validação Zod
│   │   ├── store/         # Zustand store
│   │   └── types/         # TypeScript types
│   ├── cart/
│   │   ├── components/    # CartItem, CartSummary, CheckoutModal
│   │   ├── store/         # Cart state
│   │   └── types/
│   ├── orders/
│   │   ├── components/    # OrderCard, OrderStatus
│   │   ├── schemas/
│   │   └── types/
│   └── products/
│       ├── components/    # ProductCard, ProductGrid, ProductRating
│       └── types/
│
├── shared/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── layout/       # Header, Footer
│   ├── lib/              # Utilitários
│   │   ├── api-client.ts # Axios configurado
│   │   ├── error-handler.ts
│   │   └── utils.ts      # Helper functions
│   └── store/            # Stores globais
│
├── middleware.ts         # Next.js middleware (rotas protegidas)
└── package.json
```

## 🎨 Principais Componentes

### Auth
- **LoginForm** / **RegisterForm** - Formulários de autenticação com validação Zod
- **useAuthStore** - Zustand store para gestão de sessão

### Products
- **ProductGrid** - Grid responsivo de produtos
- **ProductCard** - Card individual de produto
- **ProductDetailClient** - Detalhes do produto
- **ProductRating** - Exibição de avaliações
- **QuantitySelector** - Seletor de quantidade

### Cart
- **CartItem** - Item individual no carrinho
- **CartSummary** - Resumo com total
- **CheckoutModal** - Modal de finalização
- **useCartStore** - Gestão do carrinho

### Orders
- **OrderCard** - Card de pedido
- **OrderStatus** - Badge de status

### Shared
- **Header** - Cabeçalho com navegação
- **Footer** - Rodapé
- Componentes shadcn/ui (Button, Card, Input, etc.)

## 🔐 Fluxo de Autenticação

1. Usuário faz login/registro
2. Backend retorna JWT token
3. Token armazenado no Zustand (persiste em localStorage)
4. api-client adiciona token automaticamente em todas requisições
5. Middleware do Next.js protege rotas `/cart` e `/orders`
6. Em 401, redireciona para `/login`

## 🛒 Fluxo do Carrinho

1. Adicionar produto → Zustand + Backend
2. Carrinho persiste após reload
3. Checkout valida endereço/email
4. Cria pedido no backend
5. Limpa carrinho após sucesso

## 🎯 Melhorias Implementadas

- ✅ API client com interceptors automáticos
- ✅ Error handling com toast notifications
- ✅ Loading states e skeleton screens
- ✅ Empty states para listas vazias
- ✅ Proteção de rotas
- ✅ Validação com Zod

## 🚀 Scripts

```bash
npm run dev       # Desenvolvimento (hot reload)
npm run build     # Build para produção
npm start         # Rodar build de produção
npm run lint      # Executar ESLint
```

## 🔧 Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Importante:** Incluir `/api` no final, pois o backend usa este prefixo.

## 📱 Responsividade

Mobile-first e adaptado para:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🧪 Testando

1. Backend rodando em `http://localhost:3000`
2. Frontend: `npm run dev`
3. Acesse `http://localhost:3001`
4. Credenciais de teste:
   - **Cliente:** `client@email.com` / `client123`
   - **Admin:** `admin@email.com` / `admin123`

## 🐛 Troubleshooting

- Verifique se backend está rodando
- Confirme URL no `.env.local`
- Console do browser (F12)
- Limpe localStorage se necessário

## 📝 Melhorias Futuras

MVP atual. Oportunidades:

- [ ] Testes (Jest, Testing Library, Playwright)
- [ ] Filtros e busca de produtos
- [ ] Sistema de favoritos
- [ ] Painel administrativo
- [ ] Dark mode
- [ ] PWA (offline-first)
- [ ] SSR/SSG para SEO
- [ ] Acessibilidade (WCAG)
