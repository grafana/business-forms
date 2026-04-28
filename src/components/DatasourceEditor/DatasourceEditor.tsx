import { Select } from '@grafana/ui';
import React, { useMemo } from 'react';

import { TEST_IDS } from '@/constants';
import { useDatasources } from '@/hooks';

/**
 * Properties
 */
interface Props {
  /**
   * Selected datasource UID
   *
   * @type {string}
   */
  value: string;

  /**
   * On Change
   *
   * @param value
   */
  onChange: (value: string) => void;
}

/**
 * Datasource Editor
 * Panel options editor for selecting a Grafana datasource by UID.
 */
export const DatasourceEditor: React.FC<Props> = ({ value, onChange }) => {
  const datasources = useDatasources();

  const options = useMemo(
    () => datasources.map((ds) => ({ label: ds.name, value: ds.uid })),
    [datasources]
  );

  return (
    <Select
      onChange={(item) => item.value && onChange(item.value)}
      options={options}
      value={value}
      data-testid={TEST_IDS.datasourceEditor.fieldSelect}
    />
  );
};
