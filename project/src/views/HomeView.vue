<script>
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default {
  components: {
    Login,
    Register,
  },
  methods: {
    async logout() {
      const res = await fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_token: localStorage.getItem("token"),
        }),
      }).then((res) => res.json());

      if (res.success) {
        console.log("success");
        localStorage.removeItem("token");
        this.$router.push("/login");
      } else {
        console.log("err");
        if (res.message == "Session could not be found.") {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<template>
  <h1>Home Page</h1>
  <button @click="logout">Logout</button>
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
