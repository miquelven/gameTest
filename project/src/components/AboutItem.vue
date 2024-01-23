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
      class="text-5xl font-bold relative inline mb-4 max-md:text-4xl max-sm:text-3xl before:content-[''] before:absolute before:bg-gradient-to-r before:from-[rgb(201,201,10)] before:to-[#000000ca] before:-bottom-[6px] before:h-1 before:w-full"
    >
      {{ title }}
    </h3>
    <p class="text-xl text-gray-200/90 max-md:text-base max-[440px]:text-sm">
      {{ content }}
    </p>
  </div>
</template>
