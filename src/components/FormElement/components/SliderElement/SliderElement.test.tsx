import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { TEST_IDS } from '@/constants';
import { FormElementType } from '@/types';

import { SliderElement } from './SliderElement';

/**
 * Mock @grafana/ui Slider with a range input so onChange can be triggered
 * directly in tests without depending on @rc-component/slider internals.
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  Slider: ({ onChange, value, ariaLabelForHandle }: any) => (
    <input
      type="range"
      aria-label={ariaLabelForHandle}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
    />
  ),
}));

/**
 * Build a minimal slider element for tests
 */
const makeElement = (overrides = {}) => ({
  id: 'test-slider',
  uid: 'test-slider',
  type: FormElementType.SLIDER as const,
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  title: '',
  tooltip: '',
  section: '',
  unit: '',
  labelWidth: null,
  width: null,
  disabled: false,
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [],
  },
  ...overrides,
});

describe('SliderElement', () => {
  it('renders slider handle', () => {
    render(<SliderElement element={makeElement()} onChange={jest.fn()} />);

    expect(screen.getByLabelText(TEST_IDS.formElements.fieldSlider)).toBeInTheDocument();
  });

  it('renders number input', () => {
    render(<SliderElement element={makeElement()} onChange={jest.fn()} />);

    expect(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput)).toBeInTheDocument();
  });

  it('calls onChange when slider handle changes', () => {
    const onChange = jest.fn();
    render(<SliderElement element={makeElement()} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(TEST_IDS.formElements.fieldSlider), {
      target: { value: '75' },
    });

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 75 }));
  });

  it('calls onChange when number input changes', () => {
    const onChange = jest.fn();
    render(<SliderElement element={makeElement()} onChange={onChange} />);

    fireEvent.change(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput), {
      target: { value: '75' },
    });

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 75 }));
  });

  it('clamps input value to max', () => {
    const onChange = jest.fn();
    render(<SliderElement element={makeElement({ value: 50, min: 0, max: 100 })} onChange={onChange} />);

    fireEvent.change(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput), {
      target: { value: '200' },
    });

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 100 }));
  });

  it('clamps input value to min', () => {
    const onChange = jest.fn();
    render(<SliderElement element={makeElement({ value: 50, min: 10, max: 100 })} onChange={onChange} />);

    fireEvent.change(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput), {
      target: { value: '5' },
    });

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 10 }));
  });

  it('disables number input when disabled=true', () => {
    render(<SliderElement element={makeElement({ disabled: true })} onChange={jest.fn()} />);

    expect(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput)).toBeDisabled();
  });

  it('blocks slider pointer events when disabled=true', () => {
    render(<SliderElement element={makeElement({ disabled: true })} onChange={jest.fn()} />);

    const handle = screen.getByLabelText(TEST_IDS.formElements.fieldSlider);

    expect(handle.parentElement).toHaveStyle({ pointerEvents: 'none' });
  });

  it('displays current value in number input', () => {
    render(<SliderElement element={makeElement({ value: 42 })} onChange={jest.fn()} />);

    expect(screen.getByTestId(TEST_IDS.formElements.fieldSliderInput)).toHaveValue(42);
  });
});
