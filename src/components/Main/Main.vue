<script>
export default {
  props: ["minHeight"],
  data() {
    return {
      minHeightEl: this.minHeight,
    };
  },
};
</script>

<template>
  <main :style="{ minHeight: minHeightEl }" class="w-full mt-20"></main>
</template>
