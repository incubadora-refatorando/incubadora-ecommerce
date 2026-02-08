# 🧪 Testes das APIs

Servidor rodando em: **http://localhost:3000**

## 📋 Credenciais de Teste

**Admin:**
- Email: `admin@email.com`
- Senha: `admin123`

**Cliente:**
- Email: `client@email.com`
- Senha: `client123`

---

## 🔐 1. API de Autenticação

### 1.1 Login (Admin)
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@email.com",
  "password": "admin123"
}
```

**Response esperado (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@email.com",
    "name": "Admin User",
    "role": "admin",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 1.2 Login (Cliente)
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "client@email.com",
  "password": "client123"
}
```

### 1.3 Registrar Novo Usuário
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "novo@email.com",
  "password": "senha123",
  "name": "Novo Usuario"
}
```

### 1.4 Obter Dados do Usuário Logado
```http
GET http://localhost:3000/api/auth/me
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🛍️ 2. API de Produtos

### 2.1 Listar Todos os Produtos (Público)
```http
GET http://localhost:3000/api/products
```

**Response esperado (200):**
```json
[
  {
    "id": 1,
    "name": "Camiseta Básica Preta",
    "description": "Camiseta 100% algodão, cor preta, confortável para o dia a dia.",
    "price": "49.90",
    "image_url": "https://via.placeholder.com/300x300?text=Camiseta+Preta",
    "stock": 100,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2.2 Ver Detalhe de um Produto (Público)
```http
GET http://localhost:3000/api/products/1
```

### 2.3 Criar Produto (Admin Only)
```http
POST http://localhost:3000/api/products
Authorization: Bearer TOKEN_DO_ADMIN
Content-Type: application/json

{
  "name": "Novo Produto",
  "description": "Descrição do novo produto",
  "price": 99.90,
  "image_url": "https://via.placeholder.com/300",
  "stock": 50
}
```

### 2.4 Editar Produto (Admin Only)
```http
PUT http://localhost:3000/api/products/1
Authorization: Bearer TOKEN_DO_ADMIN
Content-Type: application/json

{
  "name": "Produto Editado",
  "price": 79.90,
  "stock": 30
}
```

### 2.5 Deletar Produto (Admin Only)
```http
DELETE http://localhost:3000/api/products/1
Authorization: Bearer TOKEN_DO_ADMIN
```

---

## 📦 3. API de Pedidos (Orders)

### 3.1 Criar Pedido (Autenticado)
```http
POST http://localhost:3000/api/orders
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "customer_email": "client@email.com",
  "shipping_address": "Rua Exemplo, 123, Bairro, Cidade - Estado, CEP 12345-678",
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

**Response esperado (201):**
```json
{
  "order": {
    "id": 1,
    "user_id": 2,
    "total_amount": "229.70",
    "status": "pending",
    "customer_email": "client@email.com",
    "shipping_address": "Rua Exemplo, 123...",
    "payment_status": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "items": [
      {
        "id": 1,
        "order_id": 1,
        "product_id": 1,
        "quantity": 2,
        "unit_price": "49.90",
        "subtotal": "99.80"
      },
      {
        "id": 2,
        "order_id": 1,
        "product_id": 3,
        "quantity": 1,
        "unit_price": "129.90",
        "subtotal": "129.90"
      }
    ]
  }
}
```

### 3.2 Listar Meus Pedidos (Autenticado)
```http
GET http://localhost:3000/api/orders
Authorization: Bearer SEU_TOKEN
```

### 3.3 Ver Detalhe de um Pedido (Autenticado)
```http
GET http://localhost:3000/api/orders/1
Authorization: Bearer SEU_TOKEN
```

### 3.4 Simular Pagamento (Autenticado)
```http
POST http://localhost:3000/api/orders/1/pay
Authorization: Bearer SEU_TOKEN
```

**Response esperado (200):**
```json
{
  "message": "Payment successful (simulated)",
  "order": {
    "id": 1,
    "payment_status": true,
    "status": "paid",
    ...
  }
}
```

### 3.5 Listar Todos os Pedidos (Admin Only)
```http
GET http://localhost:3000/api/orders/admin/all
Authorization: Bearer TOKEN_DO_ADMIN
```

---

## 🧪 Testando no VSCode com Thunder Client

1. Instale a extensão **Thunder Client** no VSCode
2. Abra a extensão (ícone de raio na barra lateral)
3. Clique em "New Request"
4. Cole a URL e o body JSON
5. Para rotas autenticadas:
   - Aba "Headers"
   - Adicione: `Authorization: Bearer SEU_TOKEN`

---

## 🧪 Testando com cURL (Terminal)

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@email.com","password":"admin123"}'
```

### Listar Produtos:
```bash
curl http://localhost:3000/api/products
```

### Criar Pedido (substitua TOKEN):
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "customer_email": "client@email.com",
    "shipping_address": "Rua Exemplo, 123",
    "items": [{"product_id": 1, "quantity": 2}]
  }'
```

---

## 📊 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autenticado (falta token ou token inválido)
- `403` - Sem permissão (não é admin)
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## 🎯 Fluxo de Teste Recomendado

1. **Login como Cliente** → Guardar o token
2. **Listar Produtos** → Ver produtos disponíveis
3. **Criar Pedido** → Fazer um pedido com 2-3 produtos
4. **Simular Pagamento** → Pagar o pedido
5. **Listar Meus Pedidos** → Verificar pedidos criados
6. **Login como Admin** → Guardar token admin
7. **Criar Produto** → Adicionar novo produto (só admin consegue)
8. **Listar Todos os Pedidos (Admin)** → Ver todos os pedidos do sistema

---

🚀 **Servidor rodando em: http://localhost:3000**
