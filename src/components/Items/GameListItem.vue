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
      console.log("oi");
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
    class="bg-black ease-in-out relative z-10 size-60 p-7 m-auto rounded-xl flex flex-col justify-center border-2 border-transparent items-center gap-5 hover:shadow-lg hover:border-[#2bb478] overflow-hidden hover:font-bold bg-no-repeat bg-cover bg-center max-xl:size-52"
    data-aos="flip-right"
    data-aos-delay="300"
    data-aos-duration="500"
  >
    <img :src="getImageUrl()" class="max-h-48" :alt="alt" />
    <h4 class="relative z-20 font-medium">
      {{ name }}
    </h4>
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
