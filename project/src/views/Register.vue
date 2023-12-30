<script>
import InputForm from "./icons/InputForm.vue";
export default {
  components: {
    InputForm,
  },
  data() {
    return {
      userName: "miquelven",
      email: "miquelven.silva@gmail.com",
      password: "@miquelven2121",
      C_password: "@miquelven2121",
    };
  },
  methods: {
    async register() {
      if (!this.email || !this.password || !this.C_password) {
        return alert("Please fill in all fields");
      }
      if (this.password !== this.C_password) {
        return alert("Passwords do not match");
      }

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

      if (res.success) {
        localStorage.setItem("token", res.token);
        console.log("logou");
        this.$router.push("/");
      } else {
        alert(res.message);
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
  },
};
</script>

<template>
  <div
    class="h-screen w-screen flex justify-center items-center relative z-0"
    id="container"
  >
    <form
      class="relative z-10 w-72 flex flex-col justify-center items-center gap-5"
      @submit.prevent="register"
    >
      <InputForm
        type="text"
        text="Digite seu nome"
        focus="true"
        @valueInput="(nameValue) => (userName = nameValue)"
      />
      <InputForm
        type="text"
        text="Digite o email"
        focus="false"
        @valueInput="(emailValue) => (email = emailValue)"
      />

      <div class="w-full flex items-center relative">
        <InputForm
          type="password"
          text="Crie uma senha"
          focus="false"
          @valueInput="(passwordValue) => (password = passwordValue)"
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
          focus="false"
          @valueInput="(C_passwordValue) => (C_password = C_passwordValue)"
        />
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="absolute right-0 cursor-pointer p-4 opacity-50"
          @click="showIconPassword"
        />
      </div>

      <button
        type="submit"
        class="mt-2 w-full shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
      >
        Registrar
      </button>

      <!-- <input
        type="submit"
        value="Cadastrar"
        @click.prevent=""
        class="mt-2 w-full shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
      /> -->

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
