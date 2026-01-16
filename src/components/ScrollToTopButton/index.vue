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
  <button
    v-if="showScroll"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 group"
  >
    <div class="relative">
      <div
        class="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <div
        class="relative size-11 md:size-12 rounded-full border border-emerald-500/60 bg-black/80 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.6)] group-hover:translate-y-[-2px] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.9)] transition-all duration-200"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          class="text-emerald-400 group-hover:text-emerald-300"
        />
      </div>
    </div>
  </button>
</template>
