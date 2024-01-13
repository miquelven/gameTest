<script>
export default {
  props: ["color", "show"],
  computed: {
    setBackgroundColor() {
      if (this.show) return `background: ${this.color}; transform: scale(1.10)`;
    },
  },
};
</script>

<template>
  <div
    :style="setBackgroundColor"
    class="transition-all bg-yellow-400 shadow-md shadow-white/70 w-28 h-28 rounded-lg hover:cursor-pointer hover:scale-90"
    @click="(e) => this.$emit('clickedSquare', e.target)"
    :data-color="color"
  ></div>
</template>
