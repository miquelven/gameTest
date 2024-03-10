<template>
  <v-hover v-slot="{ isHovering, props }" close-delay="200" open-delay="0">
    <v-btn
      color="#2bb478"
      size="large"
      rounded="lg"
      elevation="8"
      :variant="isHovering ? 'flat' : 'outlined'"
      v-bind="props"
      :style="isHovering ? 'color: black' : ''"
    >
      {{ label }}
    </v-btn>
  </v-hover>
</template>

<script>
export default {
  props: ["label"],
  data() {
    return {
      label: "",
    };
  },
  mounted() {
    this.label = this.$props.label;
  },
};
</script>
