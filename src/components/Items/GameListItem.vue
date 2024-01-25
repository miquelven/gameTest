<script>
export default {
  props: ["img", "name", "alt", "tip"],
  data() {
    return {
      showTip: false,
    };
  },
  methods: {
    getImageUrl() {
      return new URL(`../../assets/images/${this.img}`, import.meta.url);
    },
    changeShowTip() {
      this.showTip = !this.showTip;
    },
  },
  watch: {
    showTip(current, old) {
      if (this.showTip) {
        setTimeout(() => (this.showTip = false), 3500);
      }
    },
  },
};
</script>

<template>
  <div
    data-img
    class="transition bg-black duration-300 ease-in-out relative size-60 p-7 m-auto z-10 rounded-xl flex flex-col justify-center border-4 border-transparent items-center gap-5 hover:border-yellow-300 hover:shadow-lg overflow-hidden hover:shadow-yellow-400 hover:font-bold bg-no-repeat bg-cover bg-center shadow-[1px_4px_10px_rgba(255,255,255,.2)] max-xl:size-52"
    v-motion
    :initial="{
      opacity: 0,
      x: 200,
    }"
    :visible="{
      opacity: 1,
      x: 0,
      transition: {
        type: 'keyframes',
        duration: 700,
        delay: 700,
      },
    }"
  >
    <img :src="getImageUrl()" class="max-h-48" :alt="alt" />
    <h4 class="relative z-20">
      {{ name }}
    </h4>
    <font-awesome-icon
      data-icon
      :icon="['fas', 'lightbulb']"
      class="transition duration-300 ease-in-out absolute z-10 top-[2px] left-[2px] p-3 cursor-pointer opacity-70 hover:shadow-[-5px_40px_10px_rgba(255,255,255,.2)_inset] rounded-full"
      @click="changeShowTip"
    />
    <template v-if="showTip">
      <div class="absolute inset-0 bg-[rgba(0,0,0,.3)]"></div>
      <p class="absolute inset-0 p-10 text-xs font-normal">
        {{ tip }}
      </p>
    </template>
  </div>
</template>

<style scoped>
div[data-img]::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
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

div[data-img]:hover [data-icon] {
  opacity: 1;
}
</style>
