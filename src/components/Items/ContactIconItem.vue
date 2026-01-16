<template>
  <div data-aos="zoom-in" data-aos-delay="600" data-aos-once="true">
    <button
      type="button"
      class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 transition-colors duration-200 hover:bg-neutral-800"
      @mouseover="hover = true"
      @mouseout="hover = false"
    >
      <span
        class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800"
      >
        <font-awesome-icon
          :icon="icon"
          class="text-lg"
          :style="{ color: hover ? '#f9fafb' : styling }"
        />
      </span>
      <span
        id="name"
        class="text-sm font-medium"
        :style="{ color: hover ? '#e5e5e5' : '#a1a1aa' }"
      >
        {{ name }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["name", "icon", "styling"],
  data() {
    return {
      hover: false,
    };
  },
};
</script>
