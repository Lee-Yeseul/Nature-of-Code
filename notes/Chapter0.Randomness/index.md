## Chapter 0: Randomness

### Random Walks

일직선상에서 서있다고 가정했을 때 10초에 한번씩 동전을 던저서 앞면이 나오면 앞으로, 뒷면이 나오면 뒤로 움직인다고 생각해보자.
random walk는 바로 이러한 random한 step의 연속을 이야기한다.
만약 1차원에서 2차원으로 확장한다면 아래와 같이 네 가지 방향으로 움직일 수 있다.

| Flip 1 | Flip 2 | Result         |
| ------ | ------ | -------------- |
| Heads  | Heads  | Step forward.  |
| Heads  | Tails  | Step right.    |
| Tails  | Heads  | Step left.     |
| Tails  | Tails  | Step backward. |

매우 단순한 알고리즘처럼 보이지만 random walk는 현실 세계에서 일어나는 모든 현상들을 구현할 수 있게 해줍니다.

random walk로 nature of code를 시작하는 이유는 아래와 같습니다.

1. OOP 복습
   - Walker Class를 작성해 OOP 기본 개념 복습
   - OOP를 통해 그래픽 캔버스에서 움직이는 객체를 만드는 방법 소개
2. 이 책에서 반복적으로 다룰 두 가지 질문에 대해 생각해 볼 수 있음
   - 객체의 행동을 정의하는 규칙은 무엇인가?
   - 이 규칙은 코드로 어떻게 구현할 것인가?
3. randomness, probability, Perlin noise에 대한 이해

### The Random Walker Class

-> src/01.Randomness/randomWalker.js > walker class

> Pseudorandom Number(의사난수)란 무작위로 보이지만 실제로는 완전한 랜덤이 아니라 특정 알고리즘에 의해 결정론적으로 생성된 숫자들을 말한다.(js에서 random도 의사난수!)

Exercise.01
Create a random walker that has a greater tendency to move down and to the right. (A partial solution follows in the next section.)
-> src/01.Randomness/randomWalker.js > walker class > biased step fn

### Probability and Nonuniform Distributions(확률과 비균일 분포)

1. Uniform Randomness

- 모든 결과가 동일한 확률을 가지는 랜덤성 간단한 시뮬레이션에는 적합할 수 있지만 자연스럽고 유기적인 결과를 표현하기에는 한계가 있을 수 있다.

2. NonUniform Randomness

- 특정 결과가 더 자주 발생하도록 확률을 조정하는 방식, 자연 현상을 모델링하거나 특정한 시뮬레이션의 현실감을 높이는데 유용
- ex. 자연선택(적합한 개체가 선택될 확률이 높아야 함), 유전자 알고리즘(더 우수한 개체가 다음 세대로 더 많이 전달됨)

3. Probability

- 확률이란 특정 사건(Event)이 발생할 가능성을 측정한 값

### A Normal Distribution of Random Numbers

- 비균일 난수를 만드는 다른 방법 중 하나는 정규분포를 이용하는 것이다. (정규분포가 클수록 고르게 분포)
- ex. 랜덤하게 사람의 키를 구하는 함수를 만든다고 할 떄 가장 많은 값에서 가장 많은 결과가 나와야 하므로 정규분포를 이용하는 것이 더 적합하다.
- cf. [Javascript로 Gaussian Number 함수 구현하기](./01-01.GaussianRandom.md)
- ex4. Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central position, but some dots splatter out toward the edges. Can you use a normal distribution of random numbers to generate the positions of the dots? Can you also use a normal distribution of random numbers to generate a color palette? Try creating a slider to adjust the standard deviation.

### A Custom Distribution of Random Numbers

- 균일 분포 난수나 가우시안 분포가 아닌 난수 구하는 법
- 랜덤 워커는 이전에 방문한 위치로 여러 번 돌아가는데 이걸 oversampling이라고 한다. 이는 비효율적임
  이를 피하기 위한 전략 중 하나는 가끔 매우 큰 걸음을 내딛는 것이다. 이를 통해 워커는 특정 위치 주변을 무작위로 탐색하면서 주기적으로 멀리 점프하여 oversampling을 피할 수 있다.
  Levy flight라고 알려진 무작위 워크의 이러한 변형에는 사용자 정의 확률 집합이 필요하다.
- 수락 거부 알고리즘

### A Smoother Approach with Perlin Noise

- 좋은 난수 생성기는 서로 관련이 없고 식별 가능한 패턴을 보이지 않는 숫자를 생성하낟. 그러나 유기적인 행동을 프로그래밍할 때 균일한 무작위성은 자연스럽지 않을 수 있다. Perlin noise 알고리즘은 자연스럽게 정렬된 의사난수 시퀀스를 생성한다. 시퀀스의 각 숫자는 이전 숫자와 값이 매우 가깝다. 이를 통해 난수 사이에 부드러운 전환이 이루어지고 순수한 노이즈보다 유기적인 모양이 나타난다.
