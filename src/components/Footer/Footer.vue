<script>
import Modal from "../Modal/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      textModal: "",
    };
  },
  methods: {
    showModal(type) {
      console.log(type);
      if (type == "") {
        this.textModal = "";
        this.modal = false;
        return;
      }

      this.modal = true;
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
          <button
            @click="showModal('terms')"
            class="text-[#2bb478] hover:underline"
          >
            Termos de Serviço
          </button>
          e
          <button
            @click="showModal('privacity')"
            class="text-[#2bb478] hover:underline"
          >
            Políticas de Privacidade.
          </button>
        </div>
      </div>
    </div>
    <template v-if="modal">
      <Modal
        :text="textModal"
        @closeModal="showModal('')"
        class="-top-[950px]"
      />
    </template>
  </footer>
</template>
