<script>
import TopInfoItem from "@/components/Items/TopInfoItem.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import useGetTopScores from "@/hooks/useGetTopScores.js";
import axios from "axios";

export default {
  components: {
    TopInfoItem,
    TextHighlight,
  },
  data() {
    return {
      topScores: [
        { name: "kdfks", score: "kdfmksdm" },
        { name: "kdfks", score: "kdfmksdm" },
        { name: "miquelvesdfsdfn", score: "kdfmksdm" },
        { name: "kdfks", score: "kdfmksdm" },
      ],
      loading: false,
    };
  },
  mounted() {
    const { data, isPending } = useGetTopScores();
    // this.topScores = data;

    this.loading = isPending;
  },
};
</script>

<template>
  <section class="w-full min-h-[calc(100vh-80px)] mt-44">
    <div class="min-w-screen-2xl m-auto flex justify-center">
      <table
        class="w-1/3 grid grid-cols-1 gap-10 p-10 bg-black-light shadow-md shadow-black-half rounded-lg max-xl:w-1/2 max-md:w-10/12 max-md:mx-5 max-sm:w-full max-sm:gap-7 max-sm:px-3 max-sm:py-5"
        data-aos="zoom-in"
        data-aos-duration="700"
      >
        <tr class="flex justify-center">
          <th>
            <h3
              data-aos="zoom-in"
              data-aos-delay="750"
              class="text-5xl font-medium mb-5 max-2xl:text-4xl max-sm:text-3xl"
            >
              Top Pontuações:
            </h3>

            <div
              class="font-medium text-white-light leading-7 max-sm:text-sm max-sm:mb-5"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <p>Listagem dos jogadores com as melhores pontuações .</p>
              <p>
                Destaque das
                <TextHighlight> pontuações mais altas </TextHighlight> dos
                <TextHighlight> melhores jogadores </TextHighlight> em nossos
                jogos
              </p>
            </div>
          </th>
        </tr>

        <template v-if="loading">
          <div
            class="flex justify-center items-center scale-150 h-[calc(40vh)]"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#2bb478]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </template>

        <template v-else-if="topScores && topScores.length > 0">
          <tr
            v-for="(item, index) in topScores"
            :key="index"
            class="transition-all duration-300 w-10/12 mx-auto flex justify-between hover:bg-black-xlight hover:scale-105 items-center text-xl px-7 py-4 rounded-md max-sm:w-full max-sm:flex-wrap max-sm:gap-4"
            :class="[index < 3 ? 'bg-black-bold' : '']"
            v-motion
            :initial="{
              opacity: 0,
            }"
            :enter="{
              opacity: 1,
              transition: {
                duration: 700,
                type: 'keyframes',
                ease: 'easein',
                delay: 400,
              },
            }"
          >
            <TopInfoItem :data="item" :position="index" />
          </tr>
        </template>

        <template v-else>
          <p
            data-aos="zoom-in"
            data-aos-delay="1000"
            class="text-center text-white-light-shadow max-md:text-sm"
          >
            Erro ao obter os dados. Tente novamente mais tarde
          </p>
        </template>
      </table>
    </div>
  </section>
</template>
