/**
 * Inlined from @volkovlabs/components NumberInput.tsx.
 */
import { Input } from '@grafana/ui';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { roundValueBySteps } from '../../utils/number';

/**
 * Properties
 */
interface Props extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'> {
  onChange?: (value: number) => void;
  value: number | string;
  step?: number;
  steps?: number[];
  min?: number;
  max?: number;
}

/**
 * Number Input
 */
export const NumberInput: React.FC<Props> = ({ value, onChange, min, max, step, steps, ...restProps }) => {
  const ref = useRef<HTMLInputElement>(null);
  const isChanged = useRef(false);

  const [localValue, setLocalValue] = useState(value?.toString() ?? '0');

  const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.currentTarget.value);
    isChanged.current = true;
  }, []);

  const onSaveValue = useCallback(() => {
    let v = Number(localValue);

    if (Number.isNaN(v)) {
      v = 0;
    }

    if (step !== undefined) {
      let availableValue = step * 1000;

      if (min !== undefined) {
        availableValue = min * 1000;
      }

      while (availableValue < v * 1000) {
        availableValue += step * 1000;
      }

      v = availableValue / 1000;
    }

    if (max !== undefined && v > max) {
      v = max;
    } else if (min !== undefined && v < min) {
      v = min;
    }

    if (steps !== undefined) {
      v = roundValueBySteps(v, steps);
    }

    if (isChanged.current) {
      onChange?.(v);
      setLocalValue(v.toString());
      isChanged.current = false;
    }
  }, [localValue, max, min, onChange, step, steps]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        ref.current?.blur();
      }
    },
    [onSaveValue]
  );

  useEffect(() => {
    setLocalValue(value?.toString() || '0');
  }, [value]);

  return (
    <Input
      ref={ref}
      {...restProps}
      type="text"
      value={localValue}
      onChange={onChangeValue}
      onBlur={onSaveValue}
      onKeyDown={onKeyDown}
    />
  );
};
