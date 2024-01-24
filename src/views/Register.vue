<script>
import InputForm from "./icons/InputForm.vue";
import validateForm from "@/mixins/validateForm.js";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/Modal.vue";
export default {
  mixins: [validateForm],
  components: {
    InputForm,
    Modal,
  },
  data() {
    return {
      userName: "",
      email: ".",
      password: "",
      C_password: "",

      warningName: "",
      warningEmail: "",
      warningPassword: "",
      warningC_password: "",

      toast: null,
      modal: false,
      textModal: "",
    };
  },
  mounted() {
    this.toast = useToast();

    this.$refs.InputForm.$refs.input.focus();
  },
  methods: {
    showModal(type) {
      if (type == "") {
        this.textModal = "";
        this.modal = false;
        return;
      }

      this.modal = true;
      this.textModal = type;
    },
    verifyInputs(e) {
      this.inputCheck(e.target.getElementsByTagName("input"));
      if (
        this.warningName == "" &&
        this.warningEmail == "" &&
        this.warningPassword == "" &&
        this.warningC_password == ""
      )
        this.register();
    },
    async register() {
      try {
        const response = await this.$axios.post("/register", {
          username: this.userName,
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          const { name, token } = response.data;
          localStorage.setItem("token", token);

          localStorage.setItem("name", name);

          const user = {
            name: this.userName,
            email: this.email,
          };
          this.$store.commit("setUser", user);

          this.$router.push("/");
        } else {
          this.toast.error(response.data.error);
          console.log(response.data.error);
        }
      } catch (error) {
        this.toast.error("Não foi possível realizar o registro");
        console.log(error.message);
      }
    },
    showIconPassword(e) {
      let passwordIconEl = e.currentTarget;

      let opacity = passwordIconEl.style.opacity;
      if (opacity == 0) opacity = "0.5";
      opacity = opacity == "0.5" ? "1" : "0.5";

      passwordIconEl.style.opacity = opacity;

      this.changeInputType(passwordIconEl);
      // dar o foco no input depois de clicar no icone
      e.currentTarget.parentElement.querySelector("input").focus();
    },
    changeInputType(element) {
      const input = element.parentElement.children[0];

      input.getAttribute("type") == "text"
        ? input.setAttribute("type", "password")
        : input.setAttribute("type", "text");
    },
    inputCheck(inputs) {
      this.warningName = this.validateName(inputs[0]);
      this.warningEmail = this.validateEmail(inputs[1]);
      this.warningPassword = this.validatePassword(inputs[2]);

      this.warningC_password = this.validateConfirmPassword(
        inputs[3],
        inputs[2]
      );
    },
  },
};
</script>

<template>
  <div
    class="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center relative z-0"
    id="container"
  >
    <h1 class="text-5xl mb-20 max-[400px]:text-4xl">Registre-se</h1>
    <form
      class="relative z-10 w-72 flex flex-col justify-center items-center gap-9"
      @submit.prevent="verifyInputs"
    >
      <div class="w-full flex items-center relative">
        <InputForm
          type="text"
          text="Digite seu nome"
          ref="InputForm"
          @valueInput="(nameValue) => (userName = nameValue)"
          :warning="warningName"
        />
      </div>
      <div class="w-full flex items-center relative">
        <InputForm
          type="text"
          text="Digite o email"
          @valueInput="(emailValue) => (email = emailValue)"
          :warning="warningEmail"
        />
      </div>
      <div class="w-full flex items-center relative">
        <InputForm
          type="password"
          text="Crie uma senha"
          @valueInput="(passwordValue) => (password = passwordValue)"
          :warning="warningPassword"
        />
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="absolute right-0 cursor-pointer p-4 opacity-50 max-sm:right-5"
          @click="showIconPassword"
        />
      </div>

      <div class="w-full flex items-center relative">
        <InputForm
          type="password"
          text="Repita a senha"
          @valueInput="(C_passwordValue) => (C_password = C_passwordValue)"
          :warning="warningC_password"
        />
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="absolute right-0 cursor-pointer p-4 opacity-50 max-sm:right-5"
          @click="showIconPassword"
        />
      </div>

      <button
        type="submit"
        class="mt-2 w-full outline-none shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
      >
        Registrar
      </button>

      <span
        >Já tem uma conta?
        <router-link to="/login" class="text-yellow-400 hover:underline"
          >Entrar.</router-link
        >
      </span>
      <span class="text-sm text-white/60"
        >Ao criar uma conta, você concorda com os
        <button
          @click="showModal('terms')"
          class="text-yellow-400/80 hover:underline"
        >
          Termos de Serviço
        </button>
        e
        <button
          @click="showModal('privacity')"
          class="text-yellow-400/80 hover:underline"
        >
          Políticas de Privacidade.
        </button>
      </span>
    </form>
    <template v-if="modal">
      <Modal :text="textModal" @closeModal="showModal('')" />
    </template>
  </div>
</template>
