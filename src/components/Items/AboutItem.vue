<script>
export default {
  props: ["title", "content"],
};
</script>

<template>
  <div
    class="relative mb-4 flex flex-col gap-4 text-center bg-[#0c0c0c] px-6 py-8 rounded-lg shadow-md shadow-black/70 hover:bg-[#0f0f0f]"
  >
    <h3
      id="title"
      class="absolute z-50 w-full h-full right-[50%] translate-x-[50%] text-5xl font-medium inline mb-7 max-md:text-4xl max-sm:text-3xl before:content-[''] before:absolute before:bg-gradient-to-r before:from-[#69dcaa] before:to-[#0a0a0a] before:bottom-[calc(90%-20px)] before:left-0 before:h-1 before:transition-all before:duration-300 before:w-0 hover:before:w-full before:top-[calc(99%-2rem)] before:rounded-lg max-sm:before:h-[2px]"
    >
      {{ title }}
    </h3>
    <p
      class="mt-24 text-xl font-light text-[#ccc] leading-8 max-[440px]:text-sm"
    >
      {{ content }}
    </p>
  </div>
</template>
