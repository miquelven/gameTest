<script>
import MemoryItem from "@/components/MemoryItem.vue";
export default {
  components: {
    MemoryItem,
  },
  data() {
    return {
      squares: [],
      showBackground: false,
      firstColorSelected: 0,
      firstSquareClicked: null,
      moves: 0,
      correct: 0,

      show: true,
    };
  },
  mounted() {
    // montar a sequencia aleatoria
    const colors = ["orange", "red", "green", "purple", "pink", "blue"];
    for (let i = 0; i < 2; i++) {
      let controlSquareColor = [];
      const colorsLength = colors.length;
      for (let w = 0; w < colorsLength; w++) {
        let randomColor = 0;
        do {
          randomColor = Math.floor(Math.random() * colorsLength);
        } while (controlSquareColor.indexOf(colors[randomColor]) >= 0);

        controlSquareColor.push(colors[randomColor]);
        this.squares.push(colors[randomColor]);
      }
    }

    //mostrar 3s
    setTimeout(() => {
      this.show = false;
    }, 3000);
  },
  methods: {
    async clickedSquare(square) {
      if (this.show || this.moves == 2 || this.firstSquareClicked == square)
        return;
      // controle de squares virados para cima
      if (
        square.getAttribute("style") !== null &&
        square.getAttribute("style").length > 0
      )
        return;

      this.moves++;
      square.setAttribute(
        "style",
        `background: ${square.getAttribute("data-color")}`
      );
      // primeiro square clicado
      if (this.firstSquareClicked == null) {
        this.firstSquareClicked = square;
        this.firstColorSelected = square.getAttribute("data-color");
        return;
      }

      // cores diferentes
      if (this.firstColorSelected !== square.getAttribute("data-color")) {
        setTimeout(() => {
          this.firstSquareClicked.removeAttribute("style");
          square.removeAttribute("style");
          this.resetValues();
        }, 1000);
      } else {
        this.correct++;
        this.firstSquareClicked.setAttribute(
          "style",
          `background: ${this.firstColorSelected}; transform: scale(1.10)`
        );
        square.setAttribute(
          "style",
          `background: ${square.getAttribute(
            "data-color"
          )}; transform: scale(1.10)`
        );
        this.resetValues();
      }
    },
    resetValues() {
      this.firstSquareClicked = null;
      this.moves = 0;
      this.firstColorSelected = 0;
    },
  },
  watch: {
    correct(current, oldValue) {
      if (this.correct == 6) {
        setTimeout(() => this.$emit("addCounter"), 1000);
      }
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <div v-for="(square, index) in squares" :key="index" id="itemArea">
      <MemoryItem :color="square" @clickedSquare="clickedSquare" :show="show" />
    </div>
  </div>
</template>
