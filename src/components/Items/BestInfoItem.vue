<script>
export default {
  props: ["score", "position"],
};
</script>

<template>
  <td
    class="bg-[#0a0a0a] shadow-sm shadow-white/10 py-4 transition duration-150 ease-in text-4xl w-96 m-auto flex justify-between gap-16 rounded-md px-7 font-medium hover:bg-[#040404] max-2xl:w-72 max-2xl:px-6 max-2xl:text-3xl max-lg:w-52 max-lg:text-2xl max-sm:text-lg max-md:text-xl max-sm:w-full"
    :style="{ backgroundColor: position < 4 ? '#040404' : '' }"
    v-motion
    :initial="{
      opacity: 0,
    }"
    :enter="{
      opacity: 1,
      transition: {
        duration: 400,
        type: 'keyframes',
        ease: 'easein,',
      },
    }"
  >
    <span class="font-semibold">{{ position }} -</span>
    <p class="font-light text-3xl max-xl:text-2xl max-lg:text-xl">
      {{ score }}
    </p>
  </td>
</template>
