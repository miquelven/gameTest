<script>
import { useElementHover } from "@vueuse/core";

export default {
  props: ["item"],
  data() {
    return {
      isHovered: false,
    };
  },
  mounted() {
    this.isHovered = useElementHover(this.$refs.myHoverableElement);
  },
  computed: {
    isHoveredCard() {
      return this.isHovered ? "tonal" : "outlined";
    },
    isHoveredCardColor() {
      return !this.isHovered ? "#777" : "#2bb478";
    },
  },
};
</script>

<template>
  <v-card
    :key="index"
    :color="isHoveredCardColor"
    :variant="isHoveredCard"
    class="mx-auto my-8"
    elevation="16"
    max-width="344"
    min-height="357"
    ref="myHoverableElement"
  >
    <v-img height="200px" :src="item.img" cover></v-img>
    <v-card-item>
      <v-card-title> {{ item.name }} </v-card-title>
    </v-card-item>

    <v-card-text>
      {{ item.tip }}
    </v-card-text>
  </v-card>
</template>
