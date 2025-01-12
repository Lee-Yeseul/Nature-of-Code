import CanvasApp from "../common/CanvasApp";

class BouncingBall {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 2;
    this.ySpeed = 3;
  }

  bouncingBall(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.x = this.x + this.xSpeed; // dt = v * dt
    this.y = this.y + this.ySpeed;

    if (this.x > this.width || this.x < 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y > this.height || this.y < 0) {
      this.ySpeed = -this.ySpeed;
    }
    this.drawCircle(ctx);
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2); // x, y, r, 시작각, 끝각
    ctx.fillStyle = "pink";
    ctx.fill();
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "pink";
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}

class BouncingBallApp extends CanvasApp {
  vector: BouncingBall;

  constructor(canvasId: string) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    super(canvasId, width, height);
    super(canvasId, width, height);
    this.vector = new BouncingBall(this.width, this.height);
  }

  animate() {
    this.vector.bouncingBall(this.ctx);
  }
}

const app = new BouncingBallApp("canvas");
app.start(() => {
  // app.animate();
});
