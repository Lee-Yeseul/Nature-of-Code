## cf. javascript로 Gaussian Number(정규분포 난수) 함수 구현하기

- Math.random() 함수는 균일 분포 난수를 생성한다.
- Box Muller 변환은 두 개의 균일 분포 난수를 이용해 정규분포 난수를 만들어내는 수학적인 방법이다.
  - 아래는 gpt 답변
  - **Box-Muller 변환**을 이용해 가우시안(정규) 분포 난수를 생성하는 원리를 학생에게 설명하듯 차근차근 알려드릴게요!

### 1️⃣ 왜 필요한가요?

`Math.random()`은 0 이상 1 미만의 균일분포(Uniform Distribution) 난수를 생성합니다.  
하지만 우리가 만들고 싶은 것은 **가우시안(정규) 분포** 난수입니다.

- **균일분포**는 모든 값이 나올 확률이 동일합니다.
- **정규분포**는 평균 근처의 값이 많이 나오고, 양쪽 끝으로 갈수록 적게 나오는 형태입니다.

### 2️⃣ 어떻게 만들까요?

**Box-Muller 변환**은 두 개의 균일분포 난수를 이용해 정규분포 난수를 만들어내는 수학적인 방법입니다.

### 3️⃣ 수식과 과정 이해하기

Box-Muller 변환의 핵심 수식은 다음과 같습니다:

\[
Z = \sqrt{-2 \ln U_1} \cdot \cos(2\pi U_2)
\]

여기서:

- \( U_1 \)과 \( U_2 \)는 (0, 1) 범위의 균일분포 난수입니다.
- \( Z \)는 평균 0, 표준편차 1인 정규분포 난수입니다.

또한, 두 번째 값도 생성할 수 있습니다:

\[
Z' = \sqrt{-2 \ln U_1} \cdot \sin(2\pi U_2)
\]

즉, **한 번 계산으로 정규분포 난수 두 개를 얻을 수 있습니다!**

### 4️⃣ 왜 이 수식이 정규분포를 만들까?

이 과정을 좀 더 쉽게 이해하기 위해 비유해볼게요.

1. **균일분포 난수 2개** → **원 안의 점 하나**를 찍는 것과 비슷합니다.
2. 그 점을 **극좌표계**로 바꾸면 \( r \)과 \( \theta \)가 됩니다.
   - \( r = \sqrt{-2 \ln U_1} \) → 점의 거리
   - \( \theta = 2\pi U_2 \) → 점의 각도
3. 이렇게 극좌표를 다시 직교좌표로 바꾸면:
   - \( x = r \cdot \cos(\theta) \)
   - \( y = r \cdot \sin(\theta) \)

이 변환 과정을 통해 점들이 자연스럽게 **정규분포 형태**로 퍼지게 됩니다!

### 5️⃣ 코드로 풀어보기

이제 이 과정을 코드를 통해 다시 보겠습니다.

```javascript
function gaussianRandom() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // U₁ 생성 (0 제외)
  while (v === 0) v = Math.random(); // U₂ 생성 (0 제외)

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
```

**한 줄씩 설명하자면:**

1. `u`와 `v`는 0이 아닌 난수입니다. (0이면 `log(0)`이 무한대가 되므로 제외)
2. `Math.sqrt(-2.0 * Math.log(u))` → **반지름(r)** 계산
3. `Math.cos(2.0 * Math.PI * v)` → **각도(θ)**를 이용해 x값 계산
4. 결과적으로 평균 0, 표준편차 1인 정규분포 난수를 반환합니다.

### 6️⃣ 평균과 표준편차 조정하기

만약 평균이 \( \mu \), 표준편차가 \( \sigma \)인 정규분포가 필요하다면 간단히 이렇게 변형합니다:

\[
X = Z \times \sigma + \mu
\]

```javascript
function gaussianRandomWithParams(mean = 0, stdDev = 1) {
  return gaussianRandom() * stdDev + mean;
}
```

### ✅ 요약

- **Box-Muller 변환**은 두 개의 균일분포 난수 → 정규분포 난수로 바꿔줍니다.
- 극좌표계 변환을 통해 점들이 자연스럽게 정규분포 형태로 퍼지게 됩니다.

```js
// 표준정규분포 난수 생성(Box-Muller 변환)
function gaussianRandom() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // U₁ 생성 (0 제외)
  while (v === 0) v = Math.random(); // U₂ 생성 (0 제외)
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
// 평균과 표준편차를 적용한 정규분포 난수 생성
function gaussianRandomWithParams(mean, stdDev) {
  return gaussianRandom() * stdDev + mean;
}
```
