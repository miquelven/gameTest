<template>
  <div>
    <h2>Redefinir Senha</h2>
    <label for="newPassword">Nova Senha:</label>
    <input
      type="password"
      id="newPassword"
      v-model="newPassword"
      class="text-black"
    />
    <button @click="togglePassword">Salvar Senha</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
    };
  },
  methods: {
    async togglePassword() {
      try {
        // const token = new URLSearchParams(window.location.search).get("token");

        const path = window.location.pathname;

        // Divida o caminho em partes usando '/'
        const pathParts = path.split("/");

        // Encontre a parte que segue "resetpassword/"
        const tokenIndex = pathParts.indexOf("resetpassword") + 1;

        // Verifique se há um token presente
        const token =
          tokenIndex < pathParts.length ? pathParts[tokenIndex] : null;

        // Agora, 'token' conterá o valor do token ou será nulo se não for encontrado
        console.log("Token:", token);

        console.log(token);
        const res = await fetch("http://localhost:3000/togglepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            password: this.newPassword,
          }),
        });

        const data = await res.json();

        if (res.status === 200) {
          alert("Senha alterada com sucesso!");
          // Redirecionar para a página de login ou qualquer outra página desejada
          window.location.href = "/login";
        } else {
          alert("Erro ao alterar a senha. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error("Erro durante a alteração da senha:", error);
        alert("Erro interno. Por favor, tente novamente mais tarde.");
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
