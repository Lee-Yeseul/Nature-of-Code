export default class CanvasApp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(canvasId: string, width: number, height: number) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) throw new Error(`Canvas with id '${canvasId}' not found`);

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!this.ctx) throw new Error("Failed to get CanvasRenderingContext2D");

    this.width = width;
    this.height = height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  start(animationCallback: () => void) {
    const draw = () => {
      animationCallback();
      requestAnimationFrame(draw);
    };

    draw();
  }
}
