<template>
  <div
    id="main"
    :style="{
      boxShadow: hover ? `0px 0px 10px ${styling}` : 'none',
    }"
    class="transition-all overflow-hidden bg-white duration-500 ease-in-out inline-block h-[60px] w-[60px] float-left mx-[15px] rounded-full cursor-pointer text-black shadow-[0_10px_10px_rgba(0,0,0,.1)] hover:w-[200px] hover:bg-transparent hover:text-white max-sm:w-[45px] max-sm:h-[45px] max-sm:hover:w-[150px]"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <div
      id="iconArea"
      :style="{
        backgroundColor: hover ? styling : '',
        boxShadow: hover ? `162px -4px 50px ${styling}` : 'none',
      }"
      class="transition-all duration-[1200ms] ease-in-out inline-block w-[60px] h-[60px] rounded-full leading-[60px] text-center max-sm:w-[45px] max-sm:h-[45px] max-sm:leading-[45px]"
    >
      <a href="">
        <font-awesome-icon
          id="icon"
          :icon="icon"
          class="text-2xl leading-[60px] max-sm:leading-[45px] max-sm:text-xl"
        />
      </a>
    </div>
    <span
      id="name"
      :style="{ color: styling == '#333' ? '#999' : styling }"
      class="text-lg font-bold ml-[10px] leading-[10px]"
      >{{ name }}</span
    >
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

<style scoped>
#main:hover #icon {
  color: #fff;
}
</style>
