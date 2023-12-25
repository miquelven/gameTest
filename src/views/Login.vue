<script>
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faCoffee as fasCoffee } from "@fortawesome/pro-solid-svg-icons";

// library.add(fasCoffee);
</script>

<template>
  <div
    id="main"
    class="w-screen h-screen flex flex-col justify-center items-center"
  >
    <div class="relative z-10 mb-28">
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/svgs/logo.svg" alt="" class="w-56 brightness-125" />

        <form action="" class="flex flex-col gap-4 w-full p-2">
          <input
            type="text"
            placeholder="Nome"
            class="w-full bg-transparent placeholder:text-white/30 bg-white/10 rounded-md py-2 px-2 outline-none shadow-md opacity-60 shadow-white/15 focus:shadow-white/30 focus:bg-white/15 focus:opacity-100"
            autofocus
          />
          <div class="flex items-center relative">
            <input
              type="password"
              placeholder="Senha"
              class="w-full bg-transparent placeholder:text-white/30 bg-white/10 rounded-md py-2 px-2 outline-none shadow-md opacity-60 shadow-white/15 focus:shadow-white/30 focus:bg-white/15 focus:opacity-100"
            />
            <!-- Add Icons using String format -->
            <font-awesome-icon
              :icon="['fas', 'eye']"
              class="absolute opacity-60 right-0 cursor-pointer p-4"
              @click=""
            />
          </div>

          <input
            type="submit"
            value="Entrar"
            @click.prevent=""
            class="mt-2 w-full shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
          />
        </form>
        <div class="flex flex-col justify-center items-center mt-6">
          <span>
            <a href="" class="text-gray-200/80 hover:underline"
              >Esqueceu sua senha?</a
            >
          </span>
          <span>
            <a href="" class="text-gray-400/80 hover:underline"
              >Ainda não tem uma conta? Crie uma conta.</a
            >
          </span>
        </div>

        <!-- AREA DE LOGIN DE OUTRAS MANEIRAS -->
        <div class="w-full flex items-center mt-3">
          <div
            class="flex-1 border border-red-400 flex items-center justify-center"
          >
            google
          </div>
          <div
            class="flex-1 border border-blue-400 flex items-center justify-center"
          >
            facebook
          </div>
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    165deg,
    rgba(0, 0, 0, 1) 35%,
    rgba(255, 243, 0, 0.756827731092437) 100%
  );

  background: url("@/assets/images/backgroundLogin.png");
  background-position: center;
  background-size: cover;
  position: relative;
}
#main::before {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
