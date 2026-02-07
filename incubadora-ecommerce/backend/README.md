# E-commerce Backend API

Backend API para e-commerce com Node.js, Express, TypeScript e PostgreSQL.

## 🚀 Tecnologias

- Node.js + Express
- TypeScript
- PostgreSQL
- JWT (autenticação)
- Bcrypt (hash de senhas)
- Zod (validação)

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

## ⚙️ Instalação

1. Clone o repositório e entre na pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=development
```

4. Crie o banco de dados PostgreSQL:
```bash
createdb ecommerce
```

5. Execute as migrations:
```bash
npm run migrate
```

6. (Opcional) Popule o banco com dados de teste:
```bash
npm run seed
```

## 🏃 Executando

### Modo desenvolvimento:
```bash
npm run dev
```

### Modo produção:
```bash
npm run build
npm start
```

## 🔐 Endpoints de Autenticação

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
