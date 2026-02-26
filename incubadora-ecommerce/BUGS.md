# 🐛 Lista de Bugs e Problemas

Este documento lista bugs e problemas identificados no projeto.

---

## 🔴 Críticos (Impedem Funcionamento)

### 1. Tabela `cart_items` não é criada no migration

**Arquivo:** `backend/src/config/migrate.ts`

**Problema:** O script de migration não cria a tabela `cart_items`, mas o código em `cartModel.ts` tenta usar essa tabela.

**Impacto:** Aplicação quebra ao tentar adicionar itens ao carrinho.

---

### 2. CheckoutModal não envia os items para criação do pedido

**Arquivo:** `frontend/features/cart/components/CheckoutModal.tsx`

**Problema:** O modal envia apenas `customer_email` e `shipping_address`, mas o backend espera um array `items` com `product_id` e `quantity`.

**Linha:** 42-45

```typescript
const response = await apiClient.post("/orders", {
	customer_email: data.customerEmail,
	shipping_address: data.shippingAddress,
});
```

**Impacto:** Criação de pedidos falha sempre com erro 400.

---

### 3. Resposta do `/auth/me` inconsistente com código do frontend

**Arquivo:** `frontend/features/auth/store/index.ts` linha 52

**Problema:** O código faz `response.data` mas o backend retorna `{ user: {...} }`, não o usuário diretamente.

**Impacto:** `checkAuth()` não funciona corretamente.

---

## 🟠 Altos (Problemas de Segurança/Performance)

### 4. JWT_SECRET com fallback inseguro

**Arquivo:** `backend/src/utils/jwt.ts` linha 4

**Problema:**

```typescript
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
```

**Impacto:** Em produção sem `.env`, tokens podem ser forjados.

---

### 5. CORS aceita qualquer origem

**Arquivo:** `backend/src/server.ts` linha 13

**Problema:** `app.use(cors())` permite requisições de qualquer origem.

**Impacto:** Vulnerável a ataques CSRF.

---

### 6. Possível SQL Injection em updateProduct

**Arquivo:** `backend/src/models/productModel.ts` linha 45

**Problema:** Usa interpolação de string para nomes de colunas:

```typescript
const setClauses = entries.map(([key], i) => `${key} = $${i + 1}`);
```

**Impacto:** Se `key` vier de input não validado, pode executar SQL malicioso.

---

### 7. Sem verificação de estoque ao adicionar ao carrinho

**Arquivo:** `backend/src/controllers/cartController.ts`

**Problema:** Não valida se há estoque disponível antes de adicionar ao carrinho.

**Impacto:** Usuário pode adicionar 1000 unidades de produto com estoque 10.

---

### 8. Sem rate limiting nas rotas

**Arquivo:** `backend/src/server.ts`

**Problema:** API não tem limitação de requisições.

**Impacto:** Vulnerável a ataques DDoS e brute force em `/auth/login`.

---

## 🟡 Médios (Bugs Funcionais)

### 9. Paginação não implementada no backend

**Arquivo:** `backend/src/controllers/productController.ts`

**Problema:** `features.md` menciona "paginação" mas `getAll()` retorna todos os produtos sem limite.

**Impacto:** Performance degrada com muitos produtos.

---

### 10. Pedido pode ser criado sem items

**Arquivo:** `backend/src/models/orderModel.ts`

**Problema:** Validação `items.min(1)` está no controller, mas se for bypassada, pedido vazio é criado.

**Impacto:** Pedidos inválidos no banco.

---

### 11. Status do pedido "paid" sobrescreve sem validação

**Arquivo:** `backend/src/models/orderModel.ts` linha 136

**Problema:** `simulatePayment` muda status para "paid" sem verificar se já está "shipped" ou "delivered".

**Impacto:** Pedidos já processados podem ser marcados como "paid" novamente.

---

### 12. getCartByUserId não verifica se produto ainda existe

**Arquivo:** `backend/src/models/cartModel.ts`

**Problema:** JOIN pode falhar silenciosamente se produto foi deletado.

**Impacto:** Carrinho não carrega ou exibe dados inconsistentes.

---

### 13. updateProduct permite update vazio

**Arquivo:** `backend/src/models/productModel.ts` linha 41

**Problema:** Se `entries.length === 0`, retorna produto sem fazer UPDATE, mas não indica erro.

**Impacto:** Clientes podem pensar que update falhou quando na verdade nenhum campo foi enviado.

---

### 14. Logout não limpa carrinho local

**Arquivo:** `frontend/features/auth/store/index.ts` linha 45

**Problema:** `logout()` limpa auth mas não limpa o carrinho do Zustand.

**Impacto:** Próximo usuário vê carrinho do anterior por alguns segundos.

---

### 15. Middleware do Next.js não protege rotas admin

**Arquivo:** `frontend/middleware.ts`

**Problema:** Apenas protege `/cart` e `/orders`, mas não há rotas admin no frontend.

**Impacto:** Inconsistência entre features.md (que menciona admin) e implementação.

---

## 🟢 Baixos (Melhorias de Código)

### 16. Console.log em código de produção

**Arquivos:** Vários (`server.ts`, `authController.ts`, etc.)

**Problema:** Logs com `console.log` e `console.error` em handlers.

**Impacto:** Performance e segurança (expõe stack traces).

---

### 17. Falta arquivo `.env.example`

**Arquivo:** Não existe

**Problema:** Desenvolvedores não sabem quais variáveis de ambiente configurar.

**Impacto:** Erro ao rodar projeto pela primeira vez.

---

### 18. Tipo `User` expõe `password_hash`

**Arquivo:** `backend/src/types/index.ts`

**Problema:** Tipo `User` inclui `password_hash` que nunca deveria ser retornado.

**Impacto:** Risco de vazar hash acidentalmente em logs ou respostas.

---

### 19. Transformação de resultados do carrinho é frágil

**Arquivo:** `backend/src/models/cartModel.ts` linhas 46-60

**Problema:** Mapeia colunas com aliases `"product.name"` manualmente.

**Impacto:** Código difícil de manter e propenso a erros.

---

### 20. Erro de digitação em nomenclatura de rotas

**Arquivo:** `backend/src/routes/cartRoutes.ts`

**Problema:** Rota POST deveria ser `/cart` mas está como `/cart/add`.

**Impacto:** Inconsistência REST (POST em coleção deve criar item).

---

### 21. Sem tratamento de erros de conexão com banco

**Arquivo:** `backend/src/config/database.ts`

**Problema:** Em caso de erro, faz `process.exit(-1)` imediatamente.

**Impacto:** Em ambientes cloud, o container morre sem tentar reconectar.

---

### 22. Seeds executam verificação de admin de forma ineficiente

**Arquivo:** `backend/src/config/seed.ts` linha 9

**Problema:** Faz query para verificar admin mesmo quando seeds já rodaram.

**Impacto:** Query desnecessária toda vez que script roda.

---

## 📋 Resumo

- **Críticos:** 3 bugs
- **Altos:** 5 bugs
- **Médios:** 7 bugs
- **Baixos:** 7 problemas

**Total:** 22 issues identificados
