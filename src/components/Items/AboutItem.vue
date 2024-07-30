<script>
export default {
  props: ["title", "content"],
};
</script>

<template>
  <div class="relative mb-4 flex flex-col px-6 py-8">
    <h3
      id="title"
      class="absolute z-50 text-5xl font-medium inline mb-1 max-md:text-4xl max-sm:text-3xl"
    >
      {{ title }}
    </h3>
    <p
      class="mt-24 text-xl font-light text-white-xlight leading-9 max-[440px]:text-sm"
    >
      {{ content }}
    </p>
  </div>
</template>
