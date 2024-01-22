<script>
import InputForm from "./icons/InputForm.vue";
import validateForm from "@/mixins/validateForm.js";
export default {
  mixins: [validateForm],
  components: {
    InputForm,
  },
  data() {
    return {
      userName: "miquelven",
      email: "miquelven.silva@gmail.com",
      password: "@miquelven2121",
      C_password: "@miquelven2121",

      warningName: "",
      warningEmail: "",
      warningPassword: "",
      warningC_password: "",
    };
  },
  mounted() {
    this.$refs.InputForm.$refs.input.focus();
  },
  methods: {
    async register(e) {
      this.inputCheck(e.target.getElementsByTagName("input"));

      try {
        const response = await this.$axios.post("/register", {
          username: this.userName,
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          const { name, token } = response.data;
          localStorage.setItem("token", token);
          const formattedName = "miquelven";
          // const formattedName =
          //   name.charAt(0).toUpperCase() + name.substring(1);
          localStorage.setItem("name", formattedName);
          this.$router.push("/");
        } else {
          // Trate falhas de registro
        }
      } catch (error) {
        console.error("Erro durante a solicitação de registro:", error);
        // Trate erros de solicitação
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
      e.target.parentElement.querySelector("input").focus();
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
    warningsCheck() {
      return this.warningName == "" &&
        this.warningEmail == "" &&
        this.warningPassword == "" &&
        this.warningC_password == ""
        ? true
        : false;
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
      @submit.prevent="register"
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
    </form>
  </div>
</template>
