<script>
import TicTacToeItem from "../Items/TicTacToeItem.vue";
import machineMove from "@/helpers/machineMove.js";
export default {
  components: {
    TicTacToeItem,
  },
  data() {
    return {
      player: "O",
      square: ["", "", "", "", "", "", "", "", ""],
      winner: false,
      gameTied: false,
      movesMachine: 0,
    };
  },
  methods: {
    setPlayer(e) {
      if (this.winner || e.target.innerHTML !== "" || this.gameTied) return;
      this.square[e.target.getAttribute("data-pos")] = this.player;
      e.target.innerHTML = this.player;

      this.verifyWinner();
      this.turnMachine();
    },
    verifyWinner() {
      this.gameTied = this.verifyGameTied();
      if (this.gameTied) return;
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        if (
          this.square[lines[i][0]] == this.player &&
          this.square[lines[i][1]] == this.player &&
          this.square[lines[i][2]] == this.player
        ) {
          this.winner = true;
          this.player == "O"
            ? this.$emit("addScore", 2000)
            : this.$emit("tictactoe", 0);
          return;
        }
      }
      this.player = this.player == "X" ? "O" : "X";
    },
    turnMachine() {
      if (this.winner || this.gameTied) return;
      let pos = 0;
      if (this.movesMachine !== 1) {
        do {
          pos = Math.floor(Math.random() * 9);
        } while (this.square[pos] !== "");
      } else {
        pos = machineMove(this.square);
      }
      setTimeout(() => {
        this.square[pos] = this.player;
        this.$refs.Squares.children[pos].innerHTML = this.player;
        this.verifyWinner();
        this.movesMachine++;
      }, 300);
    },
    verifyGameTied() {
      return this.square.every((squareValue) => squareValue !== "");
    },
  },
  watch: {
    winner(current, oldValue) {
      this.$emit("addCounter");
    },
    gameTied(current, oldValue) {
      this.$emit("addCounter");
    },
  },
};
</script>

<template>
  <div ref="Squares" class="grid grid-cols-3 max-[790px]:scale-75">
    <TicTacToeItem
      class="border-l-transparent border-t-transparent"
      data-pos="0"
      @click="setPlayer"
    />
    <TicTacToeItem
      @click="setPlayer"
      data-pos="1"
      class="border-t-transparent"
    />
    <TicTacToeItem
      data-pos="2"
      @click="setPlayer"
      class="border-r-transparent border-t-transparent"
    />
    <TicTacToeItem
      data-pos="3"
      @click="setPlayer"
      class="border-l-transparent"
    />
    <TicTacToeItem data-pos="4" @click="setPlayer" />
    <TicTacToeItem
      data-pos="5"
      @click="setPlayer"
      class="border-r-transparent"
    />
    <TicTacToeItem
      data-pos="6"
      @click="setPlayer"
      class="border-l-transparent border-b-transparent"
    />
    <TicTacToeItem
      data-pos="7"
      @click="setPlayer"
      class="border-b-transparent"
    />
    <TicTacToeItem
      data-pos="8"
      @click="setPlayer"
      class="border-r-transparent border-b-transparent"
    />
  </div>
</template>
