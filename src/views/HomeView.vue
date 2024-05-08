<script>
import GameList from "@/components/GameList/index.vue";
import BannerHome from "@/components/BannerHome/index.vue";
import Button from "./icons/Button.vue";
import Container from "./icons/Container.vue";

export default {
  components: {
    GameList,
    BannerHome,
    Button,
    Container,
  },
};
</script>

<template>
  <main class="w-full">
    <Container>
      <BannerHome />
      <GameList />
    </Container>
  </main>
</template>
