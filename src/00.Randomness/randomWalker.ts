import CanvasApp from "../common/CanvasApp";
import { gaussianRandomWithParams } from "../common/gaussianRandom";

class Walker {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
  }

  step() {
    const choice = Math.floor(Math.random() * 4);
    switch (choice) {
      case 0:
        this.x++;
        break;
      case 1:
        this.x--;
        break;
      case 2:
        this.y++;
        break;
      case 3:
        this.y--;
        break;
    }
    // viewport 벗어나지 않도록 제한
    this.x = Math.max(0, Math.min(this.width - 1, this.x));
    this.y = Math.max(0, Math.min(this.height - 1, this.y));
  }

  biasedStep() {
    const choice = Math.random();

    // 40%  x+, y+
    // 10%  x-, y-
    if (choice < 0.4) {
      this.x++;
    } else if (choice < 0.8) {
      this.y++;
    } else if (choice < 0.9) {
      this.x--;
    } else {
      this.y--;
    }

    this.x = Math.max(0, Math.min(this.width - 1, this.x));
    this.y = Math.max(0, Math.min(this.height - 1, this.y));
  }

  setMouseX() {
    document.addEventListener("mousemove", (event) => {
      this.x = event.clientX;
      // this.y = event.clientY;
    });
  }

  setMouseY() {
    document.addEventListener("mousemove", (event) => {
      // this.x = event.clientX;
      this.y = event.clientY;
    });
  }

  dynamicStep() {
    const random = Math.random();

    document.addEventListener("mousemove", (event) => {
      if (random < 0.5 && this.x < event.clientX) {
        return this.x++;
      }
      if (random < 0.5 && this.x > event.clientX) {
        return this.x--;
      }

      if (random < 1 && this.y < event.clientY) {
        return this.y++;
      }
      if (random < 1 && this.x > event.clientY) {
        return this.y--;
      }
    });
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(255, 192, 203, 0.2)"; // 핑크색, 50% 투명도
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}

class RandomWalkerApp extends CanvasApp {
  walker: Walker;

  constructor(canvasId: string) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    super(canvasId, width, height);
    super(canvasId, width, height);
    this.walker = new Walker(this.width, this.height);
  }

  animate() {
    this.walker.step();
    this.walker.show(this.ctx);
  }

  biasedAnimate() {
    this.walker.biasedStep();
    this.walker.show(this.ctx);
  }

  dynamicAnimate() {
    this.walker.dynamicStep();
    this.walker.step();
    this.walker.show(this.ctx);
  }

  gaussianAnimate() {
    let x = gaussianRandomWithParams(320, 60);
    this.walker.x = x;
    this.walker.show(this.ctx);
  }
}

// const app = new RandomWalkerApp("canvas");
// app.start(() => app.gaussianAnimate());
