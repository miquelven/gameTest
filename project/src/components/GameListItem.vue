<script>
export default {
  props: ["img", "name", "alt"],
  methods: {
    getImageUrl() {
      return new URL(`../assets/images/${this.img}`, import.meta.url);
    },
  },
};
</script>

<template>
  <div
    data-img
    class="transition bg-black duration-300 ease-in-out relative size-60 p-5 m-auto rounded-xl flex flex-col justify-center border-4 border-transparent items-center gap-5 hover:scale-150 hover:border-yellow-300 hover:shadow-lg overflow-hidden hover:shadow-yellow-400 hover:font-bold bg-no-repeat bg-cover bg-center shadow-[1px_4px_10px_rgba(255,255,255,.2)]"
  >
    <img :src="getImageUrl()" class="max-h-48" :alt="alt" />
    <h4 class="relative z-20">
      {{ name }}
    </h4>
  </div>
</template>

<style scoped>
div[data-img]::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  transition: all ease-in 300ms;
  z-index: 10;
}

div[data-img]:hover::before {
  background: transparent;
}

div[data-img]:hover h4 {
  color: #ffffffac;
  font-weight: bold;
  font-size: 12px;
}
</style>
