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
    class="m-auto mt-36 mb-5 text-sm text-zin-400 max-sm:text-xs relative"
  >
    <v-divider></v-divider>
    <div class="max-w-screen-2xl mt-4 m-auto">
      <div class="flex flex-col items-center gap-5 justify-center">
        <p>
          <font-awesome-icon :icon="['fas', 'copyright']" />
          {{ currentYear }} GameTest. Todos os direitos reservados
        </p>
        <div>
          <button @click="showModal('terms')" class="hover:underline">
            <TextHighlight> Termos de Serviço </TextHighlight>
          </button>
          e
          <button @click="showModal('privacity')" class="hover:underline">
            <TextHighlight> Políticas de Privacidade. </TextHighlight>
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
