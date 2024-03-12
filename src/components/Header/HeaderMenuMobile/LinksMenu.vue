<script>
export default {
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
    v-for="(link, linkIndex) in dataLinks.links"
    :key="linkIndex"
    :to="link"
    class="w-full text-center"
    ><span class="py-8 font-light">
      {{ dataLinks.texts[linkIndex] }}
    </span>
  </router-link>
</template>
