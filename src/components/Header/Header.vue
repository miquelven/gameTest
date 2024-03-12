<script>
import { useToast } from "vue-toastification";
import Menu from "./HeaderMenuMobile/Menu.vue";
import HeaderLink from "./HeaderLink.vue";
import axios from "axios";
import LinksMenu from "./HeaderMenuMobile/LinksMenu.vue";

export default {
  components: { Menu, HeaderLink, LinksMenu },
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
    this.name = nameUser[0].toUpperCase() + nameUser.substring(1);
  },
  methods: {
    async logout() {
      try {
        // Envie a solicitação de logout para o servidor
        const response = await axios.post("/logout", {
          session_token: localStorage.getItem("token"),
        });

        if (response.data.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("vuex");

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
    class="fixed z-50 w-full top-0 left-0 text-white bg-transparent backdrop-blur-xl border-b-[2px] border-zinc-900"
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
      <nav class="flex gap-12 font-light max-lg:text-sm max-md:hidden">
        <LinksMenu />
      </nav>

      <Menu @logout="logout" />

      <div
        class="text-lg text-zinc-300 flex flex-col items-end max-lg:text-base max-md:hidden"
      >
        <span class="text-sm text-gray-400">Usuário: </span>

        <div class="text-center">
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="#2bb478" variant="outlined" v-bind="props">
                {{ name }}
              </v-btn>
            </template>

            <v-list
              :style="{
                backgroundColor: '#111',
              }"
            >
              <v-list-item @click="logout">
                <v-list-item-title :style="{ color: 'white' }"
                  >Sair</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </header>
</template>
