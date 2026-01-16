<script>
import Button from "./icons/Button.vue";
import validateForm from "@/mixins/validateForm.js";
import axios from "axios";
import logoImg from "@/assets/images/logo.webp";
import { useToast } from "vue-toastification";
import TextHighlight from "./icons/TextHighlight.vue";

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
      formValid: true,
      hasInteracted: false, // Track if user has tried to submit or interacted deeply
    };
  },
  mounted() {
    this.toast = useToast();
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  },
  components: {
    TextHighlight,
    Button,
  },
  computed: {
    isPasswordInvalid() {
      return this.passwordRules.some((rule) => rule(this.password) !== true);
    },
  },
  methods: {
    async login() {
      // Validate form first
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.hasInteracted = true;
        this.toast.error("Por favor, corrija os erros no formulário.");
        return;
      }

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

      if (this.email && pattern.test(this.email)) {
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
    class="w-full min-h-screen flex flex-col justify-center items-center relative bg-neutral-950 pattern-grid"
  >
    <div
      class="relative z-10 w-full max-w-md p-8 rounded-md border border-neutral-800 bg-[#171717] shadow-2xl transition-colors duration-300"
      data-aos="fade-up"
    >
      <!-- Decorator lines for HUD look -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-900 to-transparent opacity-30"
      ></div>

      <!-- Corner Accents -->
      <div
        class="absolute top-[-1px] left-[-1px] w-4 h-4 border-t-2 border-l-2 border-green-600 rounded-tl-lg transition-colors duration-300"
      ></div>
      <div
        class="absolute top-[-1px] right-[-1px] w-4 h-4 border-t-2 border-r-2 border-green-600 rounded-tr-lg transition-colors duration-300"
      ></div>
      <div
        class="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b-2 border-l-2 border-green-600 rounded-bl-lg transition-colors duration-300"
      ></div>
      <div
        class="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b-2 border-r-2 border-green-600 rounded-br-lg transition-colors duration-300"
      ></div>

      <div class="flex justify-center items-center flex-col w-full">
        <!-- Logo Area -->
        <div class="mb-8 flex flex-col items-center relative">
          <img :src="logoImg" alt="Game Logo" class="w-32 mb-4" />
          <h2 class="text-2xl font-bold text-white tracking-wider">
            BEM-VINDO
          </h2>
          <p class="text-neutral-400 text-sm mt-1">Faça login para continuar</p>
        </div>

        <v-form
          ref="form"
          v-model="formValid"
          class="flex flex-col gap-5 w-full"
          @submit.prevent="login"
        >
          <!-- Nome Input -->
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome de usuário"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
            class="gamer-input"
          >
            <template v-slot:prepend-inner>
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="mr-2 opacity-80 transition-colors"
                :class="
                  !formValid && hasInteracted && !name
                    ? 'text-red-500'
                    : 'text-green-500'
                "
              />
            </template>
          </v-text-field>

          <!-- Email Input -->
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
            class="gamer-input"
          >
            <template v-slot:prepend-inner>
              <font-awesome-icon
                :icon="['fas', 'envelope']"
                class="mr-2 opacity-80 transition-colors"
                :class="
                  !formValid &&
                  hasInteracted &&
                  (!email || emailRules[1](email) !== true)
                    ? 'text-red-500'
                    : 'text-green-500'
                "
              />
            </template>
          </v-text-field>

          <!-- Password Input -->
          <v-text-field
            label="Senha"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
            class="gamer-input"
          >
            <template v-slot:append-inner>
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="cursor-pointer hover:text-green-400 transition-colors"
                :class="
                  password && isPasswordInvalid
                    ? 'text-red-500'
                    : 'text-green-500'
                "
                @click="showPassword = !showPassword"
              />
            </template>
          </v-text-field>

          <div class="mt-2">
            <Button
              :loadingProp="loadingButton"
              type="submit"
              label="ENTRAR"
              class="w-full font-bold tracking-widest"
            />
          </div>
        </v-form>

        <div class="flex flex-col justify-center items-center mt-8 gap-3">
          <button
            @click.prevent="resetPassword"
            class="text-sm text-neutral-400 hover:text-green-400 transition-colors duration-200"
          >
            Esqueceu sua senha?
          </button>

          <div class="text-center text-sm text-neutral-500">
            Não tem uma conta?
            <router-link
              to="/register"
              class="text-green-500 font-semibold hover:text-green-400 hover:underline transition-colors ml-1"
            >
              Crie uma conta
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pattern-grid {
  background-color: #020617;
  background-image: radial-gradient(
      circle at top,
      rgba(34, 197, 94, 0.22),
      transparent 55%
    ),
    radial-gradient(circle at bottom, rgba(16, 185, 129, 0.18), transparent 55%);
  background-repeat: no-repeat;
}

/* 
  Minimal CSS override - Only adjusting text colors to ensure high contrast
  Leaving borders to Vuetify to avoid double-border issues
*/

:deep(.v-label) {
  color: #a3a3a3 !important;
}

:deep(.v-field--focused .v-label) {
  color: #22c55e !important;
}

:deep(.v-field--error .v-label),
:deep(.v-field--error.v-field--focused .v-label) {
  color: #ef4444 !important;
}

:deep(input) {
  color: #e5e5e5 !important;
}
</style>
