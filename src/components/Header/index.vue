<script>
import { useToast } from "vue-toastification";
import Menu from "./HeaderMenuMobile/Menu.vue";
import axios from "axios";
import LinksMenu from "./HeaderMenuMobile/LinksMenu.vue";
import logoImg from "@/assets/images/logo.webp";

export default {
  components: { Menu, LinksMenu },
  data() {
    return {
      logoImg: logoImg,

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
        const response = await axios.post("/logout", {
          session_token: localStorage.getItem("token"),
        });

        if (response.status == 200) {
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
    class="fixed z-50 w-full top-0 left-0 text-white bg-black/40 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
  >
    <div
      class="max-w-screen-2xl m-auto flex justify-between items-center max-h-20 px-4 md:px-6"
    >
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="relative flex items-center justify-center rounded-xl border border-emerald-500/40 bg-black/70 px-3 py-2 shadow-[0_0_20px_rgba(16,185,129,0.55)]"
        >
          <img
            :src="logoImg"
            alt="logo"
            width="36"
            class="max-lg:w-8 select-none"
          />
          <span
            class="ml-3 text-sm font-semibold tracking-[0.25em] uppercase text-emerald-400 max-md:hidden"
          >
            GameTest
          </span>
        </div>
      </router-link>

      <nav
        class="flex gap-10 font-light max-lg:text-sm max-md:hidden relative"
      >
        <LinksMenu />
        <span
          class="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent opacity-60"
        ></span>
      </nav>

      <Menu @logout="logout" />

      <div
        class="text-lg text-zinc-300 flex flex-col items-end gap-1 max-lg:text-base pr-3 max-md:hidden"
      >
        <span class="text-[0.7rem] tracking-[0.2em] uppercase text-emerald-400">
          Online
        </span>

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
