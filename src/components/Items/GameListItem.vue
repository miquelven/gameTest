<script>
export default {
  props: ["item"],
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
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
</template>
