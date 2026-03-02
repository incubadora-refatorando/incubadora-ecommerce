# 🛒 E-Commerce - Explicado Fácil

Bem-vindo! Este projeto é uma **loja online** que você pode entender e modificar. Vou explicar tudo **de forma bem simples**.

---

## 🤔 O que é este projeto?

Imagine que você quer abrir uma loja online. Você precisa de:

1. **Uma loja** - onde as pessoas veem os produtos (Frontend)
2. **Um depósito** - onde fica o banco de dados com produtos, clientes, pedidos (Backend)
3. **Um sistema de comunicação** entre a loja e o depósito

**Este projeto tem tudo isso!**

---

## 💼 Como funciona bem simples

```
1. Pessoa entra no site (Frontend)
        ↓
2. Clica em um botão (ex: "Ver Produtos")
        ↓
3. O site pergunta para o servidor (Backend): "Me envia os produtos!"
        ↓
4. O servidor abre o banco de dados
        ↓
5. O servidor responde: "Aqui estão os produtos!"
        ↓
6. O site mostra os produtos na tela
```

É assim! Tipo pedir uma pizza por telefone:
- **Você** = Frontend (o cliente)
- **Pizzaria** = Backend (o servidor)
- **Ligação** = Requisição HTTP

---

## 📁 Pasta por pasta - O que faz o quê?

### `/backend` - O coração da loja

Aqui fica tudo que faz a loja funcionar:

```
backend/
├── src/
│   ├── server.ts          ← Inicia o servidor quando você digita 'npm run dev'
│   ├── routes/            ← Define o que cada URL faz
│   │   ├── authRoutes.ts  ← Login e cadastro
│   │   ├── productRoutes.ts ← Informações de produtos
│   │   ├── cartRoutes.ts  ← Carrinho de compras
│   │   └── orderRoutes.ts ← Pedidos
│   ├── controllers/       ← A lógica (o "inteligência")
│   │   └── productController.ts ← "Quando alguém pede produtos, faça isso..."
│   ├── models/            ← Conversa com o banco de dados
│   │   └── productModel.ts ← "Busca produtos no banco"
│   └── config/
│       └── database.ts    ← Conecta com o PostgreSQL
```

**Simples assim**: Uma pessoa clica em um botão → uma rota é acionada → um controller faz algo → um model busca no banco.

### `/frontend` - A cara da loja

Aqui fica o que a pessoa vê:

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/ ← Página de login
│   │   └── register/ ← Página de cadastro
│   └── (shop)/
│       ├── page.tsx ← Página inicial
│       ├── products/ ← Página de produtos
│       ├── cart/ ← Página do carrinho
│       └── orders/ ← Página de pedidos
└── features/
    ├── auth/ ← Toda lógica de login
    ├── products/ ← Toda lógica de produtos
    ├── cart/ ← Toda lógica do carrinho
    └── orders/ ← Toda lógica de pedidos
```

---

## 🚀 Como rodar este projeto (passo a passo)

### Coisa importante: O que você precisa antes

Você precisa ter instalado no seu computador:

1. **Node.js** - Baixe em [nodejs.org](https://nodejs.org) (praticamente obrigatório para JavaScript)
2. **PostgreSQL** - Banco de dados (baixe em [postgresql.org](https://www.postgresql.org/download))
3. **Um editor** - Use VS Code (é de graça)

### Passo 1: Configure o banco de dados

Abra o PostgreSQL e **crie um banco de dados vazio** chamado `ecommerce_dev`.

Depois, na pasta `backend`, crie um arquivo chamado `.env` com isso:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/ecommerce_dev
PORT=3000
NODE_ENV=development
JWT_SECRET=minha_chave_muito_secreta_12345
```

(Troque `usuario` e `senha` pelos seus dados do PostgreSQL)

### Passo 2: Rode o Backend

Abra o terminal e digite:

```bash
cd backend
npm install
npm run migrate
npm run dev
```

Pronto! O servidor está rodando em `http://localhost:3000`

### Passo 3: Rode o Frontend

Abra **outro terminal** (em outra aba) e digite:

