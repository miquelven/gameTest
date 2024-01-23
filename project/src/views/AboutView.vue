<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import AboutItem from "@/components/AboutItem.vue";
import aboutItemInfo from "@/data/aboutItemInfo";

export default {
  components: {
    Header,
    Footer,
    AboutItem,
  },
  data() {
    return {
      itemInfo: null,
    };
  },
  mounted() {
    this.itemInfo = aboutItemInfo;
  },
};
</script>

<template>
  <Header />
  <main class="w-full mt-20 min-h-[100vh-250px]" id="best">
    <!-- container -->
    <div class="flex">
      <div
        class="m-auto mb-10 max-w-4xl border-x-2 border-white/50 px-5 py-10 flex flex-col gap-24 max-sm:border-0"
      >
        <AboutItem
          v-for="({ title, content }, index) in itemInfo"
          :key="index"
          :title="title"
          :content="content"
          v-motion
          :initial="{
            y: -200,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: {
              duration: 500,
              type: 'keyframes',
              ease: 'easein',
            },
          }"
        />
      </div>
    </div>
  </main>
  <Footer />
</template>
