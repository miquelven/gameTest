<script>
import { ref, onMounted, onBeforeMount } from "vue";

export default {
  data() {
    return {
      showScroll: false,
    };
  },
  methods: {
    userScroll() {
      if (window.scrollY > 600) {
        this.showScroll = true;
      } else {
        this.showScroll = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.userScroll();
    });
  },
  beforeMount() {
    window.removeEventListener("scroll", () => {
      this.userScroll();
    });
  },
};
</script>

<template>
  <div
    @click="() => scrollToTop()"
    class="transition-all duration-300 fixed bottom-10 right-10 -rotate-90 p-3 border-[1px] text-[#aaa] font-bold rounded-md border-[#2bb478] text-4xl hover:bg-[#2bb478] hover:text-black cursor-pointer max-sm:text-2xl max-sm:p-2"
    :class="`${showScroll ? 'z-10 opacity-100' : 'z-[-1] opacity-0'}`"
  >
    >
  </div>
</template>
