<template>
  <div
    id="outer-circle"
    class="bg-[#385a94] rounded-full h-[500px] w-[500px] relative border-solid border-2 m-auto mt-14 shadow-[´8_8_15_5_#888888]"
  >
    <div
      ref="topLeft"
      class="absolute w-[250px] h-[250px] rounded-tl-[250px] bg-[darkgreen] top-[50%] left-[50%] -mt-[250px] -ml-[250px] border-solid border-[5px]"
    ></div>
    <div
      ref="topRight"
      class="absolute w-[250px] h-[250px] rounded-tr-[250px] bg-[darkred] top-[50%] left-[50%] -mt-[250px] border-solid border-[5px]"
    ></div>
    <div
      ref="bottomLeft"
      class="absolute w-[250px] h-[250px] rounded-bl-[250px] bg-[goldenrod] top-[50%] left-[50%] -mr-[250px] -ml-[250px] border-solid border-[5px]"
    ></div>
    <div
      ref="bottomRight"
      class="absolute w-[250px] h-[250px] rounded-br-[250px] bg-[darkblue] top-[50%] left-[50%] -mb-[250px] border-solid border-[5px]"
    ></div>
    <div
      id="inner-circle"
      class="absolute bg-[grey] rounded-full h-[250px] w-[250px] border-solid border-[10px] top-[50%] left-[50%] -mt-[125px] -ml-[125px]"
    >
      <div
        id="switches"
        class="absolute ml-[50%] mt-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <button
          ref="startButton"
          class="rounded-full bg-[lightgray]/50 p-5 text-2xl font-bold"
        >
          Start
        </button>
        <span
          ref="counter"
          class="mt-10 text-2xl text-white/90 font-bold bg-[#444] px-5 border-4 border-white/50"
          >0</span
        >
      </div>
    </div>
  </div>
</template>

<script>
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
      startButton: null,
      counter: null,
    };
  },
  mounted() {
    this.topLeft = this.$refs.topLeft;
    this.topRight = this.$refs.topRight;
    this.bottomLeft = this.$refs.bottomLeft;
    this.bottomRight = this.$refs.bottomRight;
    this.startButton = this.$refs.startButton;
    this.counter = this.$refs.counter;

    this.startButton.addEventListener("click", () => {
      this.play();
    });

    this.topLeft.addEventListener("click", () => {
      if (this.on) {
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
    },
    two() {
      this.noise = true;
      this.topRight.style.backgroundColor = "tomato";
    },
    three() {
      this.noise = true;
      this.bottomLeft.style.backgroundColor = "yellow";
    },
    four() {
      this.noise = true;
      this.bottomRight.style.backgroundColor = "lightskyblue";
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

      if (this.playerOrder.length == 2 && this.good) this.winGame();

      // O JOGO ACABA
      if (!this.good) {
        this.counter.innerHTML = "Errado";
        this.flashColor();
        setTimeout(() => {
          this.$emit("addCounter");
          this.$emit("winner", false);
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
        this.$emit("addCounter");
        this.$emit("winner", true);
      }, 1000);
    },
  },
};
</script>
