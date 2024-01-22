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
    <h3
      id="title"
      class="text-5xl font-bold relative inline mb-4 max-md:text-4xl max-sm:text-3xl"
    >
      {{ title }}
    </h3>
    <p class="text-xl text-gray-200/90 max-md:text-base max-[440px]:text-sm">
      {{ content }}
    </p>
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
