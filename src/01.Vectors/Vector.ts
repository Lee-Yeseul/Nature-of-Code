import CanvasApp from "../common/CanvasApp";

class Vector {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  radius: number;
  acceleration: { x: number; y: number };

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 2, y: 3 };
    this.acceleration = { x: -0.01, y: 0.01 };
    this.radius = 20;
  }

  add(vector1: { x: number; y: number }, vector2: { x: number; y: number }) {
    vector1.x += vector2.x;
    vector1.y += vector2.y;
  }

  sub(vector: Vector) {
    this.position.x -= vector.position.x;
    this.position.y -= vector.position.y;
  }

  mult(number: number) {
    this.position.x *= number;
    this.position.y *= number;
  }

  div(vector: Vector) {
    this.position.x /= vector.position.x;
    this.position.y /= vector.position.y;
  }

  magnitude() {
    return Math.sqrt(this.position.x ** 2 + this.position.y ** 2);
  }

  normalize() {
    const magnitude = this.magnitude();
    if (magnitude === 0) return;
    this.position.x /= magnitude;
    this.position.y /= magnitude;
  }

  //   limit(max: number) {
  //     const magnitude = this.magnitude();
  //     if (magnitude > max) {
  //       this.normalize();
  //       this.velocity.x = max;
  //       this.velocity.y = max;
  //     }
  //   }

  bouncingBall(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    // 위치 = 위치 + 속도
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // 벽에 부딪히면 속도 벡터 반전
    if (
      this.position.x + this.radius > this.width ||
      this.position.x - this.radius < 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.position.y + this.radius > this.height ||
      this.position.y - this.radius < 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.drawCircle(ctx);
  }

  motion101(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.add(this.velocity, this.acceleration);
    // this.limit(500);
    this.add(this.position, this.velocity);

    if (this.position.x > this.width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = this.width;
    }

    if (this.position.y > this.height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = this.height;
    }

    this.drawCircle(ctx);
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FEE227";
    ctx.fill();
  }
}

class VectorApp extends CanvasApp {
  vector: Vector;

  constructor(canvasId: string) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    super(canvasId, width, height);
    super(canvasId, width, height);
    this.vector = new Vector(this.width, this.height);
  }

  animate() {
    this.vector.motion101(this.ctx);
    // this.vector.bouncingBall(this.ctx);
  }
}

const app = new VectorApp("canvas");
app.start(() => {
  app.animate();
});
