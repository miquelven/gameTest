<script>
import GameList from "./icons/GameList.vue";

export default {
  components: {
    GameList,
  },
  data() {
    return {
      name: "",
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
  <!-- <h1 @click="logout">logout</h1> -->
  <header class="w-full text-gray-400 bg-neutral-900/40 shadow shadow-white/10">
    <div class="max-w-screen-2xl m-auto flex justify-between items-center">
      <img src="../assets/svgs/logo.svg" alt="logo" width="70" />

      <nav class="flex gap-12 text-lg">
        <a href="" class="hover:text-white hover:scale-105 transition-all"
          >Pontuações</a
        >
        <a href="" class="hover:text-white hover:scale-105 transition-all"
          >Melhores</a
        >
        <a href="" class="hover:text-white hover:scale-105 transition-all"
          >Contato</a
        >
        <a href="" class="hover:text-white hover:scale-105 transition-all"
          >Sobre</a
        >
      </nav>

      <h5 class="text-lg text-white flex flex-col items-end">
        <span class="text-sm text-gray-400">Seja bem-vindo: </span>
        {{ name }}
      </h5>
    </div>
  </header>

  <main class="w-full my-19">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto">
      <div id="welcomeArea" class="flex mb-20">
        <!-- left-size -->
        <div class="flex-1 flex flex-col gap-36 justify-center">
          <!-- title -->
          <div>
            <h1 class="text-center text-7xl gap-16 flex flex-col">
              Venha explorar os jogos
              <span class="text-2xl"
                >você será capaz de encarar todos eles?</span
              >
            </h1>
          </div>
          <p class="text-xl">
            Aqui você encontrará vários desafios, terá que superar todos eles no
            menor tempo possível, em caso de derrota você terá que recomeçar o
            desafio.
          </p>

          <span class="text-xl"
            >Consiga o melhor tempo e fique entre os melhores! 🏆🏆🏆</span
          >
        </div>
        <!-- right-size -->
        <div
          class="flex-1 flex flex-col justify-center items-end gap-14 relative"
        >
          <h2 class="text-5xl">Irá encarar esse desafio?</h2>

          <div
            class="shadow-lg shadow-yellow-900 flex rounded-full transition-all ease-in bg-gradient-to-tr from-yellow-500 to-white/50 p-1 hover:scale-95 hover:shadow-none"
          >
            <button
              class="flex-1 font-bold md:text-xl bg-black px-6 py-3 rounded-full"
            >
              Iniciar desafio
            </button>
          </div>
          <div
            class="absolute bottom-24 rotate-[-45deg] flex flex-col items-center gap-7"
          >
            <div
              class="bg-yellow-400 w-4 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
            <div
              class="bg-yellow-400 w-12 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
            <div
              class="bg-yellow-400 w-20 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <!-- ListGames -->
      <div>
        <GameList />
      </div>
    </div>
  </main>
  <footer class="m-auto mt-20 mb-10 text-sm text-gray-300">
    <div class="max-w-screen-2xl m-auto">
      <span class="flex items-center">Games in a Game.</span>

      <!-- line -->
      <div class="w-full h-1 bg-gray-500 my-6"></div>

      <div class="flex justify-between items-center">
        <p>@2023 GG. Todos os direitos reservados</p>

        <nav class="flex gap-16">
          <a href="">Termos de Serviços</a>
          <a href="">Politica de privacidade</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#welcomeArea {
  min-height: calc(100vh - 70px);
}
</style>
