//https://jestjs.io/docs/configuration
import type {Config} from 'jest';
const config: Config = {
  preset: 'ts-jest', //for typescript
  testEnvironment: 'jsdom', //instead of node
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
export default config;