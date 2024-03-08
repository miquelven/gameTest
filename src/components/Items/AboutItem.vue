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
      class="text-5xl font-medium relative inline mb-4 max-md:text-4xl max-sm:text-3xl before:content-[''] before:absolute before:bg-gradient-to-r before:from-[#69dcaa] before:to-[#0a0a0a] before:-bottom-[6px] before:h-1 before:w-full"
    >
      {{ title }}
    </h3>
    <p class="text-xl text-zinc-300 max-md:text-base max-[440px]:text-sm">
      {{ content }}
    </p>
  </div>
</template>
