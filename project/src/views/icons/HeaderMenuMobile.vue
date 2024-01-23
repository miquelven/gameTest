<script>
export default {
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
      class="absolute left-0 top-[80px] flex flex-col bg-black/95 border-b-[2px] border-[rgba(255,255,255,.2)] w-full gap-10 py-5 font-bold"
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
    >
      <router-link to="/scores" class="w-full text-center"
        ><span class="py-8 relative"> Pontuações </span>
      </router-link>
      <router-link to="/best" class="w-full text-center"
        ><span class="py-8 relative"> Melhores </span>
      </router-link>
      <router-link to="/contact" class="w-full text-center"
        ><span class="py-8 relative"> Contato </span>
      </router-link>
      <router-link to="/about" class="w-full text-center"
        ><span class="py-8 relative"> Sobre </span>
      </router-link>
      <button @click="() => $emit('logout')" class="w-full text-center">
        <span class="py-8 relative"> Sair </span>
      </button>
    </nav>
  </template>
</template>
