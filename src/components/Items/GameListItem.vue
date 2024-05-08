<script>
export default {
  props: ["item", "itemIndex"],
  data() {
    return {
      overlay: false,
    };
  },
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
      :data-aos="itemIndex % 2 == 0 ? 'fade-right' : 'fade-left'"
      :data-aos-delay="itemIndex * 100"
    >
      <v-card
        :data-aos-delay="itemIndex * 300"
        @click="() => (overlay = true)"
        v-bind="props"
        class="w-full mx-auto my-8 pb-5 overflow-y-auto scrollbar-hide max-md:w-11/12"
        style="background: #0c0c0c"
        :variant="isHovering ? 'ghost' : ''"
        elevation="4"
        max-width="344"
        height="400"
        rounded="lg"
      >
        <div class="h-48 overflow-hidden">
          <v-img
            :src="item.img"
            :class="
              isHovering
                ? 'h-full transition duration-700 scale-125'
                : 'h-full transition duration-700  scale-100'
            "
            cover
          ></v-img>
        </div>
        <v-card-item>
          <v-card-title class="text-[#ccc]">
            {{ item.name }}
          </v-card-title>
        </v-card-item>

        <v-card-text class="text-[#bababa] font-light">
          {{ item.tip }}
        </v-card-text>
      </v-card>
    </div>
  </v-hover>

  <v-overlay
    v-model="overlay"
    style="background-color: #000a"
    @click="() => (overlay = false)"
  >
    <v-card
      class="absolute inset-0 w-screen bg-transparent h-screen flex justify-center items-center"
    >
      <v-img
        :src="item.img"
        class="m-auto my-[calc(50vh)] -translate-y-1/2 w-1/3 h-1/2"
      ></v-img>
    </v-card>
  </v-overlay>
</template>
