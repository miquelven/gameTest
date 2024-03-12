<script>
import AboutItem from "@/components/Items/AboutItem.vue";
import aboutItemInfo from "@/data/aboutItemInfo";

export default {
  components: {
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
  <div class="m-auto mb-5 mt-14 max-w-5xl px-5 py-10 flex flex-col gap-24">
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
</template>
