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
    <span class="">{{ position + 1 }}</span>
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
    <p class="text-zinc-200 text-2xl max-[550px]:text-lg max-[375px]:text-base">
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
    <p class="  ">{{ data.score }}</p>
  </td>
</template>
