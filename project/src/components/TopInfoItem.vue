<script>
export default {
  props: ["data"],
};
</script>

<template>
  <td>
    <p
      class="font-bold text-2xl bg-clip-text bg-gradient-to-l from-stone-800 via-orange-700 to-red-600 text-transparent"
    >
      {{ data.name }}
    </p>
  </td>
  <td>
    <p class="font-bold">{{ data.score }}</p>
  </td>
</template>
