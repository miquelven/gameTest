<template>
  <canvas
    ref="canvas"
    width="400"
    height="400"
    class="border-double border-4 border-white rounded-md"
  ></canvas>
</template>

<script>
import playerImg from "@/assets/images/InvadersGame/player.webp";
import enemyImg from "@/assets/images/InvadersGame/enemy.webp";
export default {
  data() {
    return {
      canvas: null,
      canvasWidth: 400,
      canvasHeight: 400,
      ctx: null,

      tileSize: 25,
      rows: 16,
      columns: 16,

      playerWidth: 60,
      playerHeight: 30,
      playerX: 170,
      playerY: 350,
      player: {},
      playerImgEl: null,
      playerVelocityX: 32,

      enemyArray: [],
      enemyWidth: 60,
      enemyHeight: 30,
      enemyX: 40,
      enemyY: 40,
      enemyImgEl: null,

      enemyRows: 4,
      enemyColumns: 5,
      enemyCount: 0,
      enemyVelocityX: 2,

      bulletArray: [],
      bulletVelocityY: -10,

      score: 0,
      bool: false,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;
    this.ctx = this.canvas.getContext("2d");

    this.player = {
      x: this.playerX,
      y: this.playerY,
      width: this.playerWidth,
      height: this.playerHeight,
    };

    this.playerImgEl = new Image();
    this.playerImgEl.src = playerImg;
    this.enemyImgEl = new Image();
    this.enemyImgEl.src = enemyImg;
    this.createEnemies();

    requestAnimationFrame(this.update);
  },
  methods: {
    gameOver(collision) {
      if (this.bool) {
        if (collision) {
          this.$emit("addScore", 2000);
        } else {
          this.$emit("addScore", 4000);
        }
        this.$emit("addCounter");
      }
    },
    detectCollision(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    },
    shoot(e) {
      if (e.code == "Space") {
        let bullet = {
          x: this.player.x + (this.playerWidth * 15) / 32,
          y: this.player.y,
          width: this.tileSize / 8,
          height: this.tileSize / 2,
          used: false,
        };
        this.bulletArray.push(bullet);
      }
    },
    createEnemies() {
      for (let c = 0; c < this.enemyColumns; c++) {
        for (let r = 0; r < this.enemyRows; r++) {
          let enemy = {
            x: this.enemyX + c * this.enemyWidth,
            y: this.enemyY + r * this.enemyHeight,
            img: this.enemyImgEl,
            width: this.enemyWidth,
            height: this.enemyHeight,
            alive: true,
          };
          this.enemyArray.push(enemy);
        }
      }
      this.enemyCount = this.enemyArray.length;
    },
    update() {
      if (this.bool) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw player
      this.ctx.drawImage(
        this.playerImgEl,
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );

      // draw enemies
      for (let i = 0; i < this.enemyArray.length; i++) {
        let currentEnemy = this.enemyArray[i];
        if (currentEnemy.alive) {
          currentEnemy.x += this.enemyVelocityX;

          // detect wall
          if (
            currentEnemy.x + currentEnemy.width >= this.canvas.width ||
            currentEnemy.x <= 0
          ) {
            this.enemyVelocityX *= -1;
            currentEnemy.x += this.enemyVelocityX * 2;

            for (let a = 0; a < this.enemyArray.length; a++) {
              this.enemyArray[a].y += this.enemyHeight;
            }
          }

          //detect collision of enemy in player
          if (this.bool) return;
          for (let a = 0; a < this.enemyArray.length; a++) {
            let enemy = this.enemyArray[a];
            if (enemy.alive && this.detectCollision(this.player, enemy)) {
              if (this.bool) return;
              this.bool = true;
              this.gameOver(true);
            }
          }

          this.ctx.drawImage(
            currentEnemy.img,
            currentEnemy.x,
            currentEnemy.y,
            currentEnemy.width,
            currentEnemy.height
          );
        }
      }

      // draw bullets
      for (let i = 0; i < this.bulletArray.length; i++) {
        let bullet = this.bulletArray[i];
        bullet.y += this.bulletVelocityY;
        this.ctx.fillStyle = "#2bb478";
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // collision
        for (let a = 0; a < this.enemyArray.length; a++) {
          let enemy = this.enemyArray[a];
          if (
            !bullet.used &&
            enemy.alive &&
            this.detectCollision(bullet, enemy)
          ) {
            this.score += 100;
            bullet.used = true;
            enemy.alive = false;
            this.enemyCount--;
            if (this.enemyCount == 0) {
              this.bool = true;
              this.gameOver(false);
            }
          }
        }
      }

      // clear bullets
      while (
        this.bulletArray.length > 0 &&
        (this.bulletArray[0].used || this.bulletArray[0].y < 0)
      ) {
        this.bulletArray.shift();
      }

      // draw score
      this.ctx.fillStyle = "#ddd";
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText(this.score, this.canvas.width - 40, 30);

      document.addEventListener("keydown", this.moveplayer);
      document.addEventListener("keyup", this.shoot);

      requestAnimationFrame(this.update);
    },
    moveplayer(e) {
      if (e.code == "ArrowLeft" && this.player.x - this.playerVelocityX >= 0) {
        this.player.x -= this.playerVelocityX;
      } else if (
        e.code == "ArrowRight" &&
        this.player.x + this.playerVelocityX + this.playerWidth <=
          this.canvas.width
      ) {
        this.player.x += this.playerVelocityX;
      }
    },
  },
};
</script>
