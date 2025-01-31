class User {
  position: { x: number; y: number }; // 캐릭터의 현재 위치
  velocity: { x: number; y: number }; // 캐릭터의 속도
  size: number; // 캐릭터의 크기 (정사각형 또는 원)
  speed: number; // 좌우 이동 속도
  jumpStrength: number; // 점프 시 속도
  gravity: number; // 중력 가속도
  isJumping: boolean; // 캐릭터가 점프 중인지 여부

  constructor(startX: number, startY: number, size: number) {
    this.position = { x: startX, y: startY }; // 초기 위치
    this.velocity = { x: 0, y: 0 }; // 초기 속도
    this.size = size; // 캐릭터 크기
    this.speed = 5; // 좌우 이동 속도
    this.jumpStrength = -15; // 점프 시 위로 올라가는 힘
    this.gravity = 1; // 중력 값
    this.isJumping = false; // 초기 상태는 점프 중 아님
  }

  // 왼쪽으로 이동
  moveLeft(): void {
    this.velocity.x = -this.speed;
  }

  // 오른쪽으로 이동
  moveRight(): void {
    this.velocity.x = this.speed;
  }

  // 점프
  jump(): void {
    if (!this.isJumping) {
      this.velocity.y = this.jumpStrength;
      this.isJumping = true; // 점프 중으로 상태 변경
    }
  }

  // 중력 적용
  applyGravity(): void {
    this.velocity.y += this.gravity; // 중력 가속도 추가
  }

  // 업데이트: 위치 및 상태 갱신
  update(groundLevel: number): void {
    // 속도에 따라 위치 업데이트
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // 바닥 충돌 처리
    if (this.position.y + this.size > groundLevel) {
      this.position.y = groundLevel - this.size; // 바닥에 닿으면 위치 조정
      this.velocity.y = 0; // 속도 초기화
      this.isJumping = false; // 점프 상태 해제
    }

    // 화면 경계 처리 (예: x 위치 제한)
    if (this.position.x < 0) this.position.x = 0; // 왼쪽 화면 경계
    if (this.position.x + this.size > 800) this.position.x = 800 - this.size; // 오른쪽 화면 경계
  }

  // 멈추기
  stop(): void {
    this.velocity.x = 0; // 좌우 속도를 0으로 설정
  }

  // 그리기: 캔버스에 캐릭터를 그립니다.
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size); // 캐릭터를 사각형으로 그리기
  }
}
