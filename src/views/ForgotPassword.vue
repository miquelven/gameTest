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
      email: "",
      loadingButton: false,
      toast: null,
      logoImg: logoImg,
      formValid: true,
      hasInteracted: false,
    };
  },
  mounted() {
    this.toast = useToast();
  },
  components: {
    TextHighlight,
    Button,
  },
  methods: {
    async resetPassword() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.hasInteracted = true;
        this.toast.error("Por favor, corrija os erros no formulário.");
        return;
      }

      try {
        this.loadingButton = true;
        const response = await axios.post("/reset-password", {
          email: this.email,
        });

        if (response.data.success) {
          this.toast.success("Email de recuperação enviado com sucesso!");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } else {
          this.toast.error(
            response.data.message || "Não foi possível enviar o email.",
          );
        }
      } catch (error) {
        console.error("Erro na recuperação de senha:", error);
        this.toast.error("Erro ao tentar recuperar a senha. Tente novamente.");
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
            RECUPERAR SENHA
          </h2>
          <p class="text-neutral-400 text-sm mt-1 text-center max-w-xs">
            Digite seu email para receber um link de redefinição
          </p>
        </div>

        <v-form
          ref="form"
          v-model="formValid"
          class="flex flex-col gap-5 w-full"
          @submit.prevent="resetPassword"
        >
          <v-text-field
            label="Email cadastrado"
            v-model="email"
            :rules="emailRules"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
            class="gamer-input"
            placeholder="exemplo@email.com"
          >
          </v-text-field>

          <div class="mt-2">
            <Button
              :loadingProp="loadingButton"
              type="submit"
              label="ENVIAR LINK"
              class="w-full font-bold tracking-widest"
            />
          </div>
        </v-form>

        <div class="flex flex-col justify-center items-center mt-8 gap-3">
          <router-link
            to="/login"
            class="text-sm text-neutral-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Voltar para o login
          </router-link>
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
</style>
