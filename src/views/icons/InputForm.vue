<script>
export default {
  emits: ["valueInput"],

  props: ["type", "text", "warning"],
  data() {
    return {
      inputValue: "",
      activeAutoFocus: false,
    };
  },
};
</script>

<template>
  <input
    ref="input"
    :type="type"
    :placeholder="text"
    :style="warning ? 'border: 2px solid rgb(248 113 113)' : ''"
    class="w-full m-auto border-2 border-transparent placeholder:text-white bg-white/10 rounded-md py-2 px-2 outline-none shadow-sm opacity-60 shadow-white/15 focus:bg-white/15 focus:opacity-100 max-sm:w-56"
    v-model="inputValue"
    @keyup="() => $emit('valueInput', inputValue)"
  />
  <template v-if="warning">
    <span class="absolute top-12 text-sm text-red-200">{{ warning }}</span>
  </template>
</template>
