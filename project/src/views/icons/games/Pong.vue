<template>
  <div class="flex flex-col">
    <div class="flex justify-around text-3xl font-bold mb-5">
      <h1 ref="scorePlayer">0</h1>
      <h1 ref="scorePlayer2">0</h1>
    </div>
    <canvas ref="canvas" height="400" width="500"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,

      ball: null,
      paddle: null,
      paddle2: null,

      keysPressed: 0,
      KEY_UP: 38,
      KEY_DOWN: 40,

      scorePlayer: null,
      scorePlayer2: null,

      firstShow: true,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.scorePlayer = this.$refs.scorePlayer;
    this.scorePlayer2 = this.$refs.scorePlayer2;

    this.ball = new this.Ball(
      this.vec2(120, 120),
      this.vec2(4, 4),
      7,
      this.ctx
    );

    this.paddle = new this.Paddle(
      this.vec2(10, 160),
      this.vec2(10, 10),
      20,
      70,
      this.ctx,
      this.vec2
    );
    this.paddle2 = new this.Paddle(
      this.vec2(this.canvas.width - 29, 160),
      this.vec2(3, 3),
      20,
      70,
      this.ctx,
      this.vec2
    );

    this.gameLoop();
  },
  methods: {
    vec2(x, y) {
      return { x: x, y: y };
    },
    Ball: function (pos, velocity, radius, ctx) {
      this.pos = pos;
      this.velocity = velocity;
      this.radius = radius;
      this.ctx = ctx;

      this.update = function () {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
      };

      this.draw = function () {
        this.ctx.fillStyle = "#ffff33";
        this.ctx.strokeStyle = "#ffff33";
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      };
    },
    Paddle: function (pos, velocity, width, height, ctx, vec2) {
      this.pos = pos;
      this.velocity = velocity;
      this.width = width;
      this.height = height;
      this.ctx = ctx;
      this.vec2 = vec2;
      this.score = 0;

      this.update = function () {
        document.addEventListener("keydown", (e) => {
          if (e.keyCode == 38) {
            this.pos.y -= this.velocity.y / 350;
          }
        });

        document.addEventListener("keydown", (e) => {
          if (e.keyCode == 40) {
            this.pos.y += this.velocity.y / 350;
          }
        });
      };
      this.draw = function () {
        this.ctx.fillStyle = "#ffff33";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
      };

      this.getHalfWidth = function () {
        return this.width / 2;
      };

      this.getHalfHeight = function () {
        return this.height / 2;
      };

      this.getCenter = function () {
        return this.vec2(
          this.pos.x + this.getHalfWidth(),
          this.pos.y + this.getHalfHeight()
        );
      };
    },

    respawnBall(ball) {
      if (ball.velocity.x > 0) {
        ball.pos.x = this.canvas.width - 150;
        ball.pos.y = Math.random() * (this.canvas.height - 200);
      }

      if (ball.velocity.x < 0) {
        ball.pos.x = 150;
        ball.pos.y = Math.random() * (this.canvas.height - 200) + 100;
      }

      ball.velocity.x *= -1;
      ball.velocity.y *= -1;
    },

    increaseScore(ball, paddle, paddle2) {
      if (ball.pos.x <= -ball.radius) {
        paddle2.score += 1;
        this.scorePlayer2.innerHTML = paddle2.score;
        this.respawnBall(this.ball);
      }

      if (ball.pos.x >= this.canvas.width + ball.radius) {
        paddle.score += 1;
        this.scorePlayer.innerHTML = paddle.score;
        this.respawnBall(this.ball);
      }
    },

    paddleCollisionWithTheEdges(paddle) {
      if (paddle.pos.y <= 0) {
        paddle.pos.y = 0;
      }
      if (paddle.pos.y + paddle.height >= this.canvas.height) {
        paddle.pos.y = this.canvas.height - paddle.height;
      }
    },

    player2AI(ball, paddle) {
      if (ball.velocity.x > 0) {
        if (ball.pos.y > paddle.pos.y) {
          paddle.pos.y += paddle.velocity.y - 1;
          if (paddle.pos.y + paddle.height >= this.canvas.height) {
            paddle.pos.y = this.canvas.height - paddle.height;
          }
        }

        if (ball.pos.y < paddle.pos.y) {
          paddle.pos.y -= paddle.velocity.y;
          if (paddle.pos.y <= 0) {
            paddle.pos.y = 0;
          }
        }
      }
    },

    ballCollisionWithTheEdges(ball) {
      if (ball.pos.y + ball.radius >= this.canvas.height) {
        ball.velocity.y *= -1;
      }

      if (ball.pos.y - ball.radius <= 0) {
        ball.velocity.y *= -1;
      }
    },

    ballPaddleCollision(ball, paddle) {
      let dx = Math.abs(ball.pos.x - paddle.getCenter().x);
      let dy = Math.abs(ball.pos.y - paddle.getCenter().y);

      if (
        dx <= ball.radius + paddle.getHalfWidth() &&
        dy <= paddle.getHalfHeight() + ball.radius
      ) {
        ball.velocity.x *= -1;
      }
    },

    drawGameScene() {
      this.ctx.strokeStyle = "#ffff00";

      this.ctx.beginPath();
      this.ctx.lineWidth = 20;
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.lineWidth = 20;
      this.ctx.moveTo(0, this.canvas.height);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.lineWidth = 15;
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.lineWidth = 15;
      this.ctx.moveTo(this.canvas.width, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.lineWidth = 10;
      this.ctx.moveTo(this.canvas.width / 2, 0);
      this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        25,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
    },

    gameUpdate() {
      this.ball.update();
      this.paddle.update();
      this.paddleCollisionWithTheEdges(this.paddle);
      this.ballPaddleCollision(this.ball, this.paddle);
      this.ballPaddleCollision(this.ball, this.paddle2);
      this.ballCollisionWithTheEdges(this.ball);

      this.player2AI(this.ball, this.paddle2);
      this.increaseScore(this.ball, this.paddle, this.paddle2);
    },
    gameDraw() {
      this.ball.draw();
      this.paddle.draw();
      this.paddle2.draw();
      this.drawGameScene();
    },
    gameLoop() {
      this.ctx.fillStyle = "rgba(0,0,0,0.2)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      window.requestAnimationFrame(this.gameLoop);
      this.gameDraw();
      if (this.paddle.score == 3) {
        this.$emit("addCounter");
        this.$emit("addScore", 1000);
      } else if (this.paddle2.score == 3) {
        this.$emit("addCounter");
        this.$emit("addScore", 0);
      }
      if (this.firstShow) {
        setTimeout(() => {
          this.gameUpdate();
          this.firstShow = false;
        }, 1000);
      } else {
        this.gameUpdate();
      }
    },
  },
};
</script>
