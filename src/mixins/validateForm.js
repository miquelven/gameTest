export default {
  data() {
    return {
      nameRules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 10 || "Max 10 characters",
      ],
      emailRules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
      passwordRules: [
        (value) => !!value || "Senha obrigatória.",
        (value) =>
          (value || "").length >= 8 ||
          "A senha deve ter pelo menos 8 caracteres.",
        (value) =>
          /[a-z]/.test(value) ||
          "A senha deve conter pelo menos uma letra minúscula.",
        (value) =>
          /[A-Z]/.test(value) ||
          "A senha deve conter pelo menos uma letra maiúscula.",
        (value) =>
          /\d/.test(value) || "A senha deve conter pelo menos um número.",
        (value) =>
          /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(value) ||
          "A senha deve conter pelo menos um caractere especial.",
      ],
    };
  },
};
