<script>
import InputForm from "./icons/InputForm.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  },
  components: {
    InputForm,
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        return alert("Please fill an all fields");
      }
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      }).then((res) => res.json());

      if (res.success) {
        localStorage.setItem("token", res.token);

        this.$router.push("/");
      } else {
        alert(res.message);
      }
    },
    showIconPassword(e) {
      let passwordIconEl = e.target;

      let opacity = passwordIconEl.style.opacity;
      if (opacity == 0) opacity = "0.5";
      opacity = opacity == "0.5" ? "1" : "0.5";

      passwordIconEl.style.opacity = opacity;

      this.changeInputType(passwordIconEl);
    },
    changeInputType(element) {
      const input = element.parentElement.children[0];

      input.getAttribute("type") == "text"
        ? input.setAttribute("type", "password")
        : input.setAttribute("type", "text");
    },
  },
};
</script>

<template>
  <div
    id="container"
    class="w-screen h-screen flex flex-col justify-center items-center"
  >
    <div class="relative z-10 mb-28">
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/svgs/logo.svg" alt="" class="w-56 brightness-125" />

        <form action="" class="flex flex-col gap-4 w-full p-2">
          <InputForm
            type="email"
            text="Email"
            focus="true"
            @valueInput="(emailValue) => (email = emailValue)"
          />
          <div class="flex items-center relative">
            <InputForm
              type="password"
              text="Senha"
              focus="false"
              @valueInput="(passwordValue) => (password = passwordValue)"
            />
            <!-- Add Icons using String format -->
            <font-awesome-icon
              :icon="['fas', 'eye']"
              class="absolute opacity-60 right-0 cursor-pointer p-4"
              @click="showIconPassword"
            />
          </div>

          <input
            type="submit"
            value="Entrar"
            @click.prevent="login"
            class="mt-2 w-full shadow-lg shadow-black/40 border-2 border-gray-300/20 bg-black p-2 rounded-md hover:shadow-gray-200/20 text-white/80 hover:cursor-pointer hover:bg-black/70"
          />
        </form>
        <div class="flex flex-col justify-center items-center mt-6">
          <span>
            <a href="" class="text-gray-200/80 hover:underline"
              >Esqueceu sua senha?</a
            >
          </span>
          <span>
            <p class="text-gray-400/80 hover:underline">
              Não tem uma conta?
              <router-link to="/register">Crie uma conta.</router-link>
            </p>
          </span>
        </div>

        <!-- AREA DE LOGIN DE OUTRAS MANEIRAS -->
        <div class="w-full flex items-center mt-7">
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#FF3E30] w-9 h-9w-10 h-10 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'google']" class="w-5 h-5" />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#3b5998] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon
                :icon="['fab', 'facebook-f']"
                class="w-5 h-5"
              />
            </div>
          </div>
          <div
            class="flex-1 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100"
          >
            <div
              class="rounded-full bg-[#E1306C] w-9 h-9 flex items-center justify-center shadow-md hover:shadow-black"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" class="h-5 w-5" />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  background: url("@/assets/images/backgroundLogin.png");
  background-position: center;
  background-size: cover;
  position: relative;
}
#container::before {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
