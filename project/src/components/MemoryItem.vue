<script>
export default {
  props: ["color"],
  computed: {
    setBackgroundColor() {
      if (this.showBackground) return `background: ${this.color}`;
    },
  },
};
</script>

<template>
  <div
    class="transition-all bg-yellow-400 shadow-md shadow-white/70 w-28 h-28 rounded-lg hover:cursor-pointer hover:scale-90"
    @click="(e) => this.$emit('clickedSquare', e.target)"
    :data-color="color"
  ></div>
</template>
