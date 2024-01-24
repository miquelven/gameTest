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
        duration: 700,
        type: 'keyframes',
        ease: 'easein',
        delay: 800,
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
        duration: 700,
        type: 'keyframes',
        ease: 'easein',
        delay: 800,
      },
    }"
  >
    <p
      class="text-white text-2xl bg-clip-text bg-gradient-to-l from-stone-800 via-orange-700 to-red-600 text-transparent max-[550px]:text-lg max-[375px]:text-base"
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
        duration: 700,
        type: 'keyframes',
        ease: 'easein',
        delay: 800,
      },
    }"
  >
    <p class="  ">{{ data.score }}</p>
  </td>
</template>
