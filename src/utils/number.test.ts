import { roundValueBySteps } from './number';

/**
 * Inlined from @volkovlabs/components number.test.ts
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/utils/number.test.ts).
 */
describe('Number utils', () => {
  describe('roundValueBySteps', () => {
    it('Should round value by nearest step', () => {
      const steps = [2, 4, 8, 16];

      expect(roundValueBySteps(2, steps)).toEqual(2);
      expect(roundValueBySteps(3, steps)).toEqual(4);
      expect(roundValueBySteps(4, steps)).toEqual(4);
      expect(roundValueBySteps(5, steps)).toEqual(4);
      expect(roundValueBySteps(6, steps)).toEqual(8);
      expect(roundValueBySteps(8, steps)).toEqual(8);
      expect(roundValueBySteps(10, steps)).toEqual(8);
      expect(roundValueBySteps(14, steps)).toEqual(16);
      expect(roundValueBySteps(18, steps)).toEqual(16);
    });

    it('Should return original value if no steps', () => {
      const steps: number[] = [];

      expect(roundValueBySteps(2, steps)).toEqual(2);
    });
  });
});
