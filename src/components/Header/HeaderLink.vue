<script>
export default {
  props: ["text", "to"],
};
</script>

<template>
  <router-link :to="to"
    ><span
      class="transition duration-300 ease-in py-8 text-zinc-400 hover:text-zinc-200 relative"
    >
      {{ text }}
    </span>
  </router-link>
</template>
