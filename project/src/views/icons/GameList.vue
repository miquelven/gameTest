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
          tip="DICA: Esse jogo é simples e não terá muita dificuldade, então divirta-se"
        />
        <GameListItem
          img="Memory.png"
          name="Jogo da Memória"
          alt="imagem do Jogo da Memória"
          tip="
DICA: Preste atenção no começo do jogo, isso será crucial para o seu resultado."
        />
        <GameListItem
          img="Pong.png"
          name="Pong"
          alt="imagem do Pong"
          tip="
DICA: Seja esperto e termine o quanto antes; quanto mais o tempo passa, mais rápido você se torna, e algumas vezes a bola que estava defendida será arremessada para trás de você."
        />
        <GameListItem
          img="Breakout.png"
          name="Breakout"
          alt="imagem do Breakout"
          tip="DICA: Não deixe a bola passar por você. Você só tem uma chance."
        />
        <GameListItem
          img="FlappyBird.png"
          name="Flappy Bird"
          alt="imagem do Flappy Bird"
          tip="DICA: Não bata em nenhum obstáculo. Tenha paciência, pois ele pode demorar mais que os outros."
        />
        <GameListItem
          img="Simon.png"
          name="Jogo Simon"
          alt="imagem do Simon"
          tip="
DICA: Preste atenção e não perca uma sequência, você não tem outra chance."
        />
        <GameListItem
          img="Snake.png"
          name="Snake"
          alt="imagem do Snake"
          tip="DICA: Siga o melhor caminho, não bata na parede ou na sua cauda. Consiga 2400 pontos para avançar."
        />
        <GameListItem
          img="SpaceInvaders.png"
          name="Space Invaders"
          alt="imagem do Space Invaders"
          tip="DICA: Seja rápido e não permita que cheguem até você. Acabe com todos eles para avançar."
        />
      </ul>
    </div>
  </div>
</template>
