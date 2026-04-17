<div align="center">

# 🍔 Dev Burger — Frontend

**E-commerce completo de hamburgueria com painel administrativo, checkout integrado ao Stripe e acompanhamento de pedidos em tempo real.**

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dev-burger-frontend-nine.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Status](https://img.shields.io/badge/status-em%20produção-success?style=for-the-badge)]()

[🌐 **Demo ao vivo**](https://dev-burger-frontend-nine.vercel.app) · [🔗 **API (backend)**](https://github.com/Doug1980/dev-burger-backend) · [🐛 Reportar bug](https://github.com/Doug1980/dev-burger-frontend/issues)

</div>

---

## 📋 Sobre o projeto

O **Dev Burger** é uma aplicação full-stack de e-commerce para hamburgueria, construída com foco em experiência do usuário, performance e boas práticas de desenvolvimento. O projeto cobre todo o fluxo de uma loja digital real: catálogo, carrinho, pagamento com cartão, acompanhamento de entrega e painel administrativo com notificação de novos pedidos.

Este repositório contém o **frontend** da aplicação. A API está em [`dev-burger-backend`](https://github.com/Doug1980/dev-burger-backend).

---

## ✨ Principais funcionalidades

### 🛒 Área do cliente
- **Autenticação** com JWT e persistência via `localStorage` (zustand + `persist`)
- **Catálogo dinâmico** com categorias, ofertas e produtos vindos da API
- **Carrosséis responsivos** de categorias e ofertas (React Slick) com breakpoints customizados para mobile
- **Carrinho de compras** com controle de quantidade e cálculo de totais em tempo real
- **Checkout com Stripe Elements** (`@stripe/react-stripe-js`) — integração com PaymentIntent e autenticação 3D Secure
- **Acompanhamento do pedido em tempo real** com polling a cada 5s via React Query (`refetchInterval`)
- **Fluxo pós-compra** tratado com estados condicionais — status só aparece quando vindo do checkout, e "Pedir Novamente" limpa a tela

### 🔐 Área administrativa
- **Gestão de produtos** — criar, editar, listar com upload de imagem para Cloudinary
- **Gestão de categorias** — CRUD completo
- **Gestão de pedidos** com:
  - **Auto-refresh** a cada 15s para capturar novos pedidos sem refresh manual
  - **Indicador visual animado** (badge pulsante + destaque na linha) para pedidos ainda não tratados
  - **Filtro por status** com contador de novos pedidos
  - **Dropdown de status** (Pedido Realizado → Em Preparação → Em Rota → Entregue / Cancelado)
- Rotas protegidas por role (`user` vs `admin`) validadas no frontend e backend

---

## 🧰 Stack e arquitetura

| Camada | Tecnologias |
|---|---|
| **Core** | React 18, Vite 7, JavaScript (ES2022) |
| **Estilização** | Styled-Components, Material-UI (MUI v5) |
| **Roteamento** | React Router DOM v6 (rotas públicas, privadas e admin) |
| **Estado global** | Zustand com middleware `persist` |
| **Data fetching** | TanStack Query (React Query) v5 — cache, `refetchInterval`, `enabled` condicional |
| **HTTP** | Axios com interceptors para injeção de token JWT |
| **Forms & validação** | React Hook Form + Yup |
| **Pagamentos** | Stripe.js + React Stripe Elements |
| **UX** | React Toastify (feedbacks), React Slick (carrosséis), Swiper |
| **Qualidade** | Biome (lint + format unificado) |
| **Deploy** | Vercel (SPA com rewrite para React Router) |

### 🏗️ Organização de pastas

```
src/
├─ assets/           # Imagens, logos e ícones estáticos
├─ components/       # Componentes reutilizáveis (CartItem, Stripe/CheckoutForm, Carousels...)
├─ containers/       # Páginas e fluxos (Home, Cart, DeliveryStatus, Admin/*)
│  └─ Admin/         # Orders, Products, Categories, NewProduct...
├─ hooks/            # Custom hooks (useUser, useCart)
├─ services/         # api.js (instância Axios com interceptor de token)
├─ routes/           # Configuração de rotas públicas/privadas/admin
├─ styles/           # GlobalStyles, theme
├─ utils/            # formatPrice, validators
├─ App.jsx
└─ main.jsx
```

---

## 🚀 Rodando localmente

### Pré-requisitos
- Node.js **18+** (recomendado 20+)
- Yarn ou npm
- Backend rodando ([`dev-burger-backend`](https://github.com/Doug1980/dev-burger-backend))
- Conta no [Stripe](https://stripe.com) para a chave pública

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Doug1980/dev-burger-frontend.git
cd dev-burger-frontend

# Instale as dependências
yarn install
# ou
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
```

> 💡 Em produção, `VITE_API_URL` aponta para o backend no Render e `VITE_STRIPE_PUBLIC_KEY` é a chave pública do Stripe (modo test ou live).

### Comandos

```bash
yarn dev        # inicia o servidor de desenvolvimento (http://localhost:5173)
yarn build      # gera a build de produção
yarn preview    # preview local da build
yarn lint       # checa problemas com Biome
yarn format     # formata o código com Biome
```

---

## 💳 Testando o fluxo de pagamento

O Stripe está em **modo test**. Use os cartões de teste abaixo no checkout:

| Cenário | Número do cartão | Validade | CVC |
|---|---|---|---|
| ✅ Aprovado | `4242 4242 4242 4242` | qualquer data futura | qualquer 3 dígitos |
| ❌ Recusado | `4000 0000 0000 0002` | qualquer data futura | qualquer 3 dígitos |
| 🔐 Exige autenticação 3DS | `4000 0025 0000 3155` | qualquer data futura | qualquer 3 dígitos |

---

## 🎯 Decisões técnicas que vale destacar

- **Zustand com `persist`** em vez de Context API + `localStorage` manual — menos boilerplate, re-renders mais previsíveis e hidratação automática ao recarregar a página.
- **React Query com `enabled` condicional** no `DeliveryStatus` — evita requisições desnecessárias e estados fantasma quando o usuário entra na tela sem um pedido ativo.
- **`refetchInterval` dinâmico** que se desliga quando o pedido chega nos status finais (`Pedido Entregue` / `Cancelado`) — economia de requisições e bateria em mobile.
- **Auto-refresh no painel admin** em vez de WebSocket — solução simples e eficiente para o volume esperado, sem adicionar complexidade de conexão persistente.
- **Uploads via Cloudinary** em vez de filesystem local — imprescindível em ambientes efêmeros como Render/Vercel, onde o disco é apagado a cada deploy.
- **Responsividade mobile-first** nos carrosséis e listagens, testada em diversos breakpoints reais.

---

## 🗺️ Roadmap

- [ ] Testes E2E com Playwright (fluxo de compra completo)
- [ ] Testes unitários com Vitest + Testing Library
- [ ] Migração incremental para TypeScript
- [ ] WebSocket (Socket.IO) para notificações instantâneas no admin
- [ ] PWA com suporte offline e instalação mobile
- [ ] Internacionalização (i18n)
- [ ] CI/CD com GitHub Actions (lint + build + deploy preview)

---

## 🤝 Contribuindo

Contribuições, issues e sugestões são muito bem-vindas! Se quiser contribuir:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## 👨‍💻 Autor

Feito por **Douglas** — desenvolvedor full stack em formação contínua, com foco em React, Node.js e TypeScript.

[![GitHub](https://img.shields.io/badge/GitHub-Doug1980-181717?style=for-the-badge&logo=github)](https://github.com/Doug1980)

> 💼 **Aberto a oportunidades.** Se você é recrutador, tech lead ou dev e curtiu o projeto, fique à vontade para entrar em contato via GitHub.

---

<div align="center">

**Se este projeto te ajudou ou te inspirou, considere deixar uma ⭐ no repositório!**

</div>

---

## Tecnologias

- React  
- Vite  
- Styled-Components  
- React Router DOM  
- Axios  
- React-Select  
- Material-UI  

---

## Estrutura do Projeto

```text
dev-burger-frontend/
├─ public/           # Arquivos públicos (favicon, index.html)
├─ src/
│  ├─ assets/        # Imagens e ícones
│  ├─ components/    # Componentes reutilizáveis
│  ├─ containers/    # Páginas e seções principais
│  ├─ services/      # Configuração de API e funções auxiliares
│  ├─ styles/        # Estilos globais e themes
│  ├─ App.jsx        # Componente principal
│  └─ main.jsx       # Entrada da aplicação
├─ .gitignore
├─ package.json
└─ vite.config.js



