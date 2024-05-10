<script>
import LinksMenu from "./LinksMenu.vue";

export default {
  components: { LinksMenu },
  emits: ["logout"],
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<template>
  <button
    class="hidden justify-center items-center cursor-pointer max-md:flex"
    @click="() => (showMenu = !showMenu)"
  >
    <font-awesome-icon
      class="p-5 h-5"
      :icon="['fas', 'bars']"
      v-if="!showMenu"
    />
    <font-awesome-icon class="p-5 h-5" :icon="['fas', 'xmark']" v-else />
  </button>
  <nav
    v-if="showMenu"
    v-click-outside="() => (showMenu = false)"
    class="absolute left-0 top-[60px] flex flex-col bg-[#0a0a0a] border-y-[2px] border-[rgba(255,255,255,.1)] w-full font-light"
    data-aos="fade-down"
  >
    <LinksMenu :isMobile="true" @closeMenu="() => (showMenu = false)" />
    <button
      @click="() => $emit('logout')"
      class="transition-all duration-300 w-full text-center py-4 hover:bg-white/10"
    >
      <span class="py-8 relative"> Sair </span>
    </button>
  </nav>
</template>
