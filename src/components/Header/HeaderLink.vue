<script>
export default {
  props: ["text", "to"],
};
</script>

<template>
  <router-link :to="to"
    ><span
      class="transition duration-300 ease-in py-8 relative hover:text-white hover:font-bold before:content-[''] before:absolute before:right-0 before:bottom-[20px] before:w-0 before:overflow-hidden before:border-b-4 before:border-transparent before:transition-all before:duration-300 hover:before:w-6/12 hover:before:border-[#2bb478]"
    >
      {{ text }}
    </span>
  </router-link>
</template>
