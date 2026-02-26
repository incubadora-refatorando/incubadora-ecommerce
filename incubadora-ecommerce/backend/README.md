# E-commerce Backend API

Backend API REST para e-commerce com Node.js, Express, TypeScript e PostgreSQL.

## 🚀 Tecnologias

- **Node.js 18+** + **Express** - Runtime e framework web
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **Bcrypt** - Hash seguro de senhas
- **Zod** - Validação de dados

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

## ⚙️ Instalação

1. Entre na pasta backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce
JWT_SECRET=seu-secret-super-secreto-mude-em-producao
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANTE:** Nunca commite o arquivo `.env` no git!

4. Crie o banco de dados:

```bash
# No PostgreSQL
createdb ecommerce
```

5. Execute as migrations:

```bash
npm run migrate
```

✅ **Migrations incluem:**

- Tabela `users` (com role admin/client)
- Tabela `products` (com estoque)
- Tabela `cart_items` ✅ (corrigido)
- Tabela `orders` (com status)
- Tabela `order_items`
- Índices para performance

6. (Opcional) Popule com dados de teste:

```bash
npm run seed
```

## 🏃 Executando

### Modo desenvolvimento (com hot reload):

```bash
npm run dev
```

Servidor rodando em `http://localhost:3000`

### Modo produção:

```bash
npm run build
npm start
```

## 📚 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações (DB, migrations, seeds)
│   ├── controllers/      # Lógica de negócio
│   │   ├── authController.ts
│   │   ├── cartController.ts
│   │   ├── orderController.ts
│   │   └── productController.ts
│   ├── middleware/       # Middlewares (auth, admin)
│   ├── models/           # Acesso ao banco de dados
│   ├── routes/           # Definição de rotas
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilitários (JWT)
│   └── server.ts         # Entrada da aplicação
└── package.json
```

## 🔐 Autenticação

### POST /api/auth/register

Registrar novo usuário

**Request:**

```json
{
	"email": "user@example.com",
	"password": "senha123",
	"name": "Nome do Usuário"
}
```

**Response (201):**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": 1,
		"email": "user@example.com",
		"name": "Nome do Usuário",
		"role": "client",
		"created_at": "2024-01-01T00:00:00.000Z"
	}
}
```

### POST /api/auth/login

Fazer login

**Request:**

```json
{
	"email": "user@example.com",
	"password": "senha123"
}
```

**Response (200):**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": 1,
		"email": "user@example.com",
		"name": "Nome do Usuário",
		"role": "client",
		"created_at": "2024-01-01T00:00:00.000Z"
	}
}
```

### GET /api/auth/me

Obter dados do usuário autenticado (requer autenticação)

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
	"user": {
		"id": 1,
		"email": "user@example.com",
		"name": "Nome do Usuário",
		"role": "client",
		"created_at": "2024-01-01T00:00:00.000Z"
	}
}
```

## 🧪 Credenciais de Teste

Após rodar o seed, você pode usar:

**Admin:**

- Email: `admin@email.com`
- Senha: `admin123`

**Cliente:**

- Email: `client@email.com`
- Senha: `client123`

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/          # Configurações (database, migrations)
│   ├── controllers/     # Lógica das rotas
│   ├── models/          # Modelos do banco de dados
│   ├── routes/          # Definição das rotas
│   ├── middleware/      # Autenticação, validação
│   ├── utils/           # Funções auxiliares
│   ├── types/           # TypeScript types e interfaces
│   └── server.ts        # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## 🔒 Status HTTP

- `200` - Sucesso
- `201` - Criado
- `400` - Bad Request (dados inválidos)
- `401` - Não autenticado
- `403` - Não autorizado (sem permissão)
- `404` - Não encontrado
- `500` - Erro interno

## 📝 Licença

MIT