```bash
cd frontend
npm install
npm run dev
```

Pronto! Acesse `http://localhost:3001` no navegador!

---

## 👤 Entendendo Login e Cadastro

### Como funciona o cadastro:

```
1. Pessoa vai para tela de resgistrão
2. Escreve email e senha
3. Clica em "Cadastrar"
4. Frontend envia isso para backend
5. Backend criptografa a senha (transforma em outro texto)
6. Backend salva no banco de dados
7. Pessoa consegue fazer login!
```

### Como funciona o login:

```
1. Pessoa entra com email e senha
2. Backend verifica se existe usuário com esse email
3. Backend criptografa a senha digitada e compara com a do banco
4. Se bater, cria um token (um código único)
5. Frontend guarda esse código
6. De agora em diante, essa pessoa pode acessar tudo!
```

O token é tipo um **crachá**: Você mostra o crachá e entra em qualquer lugar sem precisar digitar senha de novo!

---

## 🛒 Entendendo Carrinho e Compras

### Carrinho (bem simples):

```
1. Pessoa vê um produto legal
2. Clica em "Adicionar ao Carrinho"
3. Produto aparece na página do carrinho
4. Pessoa pode aumentar/diminuir a quantidade
5. Pode ver o total a pagar
```

O carrinho fica **guardado no computador da pessoa**, não no servidor (por enquanto).

### Quando a pessoa compra:

```
1. Pessoa vai para o carrinho
2. Clica em "Finalizar Compra"
3. Frontend envia lista de produtos pro backend
4. Backend cria um pedido no banco
5. Carrinho limpa
6. Pessoa vê pedido na página "Meus Pedidos"
```

---

## 📦 Entendendo Produtos

### Como produt é armazenado:

Cada produto tem:
- **Nome** - O que é o produto
- **Descrição** - Mais detalhes sobre o produto
- **Preço** - Quanto custa
- **Estoque** - Quantos tem disponíveis
- **Imagem** - Foto do produto

### Como funciona:

```
1. Backend tem uma tabela chamada "products" no banco
2. Quando você acessa a página de produtos
3. Frontend pede: "Backend, me envia todos os produtos"
4. Backend responde: "[Camiseta, Calça, Sapato, ...]"
5. Frontend mostra tudo bonitinho na tela
```

---

## 🔐 Entendendo Autenticação

**Autenticação** = Verificar se você é quem você diz ser.

É tipo:
- Você entra em um servidor
- O servidor verifica sua identidade
- Se estiver certo, você consegue fazer coisas
- Se estiver errado, você não consegue

### Como funciona no projeto:

1. Você faz login
2. Backend cria um **token** (um código único)
3. Frontend guarda esse token
4. Quando você clica em algo que precisa de autenticação, frontend envia o token
5. Backend verifica se o token é válido
6. Se for, você consegue fazer a ação
7. Se não for, você volta para a tela de login

O token é **único** para cada pessoa e **expira com o tempo** (tipo um bilhete de transporte).

---

## 🗂️ Tecnologias - Mas de forma fácil

| Coisa | O que faz | Tipo |
|-------|----------|------|
| **Express** | Define rotas (URLs) | Backend |
| **PostgreSQL** | Banco de dados (guarda tudo) | Banco |
| **Next.js** | Framework para fazer sites | Frontend |
| **React** | Tecnologia para criar componentes | Frontend |
| **TypeScript** | JavaScript com tipos (evita erros) | Linguagem |
| **Zustand** | Guarda dados que vários componentes usam | Frontend |
| **JWT** | Cria tokens de autenticação | Segurança |
| **Bcrypt** | Criptografa senhas | Segurança |

---

## 💡 Dicas para deixar as coisas funcionando

### Se der erro no backend:

1. Verifique se PostgreSQL está rodando
2. Verifique se o `.env` está correto
3. Veja a mensagem de erro no terminal - ela fala o que deu errado!

### Se der erro no frontend:

1. Verifique se backend está rodando em `http://localhost:3000`
2. Abra o console do navegador (aperte F12)
3. Veja se tem algum erro vermelho lá

