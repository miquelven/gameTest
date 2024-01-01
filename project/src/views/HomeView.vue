<script>
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default {
  components: {
    Login,
    Register,
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
  <h1 @click="logout">logout</h1>
  <header class="w-full">
    <div class="max-w-screen-2xl m-auto flex justify-between items-center">
      <img src="../assets/svgs/logo.svg" alt="logo" width="100" />

      <nav class="flex gap-8 text-lg">
        <a href="" class="hover:font-bold">Pontuações</a>
        <a href="" class="hover:font-bold">Melhores</a>
        <a href="" class="hover:font-bold">Contato</a>
        <a href="" class="hover:font-bold">Sobre</a>
      </nav>

      <h5 class="text-lg">Miquelven</h5>
    </div>
  </header>

  <main class="w-full my-19">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto">
      <div id="welcomeArea" class="flex">
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
        <div class="flex-1 flex flex-col justify-center items-end gap-14">
          <h2 class="text-5xl">Irá encarar esse desafio?</h2>

          <div
            class="shadow-lg shadow-yellow-900 flex rounded-full transition-all ease-in bg-gradient-to-tr from-yellow-500 to-white/50 p-1 hover:shadow-none"
          >
            <button
              class="flex-1 shadow font-bold md:text-xl bg-black px-6 py-3 rounded-full hover:bg-black/30"
            >
              Iniciar desafio
            </button>
          </div>
        </div>
      </div>
      <div>
        <h4>ListGames - Area</h4>
      </div>
    </div>
  </main>
  <footer class="m-auto my-10 text-sm text-gray-300">
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
  min-height: calc(100vh - 120px);
}
</style>
