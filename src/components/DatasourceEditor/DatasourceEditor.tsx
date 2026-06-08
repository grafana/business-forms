/**
 * Inlined from @volkovlabs/components DatasourceEditor.tsx.
 */
import { DataSourceInstanceSettings } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { Select } from '@grafana/ui';
import React, { useEffect, useMemo, useState } from 'react';

import { DATASOURCE_EDITOR_TEST_IDS } from './test-ids';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const useDatasources = () => {
  const [datasources, setDatasources] = useState<DataSourceInstanceSettings[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dsList = getDataSourceSrv().getList({
        alerting: false,
        tracing: false,
        metrics: false,
        logs: false,
        dashboard: false,
        mixed: false,
        variables: true,
        annotations: false,
        filter: (dataSource: DataSourceInstanceSettings) => dataSource.uid !== 'grafana',
      });
      setDatasources(dsList);
    };

    fetchData();
  }, []);

  return datasources;
};

/**
 * Data Source Editor
 */
export const DatasourceEditor: React.FC<Props> = ({ value, onChange }) => {
  const datasources = useDatasources();

  const datasourceOptions = useMemo(() => {
    return datasources.map((datasource) => ({
      label: datasource.name,
      value: datasource.uid,
    }));
  }, [datasources]);

  return (
    <Select
      onChange={(item) => {
        onChange(item.value!);
      }}
      options={datasourceOptions}
      value={value}
      {...DATASOURCE_EDITOR_TEST_IDS.fieldSelect.apply()}
    />
  );
};
