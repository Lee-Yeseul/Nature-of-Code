export function gaussianRandom() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // U₁ 생성 (0 제외)
  while (v === 0) v = Math.random(); // U₂ 생성 (0 제외)
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
// 평균과 표준편차를 적용한 정규분포 난수 생성
export function gaussianRandomWithParams(mean: number, stdDev: number) {
  return gaussianRandom() * stdDev + mean;
}
