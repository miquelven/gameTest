<template>
  <div
    class="w-full h-[calc(100vh-80px)] text-center flex flex-col justify-center"
  >
    <div class="m-auto w-96">
      <h2 class="text-5xl font-bold mb-10 max-sm:text-4xl">Redefinir Senha</h2>
      <form class="relative flex flex-col gap-10">
        <InputForm
          ref="newPassword"
          text="Senha"
          type="password"
          :warning="warningPassword"
        />

        <button
          @click.prevent="togglePassword"
          class="mt-2 mx-auto w-1/2 outline-none shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70 max-sm:w-28"
        >
          Salvar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import validateForm from "@/mixins/validateForm.js";
import InputForm from "./icons/InputForm.vue";
import { useToast } from "vue-toastification";

export default {
  mixins: [validateForm],
  components: { InputForm },
  data() {
    return {
      newPassword: "",
      warningPassword: "",

      toast: null,
    };
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    async togglePassword(e) {
      this.warningPassword = this.validatePassword(
        e.target.closest("form").getElementsByTagName("input")[0]
      );

      if (this.warningPassword) return;

      this.newPassword = this.$refs.newPassword["inputValue"];

      try {
        const path = window.location.pathname;

        const pathParts = path.split("/");

        const tokenIndex = pathParts.indexOf("resetpassword") + 1;

        const token =
          tokenIndex < pathParts.length ? pathParts[tokenIndex] : null;

        const res = await this.$axios.post("/togglepassword", {
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
          "Erro interno. Por favor, tente novamente mais tarde."
        );
      }
    },
  },
};
</script>
