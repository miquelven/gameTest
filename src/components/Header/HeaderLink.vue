<script>
export default {
  props: ["text", "to"],
};
</script>

<template>
  <router-link :to="to"
    ><span
      class="transition duration-300 ease-in py-8 relative text-zinc-400 hover:text-zinc-100"
    >
      {{ text }}
    </span>
  </router-link>
</template>
