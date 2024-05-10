<script>
import Button from "./icons/Button.vue";
import validateForm from "@/mixins/validateForm.js";
import axios from "axios";
import logoImg from "@/assets/images/logo.webp";
import { useToast } from "vue-toastification";

export default {
  mixins: [validateForm],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      loadingButton: false,
      toast: null,
      logoImg: logoImg,
    };
  },
  mounted() {
    this.toast = useToast();
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  },
  components: {
    Button,
  },
  methods: {
    async login() {
      try {
        this.loadingButton = true;
        const response = await axios.post("/login", {
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

          localStorage.setItem("name", this.name);
          this.$router.push("/");
        } else {
          this.toast.error("Erro ao logar. Verifique os campos");
        }
      } catch (error) {
        this.toast.error("Informações inválidas");
      } finally {
        this.loadingButton = false;
      }
    },
    async resetPassword(e) {
      e.preventDefault();

      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.email && this.email.length <= 20 && pattern.test(this.email)) {
        try {
          const response = await axios.post("/reset-password", {
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
      } else {
        this.toast.error("Preencha o campo de email");
      }
    },
  },
};
</script>

<template>
  <section
    class="w-full h-screen flex flex-col justify-center items-center max-sm:mb-20"
  >
    <div class="relative z-10" data-aos="zoom-in">
      <div class="flex justify-center items-center flex-col">
        <img :src="logoImg" alt="" class="w-40 brightness-125 max-sm:w-32" />

        <form
          class="flex flex-col gap-8 w-full p-2 max-w-72"
          @submit.prevent="login"
        >
          <div class="flex items-center relative">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="nome"
              autofocus
            ></v-text-field>
          </div>
          <div class="flex items-center relative">
            <v-text-field
              label="email"
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
          </div>
          <div class="relative">
            <v-text-field
              label="senha"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
            >
              <div
                class="absolute right-0 top-0 py-5 px-3 hover:cursor-pointer"
                @click="() => (showPassword = !showPassword)"
              >
                <font-awesome-icon
                  :icon="['fas', 'eye']"
                  class="hover:cursor-pointer opacity-50"
                  v-if="showPassword"
                />
                <font-awesome-icon
                  :icon="['fas', 'eye']"
                  class="hover:cursor-pointer"
                  v-else
                />
              </div>
            </v-text-field>
          </div>

          <Button :loadingProp="loadingButton" type="submit" label="Entrar" />
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
              <router-link to="/register" class="text-[#40d292] hover:underline"
                >Crie uma conta.</router-link
              >
            </p>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
