# ChronoRun <img src="src/assets/images/logo.webp" alt="ChronoRun Logo" width="25"/>

![Preview](https://github.com/user-attachments/assets/779150be-51c3-4a1b-9105-310d5cd2383c)

> Bem-vindo ao universo de desafios de jogos do **ChronoRun**, onde a diversão encontra a competição. Teste suas habilidades em diversos clássicos, otimize suas estratégias e alcance o topo do ranking!

###### [Backend Repository](https://github.com/miquelven/games_in_game_api)

<br/>

## 🚀 Funcionalidades

- **Biblioteca de Jogos Clássicos:**
  - Breakout
  - Flappy Bird
  - Memory Game
  - Pong
  - Simon
  - Snake
  - Space Invaders
  - Tic Tac Toe
- **Sistema de Ranking:** Compita com outros jogadores e veja seu nome no topo.
- **Autenticação:** Login e Registro.
- **Tema Gamer:** Interface imersiva com efeitos visuais e sonoros.
- **Responsividade:** Jogue no desktop ou mobile.

<br/>

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as melhores tecnologias do ecossistema Vue:

- **Core:** [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- **Estado:** [Vuex](https://vuex.vuejs.org/) (com PersistedState)
- **Roteamento:** [Vue Router](https://router.vuejs.org/)
- **Estilização:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Vuetify](https://vuetifyjs.com/)
  - [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll)
- **Requisições:** [Axios](https://axios-http.com/) + [TanStack Query](https://tanstack.com/query/latest)
- **Outros:**
  - [Vue Toastification](https://github.com/Maronato/vue-toastification) (Notificações)
  - [VueUse Motion](https://motion.vueuse.org/)
  - [FontAwesome](https://fontawesome.com/)

<br/>

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens, sons, estilos globais (CSS/Tailwind)
├── components/      # Componentes reutilizáveis e específicos dos jogos
├── data/            # Dados estáticos (infos dos jogos, termos)
├── helpers/         # Funções auxiliares
├── hooks/           # Composables (Vue Query)
├── layout/          # Layouts da aplicação (Default, Empty)
├── router/          # Configuração de rotas
├── store/           # Gerenciamento de estado global
└── views/           # Páginas principais (Home, Games, Login, etc.)
```

<br/>

## 💻 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/miquelven/gameTest.git
   cd gameTest
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto e configure a URL da API (exemplo):

   ```env
   VITE_GAME_TEST_API_URL=http://localhost:3000
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Compilar CSS (Opcional - Modo Watch)**
   Se estiver editando arquivos do Tailwind:

   ```bash
   npm run tw
   ```

6. **Acesse**
   Abra seu navegador em `http://localhost:5173`

<br/>

## ✉️ Contato

Dúvidas, sugestões ou feedbacks? Entre em contato!

- **Desenvolvedor:** [miquelven.silva@gmail.com](mailto:miquelven.silva@gmail.com)
