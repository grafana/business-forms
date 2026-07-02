import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createSelector, getJestSelectors } from '@/test-utils/jest-selectors';

import { NumberInput } from './NumberInput';

/**
 * Inlined from @volkovlabs/components NumberInput.test.tsx
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/components/NumberInput/NumberInput.test.tsx).
 */

/**
 * Properties
 */
type Props = React.ComponentProps<typeof NumberInput>;

/**
 * In Test Ids
 */
const InTestIds = {
  field: createSelector('data-testid field'),
};

describe('Number Input', () => {
  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(InTestIds);
  const selectors = getSelectors(screen);

  /**
   * Get Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <NumberInput min={1} max={10} {...InTestIds.field.apply()} {...(props as any)} />;
  };

  it('Should allow to enter negative value', () => {
    const onChange = jest.fn();

    render(getComponent({ min: -100, onChange }));

    fireEvent.change(selectors.field(), { target: { value: '-75' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(-75);
  });

  it('Should allow to enter decimal value', () => {
    const onChange = jest.fn();

    render(getComponent({ min: -1, max: 1.1, step: 0.3, onChange }));

    fireEvent.change(selectors.field(), { target: { value: '0.8' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(0.8);

    onChange.mockClear();

    fireEvent.change(selectors.field(), { target: { value: '0.7' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(0.8);
  });

  it('Should validate value on NaN and use min value', () => {
    const onChange = jest.fn();

    render(getComponent({ min: 15, max: 20, onChange }));

    fireEvent.change(selectors.field(), { target: { value: 'abc' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(15);
  });

  it('Should allow to increase value by step', () => {
    const onChange = jest.fn();

    render(getComponent({ min: 1, max: 9, onChange, value: 1, step: 2 }));

    fireEvent.change(selectors.field(), { target: { value: '3' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('Should ceil value if increased more than step', () => {
    const onChange = jest.fn();

    render(getComponent({ min: 1, max: 9, onChange, value: 1, step: 2 }));

    fireEvent.change(selectors.field(), { target: { value: '2' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('Should round value by steps', () => {
    const onChange = jest.fn();

    render(getComponent({ min: 1, max: 9, onChange, value: 1, step: undefined, steps: [1, 5] }));

    fireEvent.change(selectors.field(), { target: { value: '3' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('Should set min value', () => {
    const onChange = jest.fn();

    render(getComponent({ min: -1, onChange }));

    fireEvent.change(selectors.field(), { target: { value: '-75' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(-1);
  });

  it('Should set max value', () => {
    const onChange = jest.fn();

    render(getComponent({ max: 5, onChange }));

    fireEvent.change(selectors.field(), { target: { value: '75' } });
    fireEvent.blur(selectors.field());

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('Should set updated value', () => {
    const { rerender } = render(getComponent({ value: 5 }));

    expect(selectors.field()).toHaveValue('5');

    rerender(
      getComponent({
        value: 10,
      })
    );

    expect(selectors.field()).toHaveValue('10');
  });

  it('Should blur to enter press', async () => {
    const onChange = jest.fn();

    render(getComponent({ onChange }));

    fireEvent.change(selectors.field(), { target: { value: '5' } });
    fireEvent.keyDown(selectors.field(), { key: 'Enter' });

    expect(selectors.field()).not.toHaveFocus();

    /**
     * Jest doesn't trigger onBlur by element.blur() so just fire blur event
     */
    fireEvent.blur(selectors.field());
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('Should not trigger onChange if value not updated', async () => {
    const onChange = jest.fn();

    render(getComponent({ onChange, value: 5 }));

    fireEvent.change(selectors.field(), { target: { value: '5' } });

    /**
     * Jest doesn't trigger onBlur by element.blur() so just fire blur event
     */
    fireEvent.blur(selectors.field());
    expect(onChange).not.toHaveBeenCalled();
  });
});
