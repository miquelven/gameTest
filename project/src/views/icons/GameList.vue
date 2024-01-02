<script>
import GameListItem from "@/components/GameListItem.vue";

export default {
  components: { GameListItem },
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-16">
    <h3 class="text-4xl font-bold">Lista dos jogos disponíveis:</h3>
    <div class="shadow shadow-white rounded-3xl min-w-96 p-7 bg-neutral-950">
      <ul class="grid gap-16 grid-cols-4 items-center">
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
        <GameListItem img="" name="" />
      </ul>
    </div>
  </div>
</template>
