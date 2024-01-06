<script>
import GameListItem from "@/components/GameListItem.vue";

export default {
  components: { GameListItem },
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-16">
    <h3 class="text-4xl font-bold">Lista dos jogos disponíveis:</h3>
    <div
      class="shadow-lg shadow-white/80 border border-white rounded-3xl min-w-96 p-7 bg-neutral-950"
    >
      <ul class="grid gap-16 grid-cols-4 items-center">
        <GameListItem img="" name="Jogo da Velha" />
        <GameListItem img="" name="Jogo da Memória" />
        <GameListItem img="" name="Pong" />
        <GameListItem img="" name="Breakout" />
        <GameListItem img="" name="Flappy Bird" />
        <GameListItem img="" name="Jogo Simon" />
        <GameListItem img="" name="Snake" />
        <GameListItem img="" name="Space Invaders" />
      </ul>
    </div>
  </div>
</template>
