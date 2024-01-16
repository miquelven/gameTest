<script>
export default {
  data() {
    return {
      name: "",
      showItem: false,
    };
  },
  mounted() {
    const nameUser = localStorage.getItem("name");
    this.name = nameUser[0].toUpperCase() + nameUser.substring(1);
  },
  methods: {
    async logout() {
      const res = await fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_token: localStorage.getItem("token"),
        }),
      }).then((res) => res.json());

      if (res.success) {
        localStorage.removeItem("token");
        this.$router.push("/login");
      } else {
        if (res.message == "Session could not be found.") {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<template>
  <header
    class="w-full text-gray-400 bg-gray-400/10 shadow shadow-white/20 mb-24"
  >
    <div
      class="max-w-screen-2xl m-auto flex justify-between items-center max-h-20"
    >
      <router-link to="/">
        <img src="../../assets/images/logo.png" alt="logo" width="100" />
      </router-link>
      <nav class="flex gap-12 text-lg">
        <router-link
          to="/scores"
          class="hover:text-white hover:scale-105 transition-all"
          >Pontuações</router-link
        >
        <router-link
          to="/best"
          class="hover:text-white hover:scale-105 transition-all"
          >Melhores</router-link
        >
        <router-link
          to="/contact"
          class="hover:text-white hover:scale-105 transition-all"
          >Contato</router-link
        >
        <router-link
          class="hover:text-white hover:scale-105 transition-all"
          to="/about"
          >Sobre</router-link
        >
      </nav>

      <div class="text-lg text-white flex flex-col items-end">
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
