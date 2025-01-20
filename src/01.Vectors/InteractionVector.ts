import CanvasApp from "../common/CanvasApp";

class Vector {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector): void {
    this.x += v.x;
    this.y += v.y;
  }

  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  limit(max: number): void {
    const mag = this.mag();
    if (mag > max) {
      this.normalize();
      this.mult(max);
    }
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): void {
    const mag = this.mag();
    if (mag > 0) {
      this.div(mag);
    }
  }

  mult(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  div(scalar: number): void {
    if (scalar !== 0) {
      this.x /= scalar;
      this.y /= scalar;
    }
  }
}

class InteractionVector {
  position: Vector;
  topspeed: number;
  randomVelocity: Vector;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.position = new Vector(canvasWidth / 2, canvasHeight / 2);
    this.topspeed = 5;

    // 랜덤 움직임 초기화
    this.randomVelocity = new Vector(
      Math.random() * 2 - 1, // -1 ~ 1
      Math.random() * 2 - 1 // -1 ~ 1
    );
  }

  update(mouseX: number, mouseY: number, mouseActive: boolean): void {
    if (mouseActive) {
      // 마우스가 움직이고 있는 경우
      const mouse = new Vector(mouseX, mouseY);
      let dir = Vector.sub(mouse, this.position);
      dir.limit(this.topspeed);
      this.position.add(dir);
    } else {
      // 마우스가 움직이지 않을 경우
      this.position.add(this.randomVelocity);

      // 랜덤 속도 제한
      this.randomVelocity.limit(this.topspeed);

      // 캔버스 경계를 넘지 않도록 처리
      if (this.position.x < 0 || this.position.x > 800) {
        this.randomVelocity.x *= -1;
      }
      if (this.position.y < 0 || this.position.y > 600) {
        this.randomVelocity.y *= -1;
      }
    }
  }

  show(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, 800, 600);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

const app = new CanvasApp("canvas", 800, 600);
const mover = new InteractionVector(app.width, app.height);

let mouseX = 0;
let mouseY = 0;
let lastMouseMoveTime = Date.now();
const MOUSE_IDLE_TIME = 100; // 1초 동안 움직이지 않으면 랜덤 움직임 시작

app.canvas.addEventListener("mousemove", (event: MouseEvent) => {
  const rect = app.canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  lastMouseMoveTime = Date.now(); // 마지막 마우스 움직임 시간 업데이트
});

app.start(() => {
  const currentTime = Date.now();
  const mouseActive = currentTime - lastMouseMoveTime < MOUSE_IDLE_TIME;

  mover.update(mouseX, mouseY, mouseActive);
  mover.show(app.ctx);
});
