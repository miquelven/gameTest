<script>
import Footer from "@/components/Footer/Footer.vue";
import Header from "@/components/Header/Header.vue";
import AboutItem from "@/components/Items/AboutItem.vue";
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
  <div
    class="m-auto mb-10 mt-28 max-w-4xl border-x-2 border-[#2bb478] px-5 py-10 flex flex-col gap-24 max-sm:border-0"
  >
    <AboutItem
      v-for="({ title, content }, index) in itemInfo"
      :key="index"
      :title="title"
      :content="content"
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="400"
    />
  </div>
  <Footer />
</template>
