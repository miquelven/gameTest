<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <div
      class="bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500 py-8 px-16 rounded-xl shadow-[55px_35px_40px_rgba(75,75,75,.5)] text-lg"
    >
      <div>
        <h1 class="font-bold text-7xl">Erro: 404</h1>
        <p class="my-2">Página Não Encontrada!</p>
      </div>
      <div class="mt-10 flex flex-col">
        <p>Ir para a página principal?</p>
        <router-link
          to="/"
          class="text-center transition-all m-auto mt-10 border-2 w-full rounded-md border-white/50 py-1 hover:bg-[rgba(0,0,0,.3)] hover:border-transparent hover:font-bold"
        >
          Página Principal
        </router-link>
      </div>
    </div>
  </div>
</template>
