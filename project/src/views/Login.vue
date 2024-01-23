<script>
import axios from "axios";
import InputForm from "./icons/InputForm.vue";
import validateForm from "@/mixins/validateForm.js";
import { useToast } from "vue-toastification";

export default {
  mixins: [validateForm],
  data() {
    return {
      name: "",
      email: "",
      password: "",

      warningName: "",
      warningEmail: "",
      warningPassword: "",

      toast: null,
    };
  },
  mounted() {
    this.toast = useToast();
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    this.$refs.InputName.$refs.input.focus();
  },
  components: {
    InputForm,
  },
  methods: {
    async login(e) {
      this.inputCheck(e.target.getElementsByTagName("input"));

      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);

          const user = {
            name: this.name,
            email: this.email,
          };
          this.$store.commit("setUser", user);

          const formattedName =
            this.name.charAt(0).toUpperCase() + this.name.substring(1);
          localStorage.setItem("name", formattedName);
          this.$router.push("/");
        } else {
          this.toast.error("Erro ao logar. Verifique os campos");
        }
      } catch (error) {
        console.error("Erro durante a solicitação de login:", error);
      }
    },
    showIconPassword(e) {
      let passwordIconEl = e.currentTarget;

      let opacity = passwordIconEl.style.opacity;
      if (opacity == 0) opacity = "0.5";
      opacity = opacity == "0.5" ? "1" : "0.5";

      passwordIconEl.style.opacity = opacity;

      this.changeInputType(passwordIconEl);

      // DAR O FOCO NO INPUT QUANDO CLICAR NO ICONE
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
    },
    warningsCheck() {
      return this.warningEmail == "" && this.warningPassword == ""
        ? true
        : false;
    },
    async resetPassword(e) {
      e.preventDefault();

      if (this.validateEmail(this.$refs.InputEmail.$refs.input) === "") {
        try {
          const response = await this.$axios.post("/reset-password", {
            email: this.email,
          });

          if (response.data.success) {
            this.toast.success("Email enviado!");
          } else {
            if (this.email == "")
              this.toast.error("Email não enviado. Preencha o campo de email");
            this.toast.error("Email não enviado");
          }
        } catch (error) {
          console.error(
            "Erro durante a solicitação de recuperação de senha:",
            error
          );
        }
      }
    },
  },
};
</script>

<template>
  <div
    class="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center"
  >
    <div class="relative z-10 mb-28">
      <div class="flex justify-center items-center flex-col">
        <img
          src="@/assets/images/logo.png"
          alt=""
          class="w-48 brightness-125"
        />

        <form class="flex flex-col gap-9 w-full p-2" @submit.prevent="login">
          <div class="flex items-center relative">
            <InputForm
              ref="InputName"
              type="text"
              text="Nome"
              @valueInput="(nameValue) => (name = nameValue)"
              :warning="warningName"
            />
          </div>
          <div class="flex items-center relative">
            <InputForm
              ref="InputEmail"
              type="email"
              text="Email"
              @valueInput="(emailValue) => (email = emailValue)"
              :warning="warningEmail"
            />
          </div>
          <div class="flex items-center relative">
            <InputForm
              type="password"
              text="Senha"
              @valueInput="(passwordValue) => (password = passwordValue)"
              :warning="warningPassword"
            />
            <!-- Add Icons using String format -->
            <font-awesome-icon
              :icon="['fas', 'eye']"
              class="absolute opacity-60 right-0 cursor-pointer p-4 z-0"
              @click="showIconPassword"
            />
          </div>

          <input
            type="submit"
            value="Entrar"
            class="mt-2 w-full outline-none shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
          />
        </form>
        <div class="flex flex-col justify-center items-center mt-6">
          <span @click.prevent="resetPassword">
            <a href="" class="text-gray-200/80 hover:underline"
              >Esqueceu sua senha?</a
            >
          </span>
          <span>
            <p class="text-gray-400/80">
              Não tem uma conta?
              <router-link
                to="/register"
                class="text-yellow-400 hover:underline"
                >Crie uma conta.</router-link
              >
            </p>
          </span>
        </div>

        <!-- AREA DE LOGIN DE OUTRAS MANEIRAS -->
        <div class="w-full flex items-center mt-7">
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#FF3E30] w-9 h-9w-10 h-10 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'google']" class="w-5 h-5" />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#3b5998] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon
                :icon="['fab', 'facebook-f']"
                class="w-5 h-5"
              />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#E1306C] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" class="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
