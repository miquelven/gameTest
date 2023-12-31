<!-- <script>
export default {
  data() {
    return {
      newPassword: "",
    };
  },
  methods: {
    async togglePassword() {
      const token = new URLSearchParams(window.location.search).get("token");

      const res = await fetch("http://localhost:3333/toggle-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: this.newPassword,
        }),
      }).then((res) => res.json());
    },
  },
};
</script>

<template>
  <input type="text" placeholder="toggle password" v-model="newPassword" />
  {{ newPassword }}
  <button @click="togglePassword">Save</button>
</template> -->
