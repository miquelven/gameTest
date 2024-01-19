<script>
export default {
  props: ["score", "position"],
};
</script>

<template>
  <td
    class="transition duration-150 ease-in text-4xl w-96 m-auto flex justify-between gap-16 border-2 rounded-md py-3 px-16 font-bold shadow-[0px_15px_10px_rgba(0,0,0,.7)] hover:shadow-xl hover:shadow-black hover:scale-110"
    :style="{
      borderColor: position == 1 ? '#ff0' : '',
    }"
    v-motion
    :initial="{
      x: 500,
      opacity: 0,
    }"
    :enter="{
      x: 0,
      opacity: 1,
      transition: {
        duration: 400,
        type: 'keyframes',
        ease: 'easein,',
      },
    }"
  >
    <span class="">{{ position }} </span>
    <p>{{ score }}</p>
  </td>
</template>
