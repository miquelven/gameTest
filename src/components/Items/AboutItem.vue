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
      class="text-4xl font-medium relative inline mb-7 max-md:text-3xl max-sm:text-2xl before:content-[''] before:absolute before:bg-gradient-to-r before:from-[#69dcaa] before:to-[#0a0a0a] before:-bottom-[6px] before:h-1 before:w-full"
    >
      {{ title }}
    </h3>
    <p class="text-lg font-light text-zinc-300 leading-7 max-[440px]:text-sm">
      {{ content }}
    </p>
  </div>
</template>
