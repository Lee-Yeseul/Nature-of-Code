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

  static random2D(): { x: number; y: number } {
    const angle = Math.random() * Math.PI * 2;
    return { x: Math.cos(angle), y: Math.sin(angle) };
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

  limit(max: number) {
    const magnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    console.log(magnitude);
    if (magnitude > max) {
      this.velocity.x = (this.velocity.x / magnitude) * max;
      this.velocity.y = (this.velocity.y / magnitude) * max;
    }
  }

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
    this.limit(10);
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

  motion101WithMouseControl(
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number
  ) {
    ctx.clearRect(0, 0, this.width, this.height);
    // 마우스 위치로의 방향 벡터 계산 (객체가 마우스를 향해 움직이는 방향을 결정)
    const direction = {
      x: mouseX - this.position.x,
      y: mouseY - this.position.y,
    };

    // 방향 벡터를 정규화(방향 벡터를 정규화하여 방향만 남김)
    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    if (magnitude > 0) {
      direction.x = direction.x / magnitude;
      direction.y = direction.y / magnitude;
    }

    // 정규화된 벡터에 스케일링 값을 곱해 가속도의 크기를 설정
    this.acceleration = { x: direction.x * 0.2, y: direction.y * 0.2 };

    this.add(this.velocity, this.acceleration);
    this.limit(10);
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

  animateWithMouseControl() {
    this.canvas.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      this.vector.motion101WithMouseControl(this.ctx, mouseX, mouseY);
    });
  }
}

// const app = new VectorApp("canvas");
// app.start(() => {
// app.animateWithMouseControl();
// });
