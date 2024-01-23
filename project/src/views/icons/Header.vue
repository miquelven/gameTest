<script>
import { useToast } from "vue-toastification";
import HeaderMenuMobile from "./HeaderMenuMobile.vue";
import HeaderLink from "./HeaderLink.vue";

export default {
  components: { HeaderMenuMobile, HeaderLink },
  data() {
    return {
      toast: null,

      name: "",
      showItem: false,
      header: null,
      showMenu: false,
    };
  },
  mounted() {
    this.toast = useToast();

    const nameUser = localStorage.getItem("name");
    // this.name = nameUser[0].toUpperCase() + nameUser.substring(1);
    this.name = nameUser;
  },
  methods: {
    async logout() {
      try {
        // Envie a solicitação de logout para o servidor
        const response = await this.$axios.post("/logout", {
          session_token: localStorage.getItem("token"),
        });

        if (response.data.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");

          this.$router.push("/login");
        } else {
          this.toast.error("Não foi possível fazer o logout");
        }
      } catch (error) {
        console.error("Erro durante a solicitação de logout:", error);
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
        <HeaderLink text="Pontuações" to="/scores" />
        <HeaderLink text="Melhores" to="/best" />
        <HeaderLink text="Contato" to="/contact" />
        <HeaderLink text="Sobre" to="/about" />
      </nav>

      <HeaderMenuMobile @logout="logout" />

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
