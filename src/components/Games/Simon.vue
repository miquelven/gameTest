<template>
  <div
    id="outer-circle"
    class="bg-[#385a94] rounded-full h-[400px] w-[400px] relative border-solid border-2 m-auto shadow-[8px_8px_15px_5px_#888888]"
  >
    <div
      ref="topLeft"
      class="absolute w-[200px] h-[200px] rounded-tl-[200px] bg-[darkgreen] top-[50%] left-[50%] -mt-[200px] -ml-[200px] border-solid border-[5px]"
    ></div>
    <div
      ref="topRight"
      class="absolute w-[200px] h-[200px] rounded-tr-[200px] bg-[darkred] top-[50%] left-[50%] -mt-[200px] border-solid border-[5px]"
    ></div>
    <div
      ref="bottomLeft"
      class="absolute w-[200px] h-[200px] rounded-bl-[200px] bg-[goldenrod] top-[50%] left-[50%] -mr-[20px] -ml-[200px] border-solid border-[5px]"
    ></div>
    <div
      ref="bottomRight"
      class="absolute w-[200px] h-[200px] rounded-br-[200px] bg-[darkblue] top-[50%] left-[50%] -mb-[200px] border-solid border-[5px]"
    ></div>
    <div
      id="inner-circle"
      class="absolute h-[75px] w-[75px] top-[50%] left-[50%] -mt-[37.5px] -ml-[37.5px]"
    >
      <div
        id="switches"
        class="absolute ml-[50%] mt-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span
          ref="counter"
          class="text-2xl text-white/90 font-medium bg-[#111] px-7 border-4 border-white/80"
          >0</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import sound1 from "@/assets/songs/simonSound1.wav";
import sound2 from "@/assets/songs/simonSound2.wav";
import sound3 from "@/assets/songs/simonSound3.wav";
import sound4 from "@/assets/songs/simonSound4.wav";

export default {
  data() {
    return {
      order: [],
      playerOrder: [],
      flash: null,
      turn: 0,
      good: null,
      compTurn: false,
      intervalId: 0,
      strict: false,
      noise: false,
      on: false,
      win: null,

      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null,
      counter: null,

      allowPlaysoundExecution: true,
    };
  },
  mounted() {
    this.topLeft = this.$refs.topLeft;
    this.topRight = this.$refs.topRight;
    this.bottomLeft = this.$refs.bottomLeft;
    this.bottomRight = this.$refs.bottomRight;
    this.counter = this.$refs.counter;

    this.play();

    this.topLeft.addEventListener("click", () => {
      if (this.on) {
        this.playSound(1);
        this.playerOrder.push(1);

        this.check();
        this.one();
        if (!this.win) {
          setTimeout(() => {
            this.clearColor();
          }, 300);
        }
      }
    });
    this.topRight.addEventListener("click", () => {
      if (this.on) {
        this.playSound(2);
        this.playerOrder.push(2);
        this.check();
        this.two();
        if (!this.win) {
          setTimeout(() => {
            this.clearColor();
          }, 300);
        }
      }
    });
    this.bottomLeft.addEventListener("click", () => {
      if (this.on) {
        this.playSound(3);
        this.playerOrder.push(3);
        this.check();
        this.three();
        if (!this.win) {
          setTimeout(() => {
            this.clearColor();
          }, 300);
        }
      }
    });
    this.bottomRight.addEventListener("click", () => {
      if (this.on) {
        this.playSound(4);
        this.playerOrder.push(4);
        this.check();
        this.four();
        if (!this.win) {
          setTimeout(() => {
            this.clearColor();
          }, 300);
        }
      }
    });
  },
  methods: {
    playSound(numberSound) {
      if (!this.allowPlaysoundExecution) return;
      let audio1 = new Audio(sound1);
      let audio2 = new Audio(sound2);
      let audio3 = new Audio(sound3);
      let audio4 = new Audio(sound4);
      switch (numberSound) {
        case 1:
          audio1.play();
          break;
        case 2:
          audio2.play();
          break;
        case 3:
          audio3.play();
          break;
        case 4:
          audio4.play();

          break;
      }
    },
    play() {
      this.win = false;
      this.order = [];
      this.playerOrder = [];
      this.flash = 0;
      this.intervalId = 0;
      this.turn = 1;
      this.counter.innerHTML = 1;

      this.good = true;
      for (let i = 0; i < 20; i++) {
        this.order.push(Math.floor(Math.random() * 4) + 1);
      }
      this.compTurn = true;

      this.intervalId = setInterval(this.gameTurn, 800);
    },
    gameTurn() {
      this.on = false;

      if (this.flash == this.turn) {
        clearInterval(this.intervalId);
        this.compTurn = false;
        this.clearColor();
        this.on = true;
      }

      if (this.compTurn) {
        this.clearColor();
        setTimeout(() => {
          if (this.order[this.flash] == 1) this.one();
          if (this.order[this.flash] == 2) this.two();
          if (this.order[this.flash] == 3) this.three();
          if (this.order[this.flash] == 4) this.four();
          this.flash++;
        }, 200);
      }
    },
    one() {
      this.noise = true;
      this.topLeft.style.backgroundColor = "lightgreen";
      this.playSound(1);
    },
    two() {
      this.noise = true;
      this.topRight.style.backgroundColor = "tomato";
      this.playSound(2);
    },
    three() {
      this.noise = true;
      this.bottomLeft.style.backgroundColor = "yellow";
      this.playSound(3);
    },
    four() {
      this.noise = true;
      this.bottomRight.style.backgroundColor = "lightskyblue";
      this.playSound(4);
    },
    clearColor() {
      this.topLeft.style.backgroundColor = "darkgreen";
      this.topRight.style.backgroundColor = "darkred";
      this.bottomLeft.style.backgroundColor = "goldenrod";
      this.bottomRight.style.backgroundColor = "darkblue";
    },
    flashColor() {
      this.topLeft.style.backgroundColor = "lightgreen";
      this.topRight.style.backgroundColor = "tomato";
      this.bottomLeft.style.backgroundColor = "yellow";
      this.bottomRight.style.backgroundColor = "lightskyblue";
    },
    check() {
      if (
        this.playerOrder[this.playerOrder.length - 1] !==
        this.order[this.playerOrder.length - 1]
      )
        this.good = false;

      if (this.playerOrder.length == 7 && this.good) this.winGame();

      // O JOGO ACABA
      if (!this.good) {
        this.counter.innerHTML = "Errado";
        this.flashColor();
        setTimeout(() => {
          this.$emit("addScore", 3000);
          this.$emit("addCounter");
        }, 1000);
      }

      if (this.turn == this.playerOrder.length && this.good && !this.win) {
        this.turn++;
        this.playerOrder = [];
        this.compTurn = true;
        this.flash = 0;
        this.counter.innerHTML = this.turn;

        this.intervalId = setInterval(this.gameTurn, 800);
      }
    },
    winGame() {
      this.flashColor();
      setTimeout(() => {
        this.$emit("addScore", 7000);
        this.$emit("addCounter");
      }, 1000);
    },
  },
  unmounted() {
    this.allowPlaysoundExecution = false;
  },
};
</script>
