import { getDataSourceSrv } from '@grafana/runtime';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { getJestSelectors } from '@/test-utils/jest-selectors';

import { DatasourceEditor } from './DatasourceEditor';
import { DATASOURCE_EDITOR_TEST_IDS } from './test-ids';

/**
 * Inlined from @volkovlabs/components DatasourceEditor.test.tsx
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/components/DatasourceEditor/DatasourceEditor.test.tsx).
 *
 * Upstream mocks the package-internal `useDatasources` hook directly.
 * The inlined `DatasourceEditor` keeps that hook private, so this port
 * drives it via the underlying `@grafana/runtime` `getDataSourceSrv()`
 * mock instead. Behaviour observed (the `onChange` contract) is
 * identical.
 */

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getDataSourceSrv: jest.fn(),
}));

describe('Select Datasource Editor', () => {
  const onChange = jest.fn();

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(DATASOURCE_EDITOR_TEST_IDS);
  const selectors = getSelectors(screen);

  /**
   * Get Tested Component
   */
  const getComponent = ({ value = null, ...restProps }: any) => {
    return <DatasourceEditor onChange={onChange} {...restProps} value={value} />;
  };

  beforeEach(() => {
    onChange.mockClear();
  });

  it('Should update value', async () => {
    jest.mocked(getDataSourceSrv).mockReturnValue({
      getList: jest.fn(() => [
        { name: '123', uid: 'ds1' },
        { name: 'abc', uid: 'ds2' },
      ]),
    } as any);

    await act(async () => {
      render(getComponent({}));
    });

    fireEvent.change(selectors.fieldSelect(), { target: { value: 'ds1' } });

    expect(onChange).toHaveBeenCalledWith('ds1');
  });
});
