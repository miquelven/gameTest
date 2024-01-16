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
      class="py-24 px-14 shadow-lg shadow-white/80 border border-white rounded-3xl min-w-96 bg-neutral-950"
    >
      <ul class="grid gap-16 grid-cols-4 items-center">
        <GameListItem
          img="TicTacToe.png"
          name="Jogo da Velha"
          alt="imagem do Jogo da Velha"
        />
        <GameListItem
          img="Memory.png"
          name="Jogo da Memória"
          alt="imagem do Jogo da Memória"
        />
        <GameListItem img="Pong.png" name="Pong" alt="imagem do Pong" />
        <GameListItem
          img="Breakout.png"
          name="Breakout"
          alt="imagem do Breakout"
        />
        <GameListItem
          img="FlappyBird.png"
          name="Flappy Bird"
          alt="imagem do Flappy Bird"
        />
        <GameListItem img="Simon.png" name="Jogo Simon" alt="imagem do Simon" />
        <GameListItem img="Snake.png" name="Snake" alt="imagem do Snake" />
        <GameListItem
          img="SpaceInvaders.png"
          name="Space Invaders"
          alt="imagem do Space Invaders"
        />
      </ul>
    </div>
  </div>
</template>
