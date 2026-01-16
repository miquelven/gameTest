<script>
export default {
  props: ["label", "type", "click", "loadingProp"],
};
</script>

<template>
  <v-hover
    v-slot="{ isHovering, props }"
    close-delay="200"
    open-delay="0"
    v-bind="$attrs"
  >
    <v-btn
      @click="this.$props.click"
      color="#2bb478"
      size="large"
      rounded="lg"
      elevation="8"
      :loading="loadingProp"
      :variant="isHovering ? 'flat' : 'outlined'"
      v-bind="props"
      block
      class="w-full"
      :style="isHovering ? 'color: black' : ''"
      :type="this.$props.type"
    >
      {{ this.$props.label }}
    </v-btn>
  </v-hover>
</template>
