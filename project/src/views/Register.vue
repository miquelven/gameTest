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

      const res = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          first_name: this.userName,
        }),
      }).then((res) => res.json());

      if (!this.warningsCheck()) {
        return;
      }

      if (res.success) {
        localStorage.setItem("token", res.token);

        this.$router.push("/");
      } else {
        if (
          res.message ==
          "A user with the specified email already exists for this project."
        )
          alert("Esse usuário já está cadastrado!");
      }
    },
    showIconPassword(e) {
      let passwordIconEl = e.target;

      let opacity = passwordIconEl.style.opacity;
      if (opacity == 0) opacity = "0.5";
      opacity = opacity == "0.5" ? "1" : "0.5";

      passwordIconEl.style.opacity = opacity;

      this.changeInputType(passwordIconEl);
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
    class="h-screen w-screen flex justify-center items-center relative z-0"
    id="container"
  >
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
          class="absolute right-0 cursor-pointer p-4 opacity-50"
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
          class="absolute right-0 cursor-pointer p-4 opacity-50"
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

<style scoped>
#container {
  background: url("@/assets/images/backgroundRegister.png");
  background-position: center;
  background-size: cover;
  position: relative;
}
#container::before {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
