<template>
  <div
    class="w-full h-[calc(100vh-80px)] text-center flex flex-col justify-center pattern-grid"
  >
    <div class="m-auto w-80">
      <h3 class="text-4xl font-medium mb-20 max-sm:text-3xl">
        Redefinir Senha
      </h3>
      <form
        class="relative flex flex-col gap-10"
        @submit.prevent="togglePassword"
      >
        <div class="relative">
          <v-text-field
            ref="password"
            label="senha"
            v-model="newPassword"
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

        <Button label="Salvar" type="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import validateForm from "@/mixins/validateForm.js";
import { useToast } from "vue-toastification";
import axios from "axios";
import Button from "./icons/Button.vue";

export default {
  mixins: [validateForm],
  components: { Button },
  data() {
    return {
      newPassword: "",
      showPassword: false,

      toast: null,
    };
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    async togglePassword(e) {
      if ((await this.$refs.password.validate()).length == 0) {
        try {
          const path = window.location.pathname;

          const pathParts = path.split("/");

          const tokenIndex = pathParts.indexOf("resetpassword") + 1;

          const token =
            tokenIndex < pathParts.length ? pathParts[tokenIndex] : null;

          const res = await axios.post("/togglepassword", {
            token: token,
            password: this.newPassword,
          });

          const data = res.data;
          if (res.status === 200) {
            this.toast.success("Senha Alterada!");
            setTimeout(() => (window.location.href = "/login"), 1000);
          } else {
            this.toast.error("Senha não alterada");
          }
        } catch (error) {
          console.error("Erro durante a alteração da senha:", error);
          this.toast.error(
            "Erro interno. Por favor, tente novamente mais tarde.",
          );
        }
      }
    },
  },
};
</script>
