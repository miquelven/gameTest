<script>
import InputForm from "./icons/InputForm.vue";

export default {
  components: {
    InputForm,
  },
};
</script>

<template>
  <div
    id="container"
    class="w-screen h-screen flex flex-col justify-center items-center"
  >
    <div class="relative z-10 mb-28">
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/svgs/logo.svg" alt="" class="w-56 brightness-125" />

        <form action="" class="flex flex-col gap-4 w-full p-2">
          <InputForm type="text" text="Nome" focus="true" />
          <div class="flex items-center relative">
            <InputForm type="password" text="Senha" focus="false" />
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
        <div class="w-full flex items-center mt-7">
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#FF3E30] w-9 h-9w-10 h-10 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'google']" class="w-5 h-5" />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#3b5998] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon
                :icon="['fab', 'facebook-f']"
                class="w-5 h-5"
              />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#E1306C] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" class="h-5 w-5" />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  background: url("@/assets/images/backgroundLogin.png");
  background-position: center;
  background-size: cover;
  position: relative;
}
#container::before {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
