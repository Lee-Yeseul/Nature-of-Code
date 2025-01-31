const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 800;
canvas.height = 400;

const user = new User(50, 300, 30); // 초기 위치 (50, 300), 크기 30
const groundLevel = 350;

// 키 입력 처리
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") user.moveLeft();
  if (event.key === "ArrowRight") user.moveRight();
  if (event.key === " ") user.jump(); // Spacebar로 점프
});

window.addEventListener("keyup", () => {
  user.stop(); // 키를 놓으면 멈춤
});

// 애니메이션 루프
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  user.applyGravity(); // 중력 적용
  user.update(groundLevel); // 위치 및 상태 업데이트
  user.draw(ctx); // 사용자 캐릭터 그리기

  requestAnimationFrame(animate); // 애니메이션 반복
}

animate();
