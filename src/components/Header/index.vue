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

      showItem: false,
      header: null,
      showMenu: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return !!this.$store.state.user;
    },
    name() {
      const user = this.$store.state.user;
      if (user && user.name) {
        return user.name[0].toUpperCase() + user.name.substring(1);
      }
      return "";
    },
  },
  mounted() {
    this.toast = useToast();
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

          this.$store.commit("setUser", null);
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
    class="fixed z-50 w-full top-0 left-0 text-white bg-black/90 border-b border-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
  >
    <div
      class="max-w-screen-2xl m-auto flex justify-between items-center max-h-20 px-4 md:px-6"
    >
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="relative flex items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2"
        >
          <img
            :src="logoImg"
            alt="logo"
            width="40"
            class="max-lg:w-8 select-none"
          />
          <span
            class="ml-3 text-sm font-semibold tracking-[0.25em] uppercase text-emerald-400 max-md:hidden"
          >
            ChronoRun
          </span>
        </div>
      </router-link>

      <nav class="flex gap-10 font-light max-lg:text-sm max-md:hidden relative">
        <LinksMenu />
        <span
          class="absolute -bottom-3 left-0 w-full h-px bg-neutral-800 opacity-60"
        ></span>
      </nav>

      <Menu @logout="logout" />

      <div
        v-if="isUserLoggedIn"
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

      <div v-else class="flex items-center gap-4 max-md:hidden pr-3">
        <router-link to="/login">
          <button
            class="text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold"
          >
            Login
          </button>
        </router-link>
        <router-link to="/register">
          <button
            class="px-5 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white/90 text-xs uppercase tracking-widest font-bold transition-colors shadow-lg border border-transparent hover:border-emerald-400"
          >
            Cadastrar
          </button>
        </router-link>
      </div>
    </div>
  </header>
</template>
