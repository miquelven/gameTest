<script>
import AboutItem from "@/components/Items/AboutItem.vue";
import aboutItemInfo from "@/data/aboutItemInfo";
import Container from "./icons/Container.vue";

export default {
  components: {
    AboutItem,
    Container,
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
  <Container>
    <section class="m-auto mb-5 max-w-5xl px-5 flex flex-col gap-24">
      <AboutItem
        v-for="({ title, content }, index) in itemInfo"
        :key="index"
        :title="title"
        :content="content"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="400"
      />
    </section>
  </Container>
</template>
