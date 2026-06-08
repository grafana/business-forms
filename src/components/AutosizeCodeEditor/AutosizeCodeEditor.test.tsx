import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createSelector, getJestSelectors } from '@/test-utils/jest-selectors';
import { AutosizeCodeEditor } from './AutosizeCodeEditor';
import { CODE_EDITOR_CONFIG } from './config';
import { CODE_EDITOR_TEST_IDS } from './test-ids';

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Inlined from @volkovlabs/components AutosizeCodeEditor.test.tsx
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/components/AutosizeCodeEditor/AutosizeCodeEditor.test.tsx).
 */

/**
 * Properties
 */
type Props = React.ComponentProps<typeof AutosizeCodeEditor>;

/**
 * In Test Ids
 */
const InTestIds = {
  field: createSelector('data-testid field'),
};

const defaultModel = {
  setEOL: jest.fn(),
};

const defaultMonaco = {
  editor: {
    EndOfLineSequence: {
      '0': 'LF',
      '1': 'CRLF',
      LF: 0,
      CRLF: 1,
    },
  },
} as any;

const editor = {
  getPosition: () => ({
    lineNumber: 12,
    column: 5,
  }),
  focus: () => {},
  setPosition: (value: any) => value,
  revealLineInCenter: (value: any) => value,
  getSelection: () => null,
  executeEdits: (source: any, edits: any) => true,
  getModel: () => defaultModel,
};

/**
 * Mock Code Editor
 *
 * This repo's jest config has `resetMocks: true`, which clears
 * `jest.fn(impl)` between tests. Use plain function components for the
 * mock so the implementations survive across `it` blocks.
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  PageToolbar: ({ leftItems, children }: any) => {
    return (
      <>
        {leftItems}
        {children}
      </>
    );
  },
  CodeEditor: ({ value, onChange, onBlur, height, onEditorDidMount }: any) => {
    /**
     * Call the onEditorDidMount callback with the editor instance
     */
    onEditorDidMount(editor, defaultMonaco);

    return (
      <textarea
        {...InTestIds.field.apply()}
        style={{ height }}
        value={value}
        onChange={(event) => onChange?.(event.currentTarget.value)}
        onBlur={(event) => onBlur?.(event.currentTarget.value)}
      />
    );
  },
}));

