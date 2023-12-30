<script>
export default {
  props: ["type", "text", "focus"],
  data() {
    return {
      valueInput: "",
    };
  },
};
</script>

<template>
  <input
    :type="type"
    :placeholder="text"
    class="w-full placeholder:text-white/30 bg-white/10 rounded-md py-2 px-2 outline-none shadow-md opacity-60 shadow-white/15 focus:shadow-white/30 focus:bg-white/15 focus:opacity-100"
    :autofocus="focus"
    v-model="valueInput"
    @keyup="() => $emit('valueInput', valueInput)"
  />
</template>
