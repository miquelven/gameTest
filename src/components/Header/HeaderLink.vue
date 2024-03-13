<script>
export default {
  props: ["text", "to"],
};
</script>

<template>
  <router-link :to="to"
    ><span class="">
      {{ text }}
    </span>
  </router-link>
</template>
