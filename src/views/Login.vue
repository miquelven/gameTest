<script>
import Button from "./icons/Button.vue";
import validateForm from "@/mixins/validateForm.js";
import axios from "axios";
import logoImg from "@/assets/images/logo.webp";
import { useToast } from "vue-toastification";
import TextHighlight from "./icons/TextHighlight.vue";
import { googleTokenLogin, decodeCredential } from "vue3-google-login";

export default {
  mixins: [validateForm],
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loadingButton: false,
      toast: null,
      logoImg: logoImg,
      formValid: true,
      hasInteracted: false,
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

          const userName =
            response.data.username ||
            response.data.name ||
            response.data.user?.name ||
            this.email.split("@")[0];

          const user = {
            name: userName,
            email: this.email,
          };
          this.$store.commit("setUser", user);

          localStorage.setItem("name", userName);
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
    async handleGoogleLogin(response) {
      if (response.credential) {
        try {
          const userData = decodeCredential(response.credential);

          const res = await axios.post("/login/google", {
            token: response.credential,
          });

          if (res.data.success) {
            localStorage.setItem("token", res.data.token);

            const userName =
              userData.name ||
              res.data.username ||
              res.data.name ||
              res.data.user?.name ||
              "Google User";

            // Prioriza o email do token do Google, pois é a fonte da verdade neste contexto
            const userEmail =
              userData.email || res.data.email || res.data.user?.email;

            if (!userEmail) {
              console.error(
                "Email não encontrado nos dados do Google ou do Backend",
              );
              this.toast.error(
                "Erro: Não foi possível obter seu email do Google.",
              );
              return;
            }

            const user = {
              name: userName,
              email: userEmail,
            };
            this.$store.commit("setUser", user);

            localStorage.setItem("name", userName);
            this.toast.success(`Bem-vindo, ${userName}!`);
            this.$router.push("/");
          } else {
            this.toast.error("Erro ao logar com Google.");
          }
        } catch (error) {
          console.error("Erro no login Google:", error);
          this.toast.error("Falha ao autenticar com Google.");
        }
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
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-900 to-transparent opacity-30"
      ></div>

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
          </v-text-field>

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

          <div class="mt-4 flex flex-col items-center w-full">
            <div class="flex items-center w-full mb-4">
              <div class="flex-grow h-px bg-neutral-700"></div>
              <span class="px-3 text-neutral-500 text-sm font-medium">OU</span>
              <div class="flex-grow h-px bg-neutral-700"></div>
            </div>

            <GoogleLogin :callback="handleGoogleLogin" />
          </div>
        </v-form>

        <div class="flex flex-col justify-center items-center mt-8 gap-3">
          <router-link
            to="/forgot-password"
            class="text-sm text-neutral-400 hover:text-green-400 transition-colors duration-200"
          >
            Esqueceu sua senha?
          </router-link>

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

.google-btn {
  transition: all 0.3s ease;
}

.google-btn:hover {
  background-color: #db4437 !important;
  color: white !important;
  border-color: #db4437 !important;
}
</style>
