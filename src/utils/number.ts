/**
 * Inlined from @volkovlabs/components utils/number.ts.
 */
export const roundValueBySteps = (value: number, steps: number[]): number => {
  if (steps.length === 0) {
    return value;
  }

  let stepIndex = 0;

  while (stepIndex < steps.length) {
    if (value <= steps[stepIndex]) {
      if (value === steps[stepIndex]) {
        return value;
      }

      const prevValue = steps[Math.max(stepIndex - 1, 0)];
      const nextValue = steps[stepIndex];

      if (value - prevValue < nextValue - value) {
        return prevValue;
      }

      return nextValue;
    }

    stepIndex += 1;
  }

  return steps[steps.length - 1];
};
