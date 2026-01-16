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
  <div v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }">
    <div
      class="relative h-[580px] max-h-[80vh] w-[700px] max-w-full overflow-y-auto bg-gradient-to-b from-neutral-950/95 via-neutral-900/95 to-black border border-emerald-500/40 rounded-2xl shadow-2xl shadow-black/80 p-10 max-md:w-[500px] max-[550px]:w-[90vw] max-[550px]:p-4"
      v-click-outside="() => $emit('closeModal')"
      transition="v-expand-transition"
    >
      <template v-if="text == 'privacity'">
        <div
          v-for="(data, index) in privacyPolicyData.privacyPolicy"
          :key="index"
          class="text-neutral-200"
        >
          <h3
            :class="[
              index === 0
                ? 'text-2xl font-semibold mb-4'
                : 'text-lg font-semibold mb-3',
            ]"
          >
            {{ data.title }}
          </h3>
          <p
            class="mb-5 font-light text-sm leading-7 text-neutral-300"
            v-for="(text, textIndex) in data.content"
            :key="textIndex"
          >
            {{ text }}
          </p>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(data, index) in privacyPolicyData.terms"
          :key="index"
          class="text-neutral-200"
        >
          <h3 class="mb-4 mt-6 text-xl font-semibold">
            {{ data.title }}
          </h3>
          <p
            class="font-light text-sm leading-7 text-neutral-300 mb-4"
            v-for="(text, textIndex) in data.content"
            :key="textIndex"
          >
            {{ text }}
          </p>
        </div>
      </template>
      <button
        class="transition-all duration-200 absolute top-4 right-4 w-8 h-8 z-50 cursor-pointer hover:scale-110 flex items-center justify-center rounded-full bg-black/60 hover:bg-emerald-500/80"
        @click="() => $emit('closeModal')"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" class="text-lg text-neutral-100" />
      </button>
    </div>
  </div>
</template>
