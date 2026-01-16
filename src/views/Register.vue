<script>
import validateForm from "@/mixins/validateForm.js";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/index.vue";
import Button from "@/views/icons/Button.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import axios from "axios";
export default {
  mixins: [validateForm],
  components: {
    Modal,
    Button,
    TextHighlight,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      C_password: "",
      showPassword: false,
      showIconPassword: false,

      loadingButton: false,

      toast: null,
      isModalOpen: false,
      textModal: "",
      formValid: true,

      pwdConfirm: [
        (v) => !!v || "Confirme a senha",
        (v) => v === this.password || "As senhas não são iguais",
      ],
    };
  },

  mounted() {
    this.toast = useToast();
  },
  computed: {
    isRegisterPasswordInvalid() {
      return this.passwordRules.some((rule) => rule(this.password) !== true);
    },
    isConfirmPasswordInvalid() {
      return this.pwdConfirm.some((rule) => rule(this.C_password) !== true);
    },
  },
  methods: {
    showModal(type) {
      this.isModalOpen = true;
      this.textModal = type;
    },
    async register() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.toast.error("Preencha todos os campos corretamente!");
        return;
      }

      this.loadingButton = true;
      try {
        const response = await axios.post("/register", {
          username: this.userName,
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          const { name, token } = response.data;
          localStorage.setItem("token", token);

          localStorage.setItem("name", name);

          const user = {
            name: this.userName,
            email: this.email,
          };
          this.$store.commit("setUser", user);

          this.$router.push("/");
        } else {
          this.toast.error(response.data.error);
          console.log(response.data.error);
        }
      } catch (error) {
        this.toast.error("Não foi possível realizar o registro");
        console.log(error.message);
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
          <h4 class="text-3xl mb-2 text-white tracking-wider">REGISTRE-SE</h4>
          <p class="text-neutral-400 text-sm mt-1">
            Crie sua conta para começar a jogar
          </p>
        </div>

        <v-form
          ref="form"
          v-model="formValid"
          class="flex flex-col gap-5 w-full"
          @submit.prevent="register"
        >
          <v-text-field
            autofocus
            v-model="userName"
            :rules="nameRules"
            label="Nome de usuário"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
          ></v-text-field>

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
          >
            <template v-slot:append-inner>
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="cursor-pointer hover:text-green-400 transition-colors"
                :class="
                  password && isRegisterPasswordInvalid
                    ? 'text-red-500'
                    : 'text-green-500'
                "
                @click="() => (showPassword = !showPassword)"
              />
            </template>
          </v-text-field>

          <v-text-field
            label="Confirme sua senha"
            v-model="C_password"
            :type="showIconPassword ? 'text' : 'password'"
            :rules="pwdConfirm"
            variant="outlined"
            base-color="grey-darken-2"
            color="green-accent-3"
            density="comfortable"
            theme="dark"
          >
            <template v-slot:append-inner>
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="cursor-pointer hover:text-green-400 transition-colors"
                :class="
                  C_password && isConfirmPasswordInvalid
                    ? 'text-red-500'
                    : 'text-green-500'
                "
                @click="() => (showIconPassword = !showIconPassword)"
              />
            </template>
          </v-text-field>

          <div class="mt-2 w-full">
            <Button
              :loadingProp="loadingButton"
              type="submit"
              label="REGISTRAR"
              class="w-full font-bold tracking-widest"
            />
          </div>
        </v-form>

        <div class="flex flex-col justify-center items-center mt-8 gap-5">
          <span
            >Já tem uma conta?
            <router-link
              to="/login"
              class="hover:underline text-green-500 font-semibold hover:text-green-400 transition-colors"
            >
              <TextHighlight> Entrar </TextHighlight>
            </router-link>
          </span>
          <div class="flex flex-col gap-1 text-sm text-center text-zinc-200">
            <span> Ao criar uma conta, você concorda com os </span>
            <span>
              <button @click="showModal('terms')" class="hover:underline">
                <TextHighlight> Termos de Serviço </TextHighlight>
              </button>
              e
              <button @click="showModal('privacity')" class="hover:underline">
                <TextHighlight> Políticas de Privacidade. </TextHighlight>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="#modal">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
    >
      <Modal @closeModal="() => (isModalOpen = false)" :text="textModal" />
    </div>
  </Teleport>
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
</style>
