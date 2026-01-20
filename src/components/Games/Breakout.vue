<template>
  <canvas
    ref="canvas"
    class="border-4 border-[#2bb478] border-b-transparent"
  ></canvas>
</template>

<script>
import collision from "@/mixins/collision";
import collisionPaddleSong from "@/assets/songs/pongSound.wav";
import collisionBlockSong from "@/assets/songs/breakoutSound.wav";

export default {
  mixins: [collision],
  data() {
    return {
      canvas: null,
      canvasWidth: 500,
      canvasHeight: 500,
      ctx: null,

      playerWidth: 80,
      playerHeight: 10,
      playerVelocityX: 20,
      player: {},

      ballWidth: 10,
      ballHeight: 10,
      ballVelocityX: 5,
      ballVelocityY: 3,
      ball: {},

      blockArray: [],
      blockWidth: 70,
      blockHeight: 10,
      blockColumns: 6,
      blockRows: 2,
      blockMaxRows: 10,
      blockCount: 0,
      blockX: 15,
      blockY: 45,

      score: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;
    this.ctx = this.canvas.getContext("2d");
    this.player = {
      x: this.canvasWidth / 2 - this.playerWidth / 2,
      y: this.canvasHeight - this.playerHeight - 5,
      width: this.playerWidth,
      height: this.playerHeight,
      velocityX: this.playerVelocityX,
    };

    this.ball = {
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2 - 100,
      width: this.ballWidth,
      height: this.ballHeight,
      velocityX: this.ballVelocityX,
      velocityY: this.ballVelocityY,
    };

    this.createBlocks();
    requestAnimationFrame(this.update);

    document.addEventListener("keydown", this.movePlayer);
  },
  methods: {
    playSound(blockBreak) {
      let paddleSong = new Audio(collisionPaddleSong);
      let blockSong = new Audio(collisionBlockSong);
      if (blockBreak) {
        blockSong.play();
      } else {
        paddleSong.play();
      }
    },
    update() {
      requestAnimationFrame(this.update);
      if (this.score == 1200) {
        this.$emit("addScore", 8000);
        this.$emit("addCounter");
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "#2bb478";
      this.ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height,
      );

      this.ball.x += this.ball.velocityX;
      this.ball.y += this.ball.velocityY;
      this.ctx.shadowColor = "#eeeeee";
      this.ctx.shadowBlur = 18;
      this.ctx.fillStyle = "#ddd";
      this.ctx.strokeStyle = "#ddd";
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, 10, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;

      if (this.ball.y <= 0) {
        this.ball.velocityY *= -1;
      } else if (
        this.ball.x <= 0 ||
        this.ball.x + this.ball.width >= this.canvasWidth
      ) {
        this.ball.velocityX *= -1;
      } else if (this.ball.y + this.ball.height >= this.canvasHeight) {
        this.$emit("addScore", 3000);
        this.$emit("addCounter");
      }

      if (
        this.topCollision(this.ball, this.player) ||
        this.bottomCollision(this.ball, this.player)
      ) {
        this.ball.velocityY *= -1;
        this.playSound(false);
      } else if (
        this.leftCollision(this.ball, this.player) ||
        this.rightCollision(this.ball, this.player)
      ) {
        this.ball.velocityX *= -1;
        this.playSound(false);
      }
      for (let i = 0; i < this.blockArray.length; i++) {
        let block = this.blockArray[i];
        if (!block.break) {
          if (
            this.topCollision(this.ball, block) ||
            this.bottomCollision(this.ball, block)
          ) {
            block.break = true;
            this.ball.velocityY *= -1;
            this.blockCount -= 1;
            this.score += 100;
            this.playSound(true);
          } else if (
            this.leftCollision(this.ball, block) ||
            this.rightCollision(this.ball, block)
          ) {
            block.break = true;
            this.ball.velocityX *= -1;
            this.blockCount -= 1;
            this.score += 100;
            this.playSound(true);
          }
          let color = this.generateRandomColor();
          this.ctx.fillStyle = color;
          this.ctx.fillRect(block.x, block.y, block.width, block.height);
        }
      }
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText(this.score, 10, 25);
    },
    randomColor() {
      return Math.floor(Math.random() * 250);
    },
    generateRandomColor() {
      let red = this.randomColor();
      let green = this.randomColor();
      let blue = this.randomColor();

      return `rgb(${red},${green},${blue})`;
    },
    outOfBounds(xPosition) {
      return xPosition < 0 || xPosition + this.playerWidth > this.canvasWidth;
    },
    movePlayer(e) {
      if (e.code == "ArrowLeft") {
        let newPlayerX = this.player.x - this.player.velocityX;
        if (!this.outOfBounds(newPlayerX)) {
          this.player.x = newPlayerX;
        }
      } else if (e.code == "ArrowRight") {
        let newPlayerX = this.player.x + this.player.velocityX;
        if (!this.outOfBounds(newPlayerX)) {
          this.player.x = newPlayerX;
        }
      }
    },
    topCollision(ball, block) {
      return (
        this.detectCollision(ball, block) && ball.y + ball.height >= block.y
      );
    },
    bottomCollision(ball, block) {
      return (
        this.detectCollision(ball, block) && block.y + block.height >= ball.y
      );
    },
    leftCollision(ball, block) {
      return (
        this.detectCollision(ball, block) && ball.x + ball.width >= block.x
      );
    },
    rightCollision(ball, block) {
      return (
        this.detectCollision(ball, block) && block.x + block.width >= ball.x
      );
    },
    createBlocks() {
      this.blockArray = [];
      for (let c = 0; c < this.blockColumns; c++) {
        for (let r = 0; r < this.blockRows; r++) {
          let block = {
            x: this.blockX + c * this.blockWidth + c * 10,
            y: this.blockY + r * this.blockHeight + r * 10,
            width: this.blockWidth,
            height: this.blockHeight,
            breack: false,
          };
          this.blockArray.push(block);
        }
      }
      this.blockCount = this.blockArray.lenght;
    },
  },
};
</script>
