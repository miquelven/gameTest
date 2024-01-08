<script>
import MemoryItem from "@/components/MemoryItem.vue";
import { faThemeisle } from "@fortawesome/free-brands-svg-icons";
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
  },
  methods: {
    async clickedSquare(square) {
      // controle de squares virados para cima
      if (
        this.moves == 2 ||
        square.getAttribute("style") !== null ||
        this.firstSquareClicked == square
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
          `background: ${this.firstColorSelected}; transform: scale(1.15)`
        );
        square.setAttribute(
          "style",
          `background: ${square.getAttribute(
            "data-color"
          )}; transform: scale(1.15)`
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
      if (this.correct == 6) this.$emit("addCounter");
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <div v-for="(square, index) in squares" :key="index">
      <MemoryItem :color="square" @clickedSquare="clickedSquare" />
    </div>
  </div>
</template>
