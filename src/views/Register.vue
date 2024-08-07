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

      pwdConfirm: [
        (v) => !!v || "Confirme a senha",
        (v) => v === this.password || "As senhas não são iguais",
      ],
    };
  },

  mounted() {
    this.toast = useToast();
  },
  methods: {
    showModal(type) {
      this.isModalOpen = true;
      this.textModal = type;
    },

    async verifyInputs() {
      if (
        (await this.$refs.inputName.validate()).length == 0 &&
        (await this.$refs.inputEmail.validate()).length == 0 &&
        (await this.$refs.inputPassword.validate()).length == 0 &&
        (await this.$refs.inputCPassword.validate()).length == 0
      )
        return true;
      else return false;
    },
    async register() {
      this.loadingButton = true;
      if ((await this.verifyInputs()) == false) {
        this.toast.error("Preencha todos os campos!");
        return;
      }
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
      }
      this.loadingButton = false;
    },
  },
};
</script>

<template>
  <section
    class="w-full h-screen flex flex-col justify-center items-center relative z-0"
    id="container"
    data-aos="zoom-in"
  >
    <div
      class="p-10 flex justify-center items-center flex-col rounded-md max-sm:p-0"
      style="background-color: #171717"
    >
      <h4 class="text-4xl mt-20 mb-12 max-[400px]:text-3xl">Registre-se</h4>
      <form
        ref="form"
        class="relative z-10 w-72 flex flex-col justify-center items-center gap-6 max-sm:w-full"
        @submit.prevent="register"
      >
        <div class="w-full flex items-center relative">
          <v-text-field
            ref="inputName"
            autofocus
            v-model="userName"
            :rules="nameRules"
            label="nome"
          ></v-text-field>
        </div>
        <div class="w-full flex items-center relative">
          <v-text-field
            ref="inputEmail"
            label="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
        </div>
        <div class="w-full flex items-center relative">
          <v-text-field
            ref="inputPassword"
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

        <div class="w-full flex items-center relative">
          <v-text-field
            ref="inputCPassword"
            label="confirme sua senha"
            v-model="C_password"
            :type="showIconPassword ? 'text' : 'password'"
            :rules="pwdConfirm"
          >
            <div
              class="absolute right-0 top-0 py-5 px-3 hover:cursor-pointer"
              @click="() => (showIconPassword = !showIconPassword)"
            >
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="hover:cursor-pointer opacity-50"
                v-if="showIconPassword"
              />
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="hover:cursor-pointer"
                v-else
              />
            </div>
          </v-text-field>
        </div>

        <Button :loadingProp="loadingButton" type="submit" label="Registrar" />
      </form>

      <div class="flex flex-col justify-center items-center mt-10 gap-5">
        <span
          >Já tem uma conta?
          <router-link to="/login" class="hover:underline">
            <TextHighlight> Entrar. </TextHighlight>
          </router-link>
        </span>
        <div class="flex flex-col gap-1">
          <span> Ao criar uma conta, você concorda com os </span>
          <span class="text-sm text-center text-zinc-200">
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
