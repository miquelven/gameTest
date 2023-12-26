<script>
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default {
  components: {
    Login,
    Register,
  },
  mounted() {
    //cadastrar
    //MOSTRAR LOGIN
    // const url = new URL(window.location.href);
    // window.history.pushState({}, '', url.toString())
  },
  computed: {
    verifyRegister() {
      // return
      // verificação no banco de dados se o usuário já está cadastrado
    },
  },
};
</script>

<template>
  <!-- <template v-if="verifyRegister">
    <Login />
  </template> -->

  <!-- <Login /> -->
  <Register />

  <!-- <header>
    <router-link to="/about">About</router-link>
    <router-link to="/contact">Contact us</router-link>
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer></footer>

  <h1 class="text-red-400">Home page</h1> -->
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
