<script>
export default {
  props: ["item"],
  data() {
    return {
      overlay: false,
    };
  },
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      @click="() => (overlay = true)"
      v-bind="props"
      :color="isHovering ? '#2bb478' : '#777'"
      :variant="isHovering ? 'tonal' : 'outlined'"
      class="mx-auto my-8 py-5"
      elevation="16"
      max-width="344"
      height="400"
      rounded="lg"
    >
      <v-img height="200px" :src="item.img" cover></v-img>
      <v-card-item>
        <v-card-title> {{ item.name }} </v-card-title>
      </v-card-item>

      <v-card-text>
        {{ item.tip }}
      </v-card-text>
    </v-card>
  </v-hover>

  <v-overlay
    v-model="overlay"
    style="background-color: #000a"
    @click="() => (overlay = false)"
  >
    <v-card
      class="absolute inset-0 w-screen bg-transparent h-screen flex justify-center items-center"
    >
      <v-img
        :src="item.img"
        class="m-auto my-[calc(50vh)] -translate-y-1/2 w-1/3 h-1/2"
      ></v-img>
    </v-card>
  </v-overlay>
</template>
