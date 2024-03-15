<template>
  <div
    id="outer-circle"
    class="bg-[#385a94] rounded-full h-[500px] w-[500px] relative border-solid border-2 m-auto shadow-[´8_8_15_5_#888888] max-2xl:w-[400px] max-2xl:h-[400px]"
  >
    <div
      ref="topLeft"
      class="absolute w-[250px] h-[250px] rounded-tl-[250px] bg-[darkgreen] top-[50%] left-[50%] -mt-[250px] -ml-[250px] border-solid border-[5px] max-2xl:w-[200px] max-2xl:h-[200px] max-2xl:rounded-tl-[200px] max-2xl:-l-[200px] max-2xl:-mt-[200px] max-2xl:-ml-[200px]"
    ></div>
    <div
      ref="topRight"
      class="absolute w-[250px] h-[250px] rounded-tr-[250px] bg-[darkred] top-[50%] left-[50%] -mt-[250px] border-solid border-[5px] max-2xl:w-[200px] max-2xl:h-[200px] max-2xl:rounded-tr-[200px] max-2xl:-mt-[200px]"
    ></div>
    <div
      ref="bottomLeft"
      class="absolute w-[250px] h-[250px] rounded-bl-[250px] bg-[goldenrod] top-[50%] left-[50%] -mr-[250px] -ml-[250px] border-solid border-[5px] max-2xl:w-[200px] max-2xl:h-[200px] max-2xl:rounded-bl-[200px] max-2xl:-mr-[200px] max-2xl:-ml-[200px]"
    ></div>
    <div
      ref="bottomRight"
      class="absolute w-[250px] h-[250px] rounded-br-[250px] bg-[darkblue] top-[50%] left-[50%] -mb-[250px] border-solid border-[5px] max-2xl:w-[200px] max-2xl:h-[200px] max-2xl:rounded-br-[200px] max-2xl:-md-[200px]"
    ></div>
    <div
      id="inner-circle"
      class="absolute bg-[grey] rounded-full h-[250px] w-[250px] border-solid border-[10px] top-[50%] left-[50%] -mt-[125px] -ml-[125px] max-2xl:w-[200px] max-2xl:h-[200px] max-2xl:-mt-[100px] max-2xl:-ml-[100px]"
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
