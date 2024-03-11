<script>
import validateForm from "@/mixins/validateForm.js";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/Modal.vue";
import Button from "@/views/icons/Button.vue";
import axios from "axios";
export default {
  mixins: [validateForm],
  components: {
    Modal,
    Button,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      C_password: "",
      showPassword: false,
      showIconPassword: false,

      toast: null,
      modal: false,
      textModal: "",

      pwdConfirm: [
        (v) => !!v || "Confirm password",
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },

  mounted() {
    this.toast = useToast();
  },
  methods: {
    showModal(type) {
      if (type == "") {
        this.textModal = "";
        this.modal = false;
        return;
      }

      this.modal = true;
      this.textModal = type;
    },
    reset() {
      this.$refs.form.reset();
    },
    async register() {
      if ((await this.verifyInputs) == false) {
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
      this.reset();
    },
  },
  computed: {
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
  },
};
</script>

<template>
  <div
    class="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center relative z-0"
    id="container"
  >
    <h1 class="text-5xl mb-20 max-[400px]:text-4xl">Registre-se</h1>
    <form
      ref="form"
      class="relative z-10 w-72 flex flex-col justify-center items-center gap-8"
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

      <Button type="submit" label="Registrar" />

      <span
        >Já tem uma conta?
        <router-link to="/login" class="text-[#40d292] hover:underline"
          >Entrar.</router-link
        >
      </span>
      <span class="text-sm text-center text-zinc-200"
        >Ao criar uma conta, você concorda com os
        <button
          @click="showModal('terms')"
          class="text-[#40d292] hover:underline"
        >
          Termos de Serviço
        </button>
        e
        <button
          @click="showModal('privacity')"
          class="text-[#40d292] hover:underline"
        >
          Políticas de Privacidade.
        </button>
      </span>
    </form>
    <template v-if="modal">
      <Modal :text="textModal" @closeModal="showModal('')" />
    </template>
  </div>
</template>
