export default {
  methods: {
    validatePassword(input) {
      if (input.value.length <= 5) {
        return "Senha deve ter pelo menos 6 caracteres";
      }

      const lowerCaseLetters = /[a-z]/g;
      if (!input.value.match(lowerCaseLetters)) {
        return "A senha deve conter letra minúscula";
      }

      const upperCaseLetters = /[A-Z]/g;
      if (!input.value.match(upperCaseLetters)) {
        return "A senha deve conter letra maiúscula";
      }

      const numbers = /[0-9]/g;
      if (!input.value.match(numbers)) {
        return "A senha deve conter números";
      }

      const symbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;
      if (!input.value.match(symbols)) {
        return "A senha deve conter pelo menos um símbolo";
      }

      return "";
    },

    validateConfirmPassword(inputConfirmPassword, inputPassword) {
      if (inputConfirmPassword.value !== inputPassword.value) {
        return "As senhas não são iguais. Tente novamente.";
      }

      return "";
    },

    validateEmail(input) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!input.value.match(validRegex)) {
        return "Email inválido!";
      }

      return "";
    },

    validateName(input) {
      if (input.value.length <= 3) {
        return "O nome deve conter pelo menos 4 caracteres";
      }

      return "";
    },
  },
};
