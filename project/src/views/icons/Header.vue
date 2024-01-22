<script>
export default {
  data() {
    return {
      name: "",
      showItem: false,
      header: null,
      showMenu: false,
    };
  },
  mounted() {
    const nameUser = localStorage.getItem("name");
    this.name = nameUser[0].toUpperCase() + nameUser.substring(1);
  },
  watch: {
    showMenu(value, old) {
      console.log(value);
    },
  },
  methods: {
    async logout() {
      try {
        // Envie a solicitação de logout para o servidor
        const response = await this.$axios.post("/logout", {
          session_token: localStorage.getItem("token"),
        });

        if (response.data.success) {
          // Limpe os dados de autenticação armazenados localmente (ou faça o que for necessário)
          localStorage.removeItem("token");
          localStorage.removeItem("name");

          // Redirecione para a página de login ou outra página desejada
          this.$router.push("/login");
        } else {
          // Trate falhas no logout
        }
      } catch (error) {
        console.error("Erro durante a solicitação de logout:", error);
        // Trate erros de solicitação
      }
    },
  },
};
</script>

<template>
  <header
    ref="header"
    class="fixed z-50 w-full top-0 left-0 text-white bg-transparent backdrop-blur-xl border-b-[2px] border-[rgba(255,255,255,.2)]"
  >
    <div
      class="max-w-screen-2xl m-auto flex justify-between items-center max-h-20 p-10"
    >
      <router-link to="/">
        <img
          src="../../assets/images/logo.png"
          alt="logo"
          width="100"
          class="max-lg:w-20"
        />
      </router-link>
      <nav class="flex gap-12 text-lg max-lg:text-sm max-md:hidden">
        <router-link to="/scores"
          ><span
            class="transition duration-300 ease-in py-8 relative hover:text-white hover:font-bold"
            data-link
          >
            Pontuações
          </span>
        </router-link>
        <router-link to="/best"
          ><span
            class="transition duration-300 ease-in py-8 relative hover:text-white hover:font-bold"
            data-link
          >
            Melhores
          </span>
        </router-link>
        <router-link to="/contact"
          ><span
            class="transition duration-300 ease-in py-8 relative hover:text-white hover:font-bold"
            data-link
          >
            Contato
          </span>
        </router-link>
        <router-link to="/about"
          ><span
            class="transition duration-300 ease-in py-8 relative hover:text-white hover:font-bold"
            data-link
          >
            Sobre
          </span>
        </router-link>
      </nav>
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="hidden h-5 cursor-pointer max-md:block"
        @click="() => (showMenu = !showMenu)"
      />
      <template v-if="showMenu">
        <nav
          class="absolute left-0 top-[80px] flex flex-col bg-black/95 border-b-[2px] border-[rgba(255,255,255,.2)] w-full gap-10 py-5 font-bold"
          v-motion
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              ease: 'easein',
              duration: 500,
              type: 'spring',
            },
          }"
        >
          <router-link to="/scores" class="w-full text-center"
            ><span class="py-8 relative"> Pontuações </span>
          </router-link>
          <router-link to="/best" class="w-full text-center"
            ><span class="py-8 relative"> Melhores </span>
          </router-link>
          <router-link to="/contact" class="w-full text-center"
            ><span class="py-8 relative"> Contato </span>
          </router-link>
          <router-link to="/about" class="w-full text-center"
            ><span class="py-8 relative"> Sobre </span>
          </router-link>
          <button @click="logout" class="w-full text-center">
            <span class="py-8 relative"> Sair </span>
          </button>
        </nav>
      </template>

      <div
        class="text-lg text-white flex flex-col items-end max-lg:text-base max-md:hidden"
      >
        <span class="text-sm text-gray-400">Usuário: </span>
        <button class="flex" @click="() => (showItem = !showItem)">
          <span>{{ name }} </span>
          <div
            class="rotate-90 text-yellow-400 text-2xl -mt-1 px-2 hover:cursor-pointer"
          >
            <span>></span>
          </div>
        </button>
        <template v-if="showItem">
          <div
            class="relative transition-all self-start text-white cursor-pointer"
          >
            <button
              @click="logout"
              class="absolute mt-5 bg-gray-400/10 w-40 border-2 border-white border-y-transparent hover:opacity-70"
            >
              Sair
            </button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
span[data-link]::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 20px;
  width: 0%;
  overflow: hidden;
  border-bottom: 4px solid transparent;
  transition: 300ms ease-in;
}

span[data-link]:hover::before {
  width: 50%;

  border-color: yellow;
  filter: drop-shadow(0, 0, 25px, yellow);
}
</style>
