<script>
import Modal from "../Modal/index.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: {
    Modal,
    TextHighlight,
  },
  data() {
    return {
      textModal: "",
      isModalOpen: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalOpen = false;
    },
    showModal(type) {
      if (type == "") {
        this.textModal = "";
        this.isModalOpen = false;
        return;
      }

      this.isModalOpen = true;
      this.textModal = type;
    },
  },
  computed: {
    currentYear(current, old) {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer
    class="m-auto mt-36 mb-5 text-sm text-zinc-400 max-sm:text-xs relative"
  >
    <div
      class="pointer-events-none absolute inset-x-0 -top-10 flex justify-center"
    >
      <div
        class="h-px w-11/12 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-70"
      ></div>
    </div>
    <div class="max-w-screen-2xl mt-10 m-auto px-4 md:px-6">
      <div
        class="flex flex-col md:flex-row items-center md:items-end gap-6 justify-between"
      >
        <div class="text-center md:text-left space-y-2">
          <p class="text-xs uppercase tracking-[0.25em] text-emerald-400">
            GameTest
          </p>
          <p class="text-zinc-300 text-sm">
            <font-awesome-icon :icon="['fas', 'copyright']" />
            {{ currentYear }} GameTest. Todos os direitos reservados.
          </p>
        </div>
        <div
          class="flex flex-col md:flex-row items-center gap-2 text-xs md:text-sm"
        >
          <button @click="showModal('terms')" class="hover:underline">
            <TextHighlight> Termos de Serviço </TextHighlight>
          </button>
          <span class="hidden md:inline text-zinc-500">•</span>
          <button @click="showModal('privacity')" class="hover:underline">
            <TextHighlight> Políticas de Privacidade </TextHighlight>
          </button>
        </div>
      </div>
    </div>
    <Teleport to="#modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
      >
        <Modal @closeModal="closeModal" :text="textModal" />
      </div>
    </Teleport>
  </footer>
</template>