describe('AutosizeCodeEditor', () => {
  /**
   * Selectors
   */
  const getSelectors = getJestSelectors({
    ...InTestIds,
    ...CODE_EDITOR_TEST_IDS,
  });
  const selectors = getSelectors(screen);

  /**
   * Get Tested Component
   * @param value
   * @param item
   * @param restProps
   */
  const getComponent = ({ value = '', ...restProps }: Partial<Props>) => {
    return <AutosizeCodeEditor {...(restProps as any)} value={value} />;
  };

  it('Should apply min height if empty value', () => {
    render(getComponent({}));

    expect(selectors.field()).toHaveStyle(`height: ${CODE_EDITOR_CONFIG.height.min}px`);
  });

  it('Should update height on change', () => {
    render(getComponent({}));

    const valueIn20Rows = Array.from(new Array(20))
      .map((value, index) => index)
      .join('\n');

    /**
     * Check height before changes
     */
    expect(selectors.field()).toHaveStyle(`height: 200px`);

    fireEvent.change(selectors.field(), { target: { value: valueIn20Rows } });

    /**
     * Check height after changes
     */
    expect(selectors.field()).toHaveStyle(`height: 360px`);
  });

  it('Should not call onBlur if onBlur is not provided', () => {
    const onBlur = jest.fn();
    render(getComponent({}));

    fireEvent.blur(selectors.field());
    expect(onBlur).not.toHaveBeenCalled();
  });

  it('Should call onBlur if onBlur is provided', () => {
    const onBlur = jest.fn();
    render(getComponent({ isEscaping: true, onBlur, value: '1line\n' }));

    fireEvent.blur(selectors.field());

    expect(onBlur).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledWith('1line\\n');
  });

  it('Should not escape value onBlur if option not specified', () => {
    const onBlur = jest.fn();
    render(getComponent({ isEscaping: false, onBlur, value: '1line\n' }));

    fireEvent.blur(selectors.field());

    expect(onBlur).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledWith('1line\n');
  });

  it('Should escape value onChange if value should be escaping', () => {
    const onChange = jest.fn();
    render(getComponent({ isEscaping: true, onChange, value: 'none' }));

    fireEvent.change(selectors.field(), { target: { value: '1line\n' } });

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('1line\\n');
  });

  it('Should not escape value onChange if option not specified', () => {
    const onChange = jest.fn();
    render(getComponent({ isEscaping: false, onChange, value: 'none' }));

    fireEvent.change(selectors.field(), { target: { value: '1line\n' } });

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('1line\n');
  });

  it('Should update height if props changed', () => {
    const { rerender } = render(getComponent({}));

    expect(selectors.field()).toHaveStyle(`height: ${CODE_EDITOR_CONFIG.height.min}px`);

    const valueIn20Rows = Array.from(new Array(20))
      .map((value, index) => index)
      .join('\n');

    rerender(getComponent({ value: valueIn20Rows }));

    expect(selectors.field()).toHaveStyle(`height: 360px`);
  });

  it('Should apply max height', () => {
    const valueIn1000Rows = Array.from(new Array(1000))
      .map((value, index) => index)
      .join('\n');

    render(getComponent({ value: valueIn1000Rows }));

    expect(selectors.field()).toHaveStyle(`height: ${CODE_EDITOR_CONFIG.height.max}px`);
  });

  it('Should render modal icon button and open/close modal window', () => {
    render(getComponent({}));

    expect(selectors.modalButton(true, 'modal-open')).toBeInTheDocument();
    expect(selectors.field()).toBeInTheDocument();

    fireEvent.click(selectors.modalButton(true, 'modal-open'));
    expect(selectors.modal()).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(selectors.modal(true)).not.toBeInTheDocument();
  });

  it('Should use code editor in modal window', async () => {
    const onChange = jest.fn();
    render(getComponent({ onChange }));

    expect(selectors.modalButton(true, 'modal-open')).toBeInTheDocument();

    fireEvent.click(selectors.modalButton(true, 'modal-open'));
    expect(selectors.modal()).toBeInTheDocument();

    const elements = screen.getAllByTestId('data-testid field');

    const editor1 = elements[0];
    const editor2 = elements[1];

    expect(editor1).toHaveValue('');
    expect(editor2).toHaveValue('');

    fireEvent.change(editor2, { target: { value: `console.log('test second')` } });

    expect(onChange).toHaveBeenCalledWith(`console.log('test second')`);
  });

  it('Should call onEditorDidMount', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => cb());

    render(getComponent({ onChange, onEditorDidMount }));

    expect(selectors.modalButton(true, 'modal-open')).toBeInTheDocument();

    expect(onEditorDidMount).toHaveBeenCalledTimes(2);

    fireEvent.click(selectors.modalButton(true, 'modal-open'));
    expect(selectors.modal()).toBeInTheDocument();

    expect(onEditorDidMount).toHaveBeenCalledTimes(6);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
  });

  it('Should render toolbar buttons', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    render(getComponent({ onChange, onEditorDidMount }));

    /**
     * Check modal button
     */
    expect(selectors.modalButton(true, 'modal-open')).toBeInTheDocument();

    /**
     * Check copy button
     */
    expect(selectors.copyButton()).toBeInTheDocument();

    /**
     * Check paste button
     */
    expect(selectors.pasteButton()).toBeInTheDocument();

    /**
     * Click on open modal
     */
    fireEvent.click(selectors.modalButton(true, 'modal-open'));

    /**
     * Check close collapse modal button in toolbar
     */
    expect(selectors.modalButton(true, 'modal-close')).toBeInTheDocument();
  });

  it('Should render wrap button and wrap lines on click', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    render(getComponent({ onEditorDidMount, onChange }));

    /**
     * Check paste button
     */
    expect(selectors.wrapButton()).toBeInTheDocument();

    expect(onEditorDidMount).toHaveBeenCalledTimes(2);

    act(() => fireEvent.click(selectors.wrapButton()));

    /**
     * Call onEditorDidMount after set state
     */
    expect(onEditorDidMount).toHaveBeenCalledTimes(3);

    act(() => fireEvent.click(selectors.wrapButton()));

    /**
     * Call onEditorDidMount after set state
     */
    expect(onEditorDidMount).toHaveBeenCalledTimes(4);
  });

  it('Should render mini map button and show/hide map if value more or equal 100 characters', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    const valueIn1000Rows = Array.from(new Array(1000))
      .map((value, index) => index)
      .join('\n');

    render(getComponent({ value: valueIn1000Rows, onEditorDidMount, onChange }));

    /**
     * Check paste button
     */
    expect(selectors.miniMapButton()).toBeInTheDocument();

    /**
     * Check tooltip via aria-label
     */
    expect(selectors.miniMapButton()).toHaveAttribute('aria-label', 'Show mini map');

    expect(onEditorDidMount).toHaveBeenCalledTimes(2);

    act(() => fireEvent.click(selectors.miniMapButton()));

    /**
     * Call onEditorDidMount after set state
     */
    expect(onEditorDidMount).toHaveBeenCalledTimes(3);

    /**
     * Check tooltip via aria-label
     */
    expect(selectors.miniMapButton()).toHaveAttribute('aria-label', 'Hide mini map');

    act(() => fireEvent.click(selectors.miniMapButton()));

    /**
     * Check tooltip via aria-label
     */
    expect(selectors.miniMapButton()).toHaveAttribute('aria-label', 'Show mini map');

    /**
     * Call onEditorDidMount after set state
     */
    expect(onEditorDidMount).toHaveBeenCalledTimes(4);
  });

  it('Should not render mini map button if value less than 100 characters', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    /**
     * 99 characters
     */
    const value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore';

    render(getComponent({ value: value, onEditorDidMount, onChange }));

    /**
     * Check paste button
     */
    expect(selectors.miniMapButton(true)).not.toBeInTheDocument();
  });

  it('Should open/close modal on toolbar button', async () => {
    const onChange = jest.fn();
    const onEditorDidMount = jest.fn();

    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => cb());

    render(getComponent({ onChange, onEditorDidMount }));

    /**
     * Check modal button
     */
    expect(selectors.modalButton(true, 'modal-open')).toBeInTheDocument();

    /**
     * Open modal
     */
    fireEvent.click(selectors.modalButton(true, 'modal-open'));

    /**
     * Modal should be open
     */
    expect(selectors.modal()).toBeInTheDocument();
    expect(selectors.modalButton(true, 'modal-close')).toBeInTheDocument();

    /**
     * Close modal from toolbar
     */
    fireEvent.click(selectors.modalButton(true, 'modal-close'));

    /**
     * Modal should be close
     */
    expect(selectors.modal(true)).not.toBeInTheDocument();
  });

  describe('copy/paste buttons', () => {
    beforeEach(() => {
      /**
       * Mock navigator.clipboard. `resetMocks: true` in this repo's jest
       * config wipes any `jest.fn(impl)` between tests, so set the
       * clipboard mock per test.
       */
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          /**
           * Mock navigator.clipboard writeText
           */
          writeText: jest.fn().mockImplementation(async (text) => {
            return Promise.resolve(text);
          }),
          /**
           * Mock navigator.clipboard readText
           */
          readText: jest.fn().mockImplementation(async (text) => {
            return Promise.resolve(text);
          }),
        },

        /**
         * Allows you to change the property later
         */
        configurable: true,
      });

      /**
       * Use fake timers
       */
      jest.useFakeTimers();
    });

    afterAll(() => {
      /**
       * Use real timers
       */
      jest.useRealTimers();
    });
    it('Should copy code', async () => {
      const onChange = jest.fn();
      const onEditorDidMount = jest.fn();

      render(getComponent({ onChange, onEditorDidMount, value: 'test code' }));

      expect(selectors.copyButton()).toBeInTheDocument();

      /**
       * Click on copy button
       */
      await act(() => fireEvent.click(selectors.copyButton()));

      /**
       * Should display copied text
       */
      expect(selectors.copyPasteText()).toBeInTheDocument();
      expect(selectors.copyPasteText()).toHaveTextContent('Copied!');

      /**
       * Scroll the timers by 2000 ms to call setTimeout
       */
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      /**
       * Should remove copied text
       */
      expect(selectors.copyPasteText()).toHaveTextContent('');
    });

    it('Should paste code', async () => {
      const onChange = jest.fn();
      const onEditorDidMount = jest.fn();

      render(getComponent({ onChange, onEditorDidMount, value: 'test code' }));

      expect(selectors.pasteButton()).toBeInTheDocument();

      /**
       * Click on paste button
       */
      await act(() => fireEvent.click(selectors.pasteButton()));

      /**
       * Should display pasted text
       */
      expect(selectors.copyPasteText()).toBeInTheDocument();
      expect(selectors.copyPasteText()).toHaveTextContent('Pasted!');

      /**
       * Scroll the timers by 2000 ms to call setTimeout
       */
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      /**
       * Should remove copied text
       */
      expect(selectors.copyPasteText()).toHaveTextContent('');
    });

    it('Should disable paste button for read-only mode', async () => {
      const onChange = jest.fn();
      const onEditorDidMount = jest.fn();

      render(getComponent({ onChange, onEditorDidMount, value: 'test code', readOnly: true }));

      expect(selectors.pasteButton()).toBeInTheDocument();

      /**
       * Click on paste button
       */
      await act(() => fireEvent.click(selectors.pasteButton()));

      /**
       * Should display pasted text
       */
      expect(selectors.pasteButton()).toBeInTheDocument();
      expect(selectors.pasteButton()).toBeDisabled();
    });
  });
});
