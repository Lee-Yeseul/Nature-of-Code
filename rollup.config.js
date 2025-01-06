import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// 다중 입력 파일
const utils = [""]; // 번들링할 파일 목록

export default utils.map((util) => ({
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  plugins: [
    nodeResolve(), // Node.js 모듈 해석
    commonjs(), // CommonJS 모듈 지원
    typescript({ tsconfig: "./tsconfig.json" }), // TypeScript 플러그인
  ],
}));
