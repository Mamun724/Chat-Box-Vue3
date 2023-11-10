export function delaySim(timeMs) {
  return new Promise((resolve) => setTimeout(() => resolve(), timeMs));
}
