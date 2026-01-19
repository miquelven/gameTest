<script>
import Button from "@/views/icons/Button.vue";

export default {
  components: { Button },
};
</script>

<template>
  <div
    class="w-full h-[calc(100vh-80px)] m-auto flex flex-col justify-center items-center max-sm:scale-75 pattern-grid"
  >
    <div
      class="bg-gradient-to-tl from-transparent from-20% via-transparent via-40% to-[#2bb478] py-8 px-16 rounded-md text-lg"
    >
      <div>
        <h4 class="font-medium text-6xl">Erro: 404</h4>
        <p class="my-2 font-light">Página Não Encontrada!</p>
      </div>
      <div class="mt-10 flex flex-col justify-center items-center gap-5">
        <p class="font-light">Ir para a página principal?</p>
        <router-link to="/">
          <Button type="button" label="Página Principal" />
        </router-link>
      </div>
    </div>
  </div>
</template>
