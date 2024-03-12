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
  <font-awesome-icon
    :icon="['fas', 'bars']"
    class="hidden h-5 cursor-pointer max-md:block"
    @click="() => (showMenu = !showMenu)"
  />
  <template v-if="showMenu">
    <nav
      v-click-outside="() => (showMenu = false)"
      class="absolute left-0 top-[80px] flex flex-col bg-black/95 border-b-[2px] border-[rgba(255,255,255,.2)] w-full gap-10 py-5 font-light"
      v-motion
      :initial="{
        opacity: 0,
      }"
      :enter="{
        opacity: 1,
        transition: {
          ease: 'easein',
          duration: 500,
          type: 'spring',
        },
      }"
      :tapped="{
        opacity: 0,
        transition: {
          ease: 'easein',
          delay: '200',
          duration: 500,
          type: 'spring',
        },
      }"
    >
      <LinksMenu @closeMenu="() => (showMenu = false)" />
      <button @click="() => $emit('logout')" class="w-full text-center">
        <span class="py-8 relative"> Sair </span>
      </button>
    </nav>
  </template>
</template>