### Testando sem frontend:

Use **Insomnia** ou **Postman** para testar as rotas do backend direto no computador.

---

## 🎯 Fluxo de uma compra real (passo a passo)

```
TELA DE LOGIN
└─ Pessoa entra com email e senha
   └─ Backend valida
      └─ Backend manda token
         └─ Frontend guarda token

TELA DE PRODUTOS
└─ Pessoa vê lista de produtos
   └─ Frontend pede pro backend: "Me envia os produtos!"
      └─ Backend busca no banco
         └─ Backend responde com lista

TELA DE DETALHES DO PRODUTO
└─ Pessoa clica em um produto
   └─ Frontend pede: "Me envia detalhes do produto 5!"
      └─ Backend busca no banco
         └─ Mostra tudo (nome, preço, descrição, avaliações)

ADICIONAR AO CARRINHO
└─ Pessoa clica "Adicionar ao Carrinho"
   └─ Frontend adiciona no carrinho local
      └─ Mostra notificação "Adicionado!"

TELA DO CARRINHO
└─ Pessoa vê tudo que adicionou
   └─ Pode aumentar/diminuir quantidade
      └─ Vê total a pagar

CHECKOUT (Finalizar Compra)
└─ Pessoa clica "Finalizar Compra"
   └─ Frontend envia: "Quero comprar isso!"
      └─ Backend cria pedido no banco
         └─ Backend limpa carrinho
            └─ Frontend mostra: "Compra feita com sucesso!"

PÁGINA DE PEDIDOS
└─ Pessoa acessa "Meus Pedidos"
   └─ Frontend pede: "Me envia meus pedidos!"
      └─ Backend busca pedidos dessa pessoa
         └─ Mostra todos os pedidos com status
```

---

## 📝 Arquivos mais importantes

### Backend

| Arquivo | O que faz |
|---------|-----------|
| `server.ts` | Inicia tudo |
| `routes/` | Define URLs do projeto |
| `controllers/` | Executa a lógica |
| `models/` | Conversa com o banco |
| `config/database.ts` | Conecta com PostgreSQL |

### Frontend

| Arquivo | O que faz |
|---------|-----------|
| `app/layout.tsx` | Estrutura da página |
| `app/(auth)/login/page.tsx` | Página de login |
| `app/(shop)/products/page.tsx` | Página de produtos |
| `features/` | Lógica de cada funcionalidade |
| `shared/store/` | Dados compartilhados |

---

## ✨ O que este projeto consegue fazer

- ✅ Cadastrar usuário
- ✅ Fazer login
- ✅ Ver lista de produtos
- ✅ Ver detalhes de um produto
- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Fazer pedido
- ✅ Ver histórico de pedidos
- ✅ Ver detalhes de cada pedido

---

## 🎓 Próximos passos para aprender

### Fácil:
1. Faça login no site
2. Adicione algo ao carrinho
3. Finalize uma compra
4. Veja seu pedido em "Meus Pedidos"

### Medium:
1. Abra o banco de dados (PostgreSQL) e veja as tabelas
2. Use Insomnia para testar as rotas do backend
3. Abra DevTools (F12) e veja as requisições que o frontend faz

### Difícil:
1. Adicione um novo campo a um produto (ex: cor ou tamanho)
2. Modifique um controller para validar dados diferente
3. Crie uma nova rota no backend

---

## 🐛 Se algo não funcionar

1. **Primeiro**: Leia a mensagem de erro (ela fala o problema!)
2. **Segundo**: Verifique se backend está rodando
3. **Terceiro**: Verifique se frontend está rodando
4. **Quarto**: Abra o console (F12) e veja se tem erro
5. **Quinto**: Procure no código por algo parecido (tipo ctrl+f)

---

## 📞 Resumão (TL;DR)

- Backend = servidor que guarda dados
- Frontend = site que a pessoa vê
- Banco de dados = onde tudo é guardado
- Autenticação = verificar quem você é
- Carrinho = lista de produtos que você quer comprar
- Pedido = compra finalizada

**E pronto! É isso!** 🎉

Boa sorte aprendendo! 🚀
