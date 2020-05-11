// fibonacci.ts

export const fibonacci = (value: number): [number, number] => {
  if (value <= 0) {
    return [1, 0];
  }
  const [current, previous] = fibonacci(value - 1);
  return [current + previous, current];
}
