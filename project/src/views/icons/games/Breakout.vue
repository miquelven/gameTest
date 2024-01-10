<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      canvasWidth: 500,
      canvasHeight: 500,
      ctx: null,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
  },
};
</script>
