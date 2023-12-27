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
    class="h-screen w-screen flex justify-center items-center relative z-0"
    id="container"
  >
    <form
      action=""
      class="relative z-10 w-72 flex flex-col justify-center items-center gap-5"
    >
      <InputForm type="text" text="Digite seu nome" focus="true" />
      <InputForm type="text" text="Digite o email" focus="false" />

      <div class="w-full flex items-center relative">
        <InputForm type="password" text="Crie uma senha" focus="false" />
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="absolute opacity-60 right-0 cursor-pointer p-4"
          @click=""
        />
      </div>

      <div class="w-full flex items-center relative">
        <InputForm type="password" text="Repita a senha" focus="false" />
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="absolute opacity-60 right-0 cursor-pointer p-4"
          @click=""
        />
      </div>

      <input
        type="submit"
        value="Cadastrar"
        @click.prevent=""
        class="mt-2 w-full shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
      />

      <span
        >Já tem uma conta?
        <a href="" class="text-yellow-400 hover:underline">Entrar</a>
      </span>
    </form>
  </div>
</template>

<style scoped>
#container {
  background: url("@/assets/images/backgroundRegister.png");
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
