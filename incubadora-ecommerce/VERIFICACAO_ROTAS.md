# ✅ Verificação de Rotas - Backend

## 🔴 Problema Crítico Encontrado

### Conflito de rotas em `cartRoutes.ts`

**Arquivo:** `backend/src/routes/cartRoutes.ts`

**Problema:** Ordem incorreta das rotas DELETE

```typescript
router.delete("/:id", isAuthenticated, remove);  // ❌ Esta vem primeiro
router.delete("/", isAuthenticated, clear);       // ❌ Nunca será alcançada
```

**Impacto:** A rota `DELETE /api/cart` (limpar carrinho completo) nunca será executada porque o Express tenta fazer match com `DELETE /api/cart/:id` primeiro. O Express pode interpretar o path vazio "/" como um parâmetro ID.

**Correção necessária:** Inverter a ordem - rotas sem parâmetros devem vir ANTES das rotas parametrizadas:

```typescript
router.delete("/", isAuthenticated, clear);       // ✅ Vem primeiro (mais específica)
router.delete("/:id", isAuthenticated, remove);  // ✅ Vem depois (menos específica)
```

---

## ✅ Rotas Verificadas e Corretas

### Auth Routes (`/api/auth`)
- ✅ POST `/login` → `authController.login`
- ✅ POST `/register` → `authController.register`
- ✅ GET `/me` → `authController.getMe` (protegida)

### Product Routes (`/api/products`)
- ✅ GET `/` → `productController.getAll` (pública)
- ✅ GET `/:id` → `productController.getById` (pública)
- ✅ POST `/` → `productController.create` (admin)
- ✅ PUT `/:id` → `productController.update` (admin)
- ✅ DELETE `/:id` → `productController.remove` (admin)

### Cart Routes (`/api/cart`)
- ✅ POST `/add` → `cartController.add` (protegida)
- ✅ GET `/` → `cartController.getCart` (protegida)
- ✅ PUT `/:id` → `cartController.update` (protegida)
- ⚠️ DELETE `/:id` → `cartController.remove` (protegida) - **ordem errada**
- ⚠️ DELETE `/` → `cartController.clear` (protegida) - **ordem errada**

### Order Routes (`/api/orders`)
- ✅ POST `/` → `orderController.create` (protegida)
- ✅ GET `/` → `orderController.getMyOrders` (protegida)
- ✅ GET `/admin/all` → `orderController.getAllOrders` (admin)
- ✅ GET `/:id` → `orderController.getById` (protegida)
- ✅ POST `/:id/pay` → `orderController.payOrder` (protegida)
- ✅ PATCH `/:id/status` → `orderController.updateStatus` (admin)

**Nota:** Order routes está correto porque `/admin/all` é mais específico que `/:id`, então está na ordem certa.

---

## ✅ Verificação Frontend → Backend

### Chamadas de API encontradas:

#### Auth (via Zustand)
- ✅ POST `/auth/login` → Rota existe
- ✅ POST `/auth/register` → Rota existe
- ✅ GET `/auth/me` → Rota existe

#### Cart (via Zustand)
- ✅ GET `/cart` → Rota existe
- ✅ POST `/cart/add` → Rota existe
- ✅ PUT `/cart/:id` → Rota existe
- ✅ DELETE `/cart/:id` → Rota existe
- ⚠️ Falta chamada para `DELETE /cart` no frontend (limpar carrinho)

#### Orders (via apiClient direto)
- ✅ GET `/orders` → Rota existe
- ✅ GET `/orders/:id` → Rota existe
- ✅ POST `/orders` → Rota existe (CheckoutModal)

#### Products (via fetch Server Component)
- ✅ GET `/products` → Rota existe
- ✅ GET `/products/:id` → Rota existe

---

## 🔍 Observações Adicionais

### 1. Frontend não usa rota de limpar carrinho
O backend tem a função `clearCart()` e a rota `DELETE /api/cart`, mas o frontend só tem `clearCart()` no Zustand que limpa localmente. Não faz chamada para o backend.

**Impacto:** Carrinho não é limpo no banco após criar pedido.

### 2. Resposta incorreta em `/auth/me`
Como identificado no BUGS.md #3, a rota retorna `{ user: {...} }` mas o frontend espera `response.data` direto.

### 3. CheckoutModal não envia items
Como identificado no BUGS.md #2, o checkout não envia os items do carrinho ao criar pedido.

---

## 📊 Resumo

- **Total de rotas backend:** 21
- **Rotas verificadas e corretas:** 20
- **Rotas com problema de ordem:** 2 (DELETE cart)
- **Rotas usadas pelo frontend:** 10
- **Rotas não utilizadas:** 11 (principalmente admin)
