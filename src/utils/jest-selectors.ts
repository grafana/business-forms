import { BoundFunctions, Queries, Screen } from '@testing-library/react';

/**
 * Selector Value
 * A static string or a function that returns a string given arguments.
 */
type SelectorValue = string | ((...args: unknown[]) => string);

/**
 * Jest Selector
 * A function that queries the DOM.
 * Pass noThrowOnNotFound=true to use queryBy* (returns null) instead of getBy* (throws).
 */
type JestSelector<TArgs extends unknown[]> = (noThrowOnNotFound?: boolean, ...args: TArgs) => HTMLElement;

/**
 * Jest Selectors
 * Maps each key of a selectors record to a JestSelector function, preserving argument types.
 */
export type JestSelectors<T extends Record<string, SelectorValue>> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => string ? JestSelector<Args> : JestSelector<[]>;
};

/**
 * Get Jest Selectors
 * Returns a factory that takes a testing-library screen (or within() result) and produces a
 * selector object. Each selector dispatches to getByTestId/queryByTestId for values starting
 * with "data-testid" (or keys listed in enforceTestIdSelectorForKeys), and getByLabelText/
 * queryByLabelText otherwise.
 */
export const getJestSelectors =
  <TSelectors extends Record<string, SelectorValue>>(
    selectors: TSelectors,
    enforceTestIdSelectorForKeys: Array<keyof TSelectors> = []
  ) =>
  (screen: Screen | BoundFunctions<Queries>): JestSelectors<TSelectors> => {
    return Object.entries(selectors).reduce(
      (acc, [key, selector]) => {
        const getElement = (noThrowOnNotFound = false, ...args: unknown[]) => {
          const value = typeof selector === 'function' ? selector(...args) : selector;
          if (value.startsWith('data-testid') || enforceTestIdSelectorForKeys.includes(key)) {
            return (noThrowOnNotFound ? screen.queryByTestId(value) : screen.getByTestId(value)) as HTMLElement;
          }
          return (noThrowOnNotFound ? screen.queryByLabelText(value) : screen.getByLabelText(value)) as HTMLElement;
        };
        return { ...acc, [key]: getElement };
      },
      {} as JestSelectors<TSelectors>
    );
  };
