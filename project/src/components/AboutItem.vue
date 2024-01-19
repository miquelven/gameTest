<script>
export default {
  props: ["title", "styling", "content"],
  computed: {
    formatStyllingClass() {
      return `m-4 flex flex-col gap-4 ${this.styling}`;
    },
  },
};
</script>

<template>
  <div :class="formatStyllingClass">
    <h3 id="title" class="text-5xl font-bold relative inline mb-4">
      {{ title }}
    </h3>
    <p class="text-xl text-gray-200/90">{{ content }}</p>
  </div>
</template>

<style scoped>
#title::before {
  content: "";
  position: absolute;
  background: linear-gradient(to right, rgb(201, 201, 10) 10%, #000000ca);
  bottom: -6px;
  height: 4px;
  width: 100%;
}
</style>
