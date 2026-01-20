<script>
import Button from "./icons/Button.vue";
import validateForm from "@/mixins/validateForm.js";
import axios from "axios";
import logoImg from "@/assets/images/logo.webp";
import { useToast } from "vue-toastification";
import TextHighlight from "./icons/TextHighlight.vue";

export default {
  mixins: [validateForm],
  components: {
    TextHighlight,
    Button,
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      loadingButton: false,
      toast: null,
      logoImg: logoImg,
      formValid: true,
      hasInteracted: false,
      token: null,
    };
  },
  mounted() {
    this.toast = useToast();

    const params = this.$route.params.params;
    if (Array.isArray(params)) {
      this.token = params[0];
    } else {
      this.token = params;
    }

    if (!this.token) {
      const path = window.location.pathname;
      const pathParts = path.split("/");
      const tokenIndex = pathParts.indexOf("resetpassword") + 1;
      this.token = tokenIndex < pathParts.length ? pathParts[tokenIndex] : null;
    }

    if (!this.token) {
      this.toast.error("Token de recuperação inválido ou ausente.");
      setTimeout(() => this.$router.push("/login"), 3000);
    }
  },
  computed: {
    isPasswordInvalid() {
      return this.passwordRules.some((rule) => rule(this.newPassword) !== true);
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || "Confirmação de senha obrigatória.",
        (v) => v === this.newPassword || "As senhas não coincidem.",
      ];
    },
  },
  methods: {
    async submitReset() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.hasInteracted = true;
        this.toast.error("Por favor, corrija os erros no formulário.");
        return;
      }

      try {
        this.loadingButton = true;

        const res = await axios.post("/togglepassword", {
          token: this.token,
          password: this.newPassword,
        });

        if (res.status === 200 || res.data.success) {
          this.toast.success("Senha alterada com sucesso!");
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.toast.error(
            res.data.message || "Não foi possível alterar a senha.",
          );
        }
      } catch (error) {
        console.error("Erro durante a alteração da senha:", error);
        this.toast.error(
          "Erro interno. Por favor, tente novamente mais tarde.",
        );
      } finally {
        this.loadingButton = false;
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
      <!-- Decorative Borders & Glows -->
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
          <h2 class="text-2xl font-bold text-white tracking-wider text-center">
            REDEFINIR SENHA
          </h2>
          <p class="text-neutral-400 text-sm mt-1 text-center max-w-xs">
            Digite sua nova senha abaixo
          </p>
        </div>

        <v-form
          ref="form"
          v-model="formValid"
          @submit.prevent="submitReset"
          class="w-full flex flex-col gap-5"
        >
          <v-text-field
            label="Nova Senha"
            v-model="newPassword"
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
                  newPassword && isPasswordInvalid
                    ? 'text-red-500'
                    : 'text-green-500'
                "
                @click="showPassword = !showPassword"
              />
            </template>
          </v-text-field>

          <v-text-field
            label="Confirmar Senha"
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
            class="gamer-input"
          >
          </v-text-field>

          <div class="mt-2">
            <Button
              label="SALVAR NOVA SENHA"
              :loadingProp="loadingButton"
              type="submit"
              class="w-full font-bold tracking-widest"
            />
          </div>

          <div class="text-center mt-2">
            <router-link
              to="/login"
              class="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              Voltar para Login
            </router-link>
          </div>
        </v-form>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.v-label) {
  color: #a3a3a3 !important;
  opacity: 1 !important;
}

:deep(.v-field__outline__start),
:deep(.v-field__outline__end),
:deep(.v-field__outline__notch) {
  border-color: #404040 !important;
}

:deep(.v-field--focused .v-field__outline__start),
:deep(.v-field--focused .v-field__outline__end),
:deep(.v-field--focused .v-field__outline__notch) {
  border-color: #4ade80 !important; /* green-400 */
}

/* Custom error color overrides if needed */
:deep(.v-messages__message) {
  color: #ef4444 !important; /* red-500 */
}
</style>
