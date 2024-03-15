<template>
  <canvas ref="canvas" width="400" height="400" class="bg-white/10"></canvas>
</template>

<script>
import sound from "@/assets/songs/snakeSound.wav";
export default {
  data() {
    return {
      canvas: null,
      ctx: null,

      size: 20,
      snake: [],

      direction: "right",
      loop: 0,

      food: {
        x: 0,
        y: 0,
        color: "#2bb478",
      },

      score: 0,
      allowPlaysoundExecution: true,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.snake = [{ x: 40, y: 80 }];

    this.food.x = this.randomPosition();
    this.food.y = this.randomPosition();

    this.update();

    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp") {
        if (this.direction == "bottom") return;
        this.direction = "up";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowRight") {
        if (this.direction == "left") return;
        this.direction = "right";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowLeft") {
        if (this.direction == "right") return;
        this.direction = "left";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowDown") {
        if (this.direction == "up") return;
        this.direction = "bottom";
      }
    });
  },
  methods: {
    checkWin() {
      if (this.score == 2400) {
        this.$emit("addScore", 8000);
        this.$emit("addCounter");
      }
    },
    playSound() {
      if (!this.allowPlaysoundExecution) return;
      const audio = new Audio(sound);
      audio.play();
    },
    checkCollision() {
      const head = this.snake[this.snake.length - 1];
      const canvasLimit = this.canvas.width - this.size;
      const neckIndex = this.snake.length - 2;

      const wallCollision =
        head.x < 0 ||
        head.x > canvasLimit ||
        head.y < 0 ||
        head.y > canvasLimit;

      const selfCollision = this.snake.find((pos, index) => {
        return index < neckIndex && pos.x == head.x && pos.y == head.y;
      });

      if (wallCollision || selfCollision) {
        this.$emit("addScore", 4500);
        this.$emit("addCounter");
      }
    },
    checkEat() {
      const head = this.snake[this.snake.length - 1];

      if (head.x == this.food.x && head.y == this.food.y) {
        this.playSound();
        this.snake.push(head);
        this.score += 100;

        this.checkWin();

        let x = this.randomPosition();
        let y = this.randomPosition();

        while (this.snake.find((pos) => pos.x == x && pos.y == y)) {
          x = this.randomPosition();
          y = this.randomPosition();
        }

        this.food.x = x;
        this.food.y = y;
      }
    },
    randomNumber(max, min) {
      return Math.round(Math.random() * (max - min) + min);
    },
    randomPosition() {
      const number = this.randomNumber(0, this.canvas.width - this.size);
      return Math.round(number / 20) * 20;
    },
    drawScore() {
      this.ctx.font = "30px sans-serif";
      this.ctx.fillStyle = "rgba(255,255,255,.2)";
      this.ctx.fillText(`Score: ${this.score}`, 0, 30);
    },
    drawSnake() {
      this.ctx.fillStyle = "#bbb";
      this.snake.forEach((pos, index) => {
        if (index == this.snake.length - 1) {
          this.ctx.fillStyle = "#fff";
        }

        this.ctx.fillRect(pos.x, pos.y, this.size, this.size);
        this.ctx.shadowBlur = 0;
      });
    },
    drawFood() {
      const { x, y, color } = this.food;

      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 24;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, this.size, this.size);
      this.ctx.shadowBlur = 0;
    },
    drawGrid() {
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#222";

      for (let i = 20; i < this.canvas.width; i += 20) {
        this.ctx.beginPath();
        this.ctx.lineTo(i, 0);
        this.ctx.lineTo(i, 400);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineTo(0, i);
        this.ctx.lineTo(400, i);
        this.ctx.stroke();
      }
    },
    moveSnake() {
      if (!this.direction) return;
      const head = this.snake[this.snake.length - 1];

      if (this.direction == "right")
        this.snake.push({ x: head.x + this.size, y: head.y });
      if (this.direction == "left")
        this.snake.push({ x: head.x - this.size, y: head.y });
      if (this.direction == "bottom")
        this.snake.push({ x: head.x, y: head.y + this.size });
      if (this.direction == "up")
        this.snake.push({ x: head.x, y: head.y - this.size });

      this.snake.shift();
    },
    update() {
      clearInterval(this.loop);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      this.drawScore();
      this.drawFood();
      this.moveSnake();
      this.drawSnake();
      this.checkEat();
      this.checkCollision();

      this.loop = setTimeout(() => this.update(), 125);
    },
  },
  unmounted() {
    this.loop = 0;
    this.allowPlaysoundExecution = false;
  },
};
</script>
