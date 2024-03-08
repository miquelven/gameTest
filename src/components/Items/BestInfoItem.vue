<script>
export default {
  props: ["score", "position"],
};
</script>

<template>
  <td
    class="transition duration-150 ease-in text-4xl w-96 m-auto flex justify-between gap-16 border-2 rounded-md py-3 px-16 font-medium shadow-[0px_15px_10px_rgba(0,0,0,.7)] hover:shadow-md hover:shadow-black hover:scale-110 max-2xl:w-72 max-2xl:px-6 max-2xl:text-3xl max-lg:w-52 max-lg:text-2xl max-sm:text-lg max-md:text-xl"
    :style="{
      borderColor: position == 1 ? '#40d292' : '',
    }"
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
    <span>{{ position }} </span>
    <p>{{ score }}</p>
  </td>
</template>
