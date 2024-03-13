<script>
export default {
  props: ["isMobile"],
  data() {
    return {
      dataLinks: {
        links: ["/scores", "/best", "/contact", "/about"],
        texts: ["Pontuações", "Melhores", "Contato", "Sobre"],
      },
    };
  },
};
</script>

<template>
  <router-link
    @click="() => $emit('closeMenu')"
    v-for="(link, linkIndex) in dataLinks.links"
    :key="linkIndex"
    :to="link"
    :class="
      isMobile
        ? `w-full text-center`
        : `transition duration-300 ease-in py-8 relative hover:font-medium before:content-[''] before:absolute before:right-0 before:bottom-[20px] before:w-0 before:overflow-hidden before:border-b-4 before:border-transparent before:transition-all before:duration-300 hover:before:w-6/12 hover:before:border-[#2bb478]`
    "
    ><span class="py-8 font-light">
      {{ dataLinks.texts[linkIndex] }}
    </span>
  </router-link>
</template>
