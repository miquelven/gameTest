<script>
export default {
  props: ["data", "position"],
};
</script>

<template>
  <td
    v-motion
    :initial="{
      opacity: 0,
    }"
    :enter="{
      opacity: 1,
      transition: {
        duration: 300,
        type: 'keyframes',
        ease: 'easein',
        delay: 500,
      },
    }"
  >
    <p
      class="text-zinc-200 text-light text-2xl max-md:text-xl max-sm:text-base"
    >
      {{ data.name }}
    </p>
  </td>
  <td
    v-motion
    :initial="{
      opacity: 0,
    }"
    :enter="{
      opacity: 1,
      transition: {
        duration: 300,
        type: 'keyframes',
        ease: 'easein',
        delay: 500,
      },
    }"
  >
    <p class="text-light max-sm:text-sm">{{ data.score }}</p>
  </td>
</template>
