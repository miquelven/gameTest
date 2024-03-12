<script>
import privacyPolicy from "@/data/privacyPolicyTerms";

export default {
  props: ["text"],
  data() {
    return {
      privacyPolicyData: "",
    };
  },
  mounted() {
    this.privacyPolicyData = privacyPolicy;
  },
};
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, scale: 0 }"
    :enter="{
      opacity: 1,
      scale: 1,
      transition: {
        delay: 200,
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    }"
  >
    <div
      class="h-[580px] w-[700px] overflow-y-auto bg-black/90 p-10 z-50 max-md:w-[500px] max-md:left-[calc(50%-250px)] max-[550px]:w-[250px] max-[550px]:left-[calc(50%-125px)] max-[550px]:p-3"
      v-click-outside="() => $emit('closeModal')"
      transition="v-expand-transition"
    >
      <template v-if="text == 'privacity'">
        <div
          v-for="(data, index) in privacyPolicyData.privacyPolicy"
          :key="index"
        >
          <h3 :style="index == 0 ? 'font-size: 30px;' : 'font-size: 18px;'">
            {{ data.title }}
          </h3>
          <p
            class="my-10 font-light text-sm leading-7"
            v-for="(text, textIndex) in data.content"
            :key="textIndex"
          >
            {{ text }}
          </p>
        </div>
      </template>

      <template v-else>
        <div v-for="(data, index) in privacyPolicyData.terms" :key="index">
          <h3 class="my-5 text-2xl">{{ data.title }}</h3>
          <p
            class="font-light text-sm leading-7"
            v-for="(text, textIndex) in data.content"
            :key="textIndex"
            :style="[
              (index == 1 && textIndex == 1) || textIndex == 6
                ? 'margin-top: 20px;'
                : '',
            ]"
          >
            {{ text }}
          </p>
        </div>
      </template>
      <button
        class="transition-all duration-300 absolute top-0 left-0 w-6 h-6 z-50 cursor-pointer hover:scale-125"
        @click="() => $emit('closeModal')"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" class="text-2xl" />
      </button>
    </div>
  </div>
</template>
