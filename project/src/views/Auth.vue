<script>
export default {
  data() {
    return {
      newPassword: "",
    };
  },
  methods: {
    async togglePassword() {
      const token = new URLSearchParams(window.location.search).get("token");

      const res = await fetch("http://localhost:3333/togglepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: this.newPassword,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      if (res.status == 200) {
        alert("Senha alterada!");
      }
    },
  },
};
</script>

<template>
  <input
    type="text"
    placeholder="toggle password"
    v-model="newPassword"
    class="text-black"
  />
  <button @click="togglePassword">Save</button>
</template>
