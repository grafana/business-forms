/**
 * Inlined from @volkovlabs/components DatasourcePayloadEditor.tsx.
 *
 * Renamed from `DatasourcePayloadEditor` to `DatasourcePayloadEditorImpl` to
 * avoid colliding with the existing wrapper of the same name in this folder.
 */
import { DataSourceApi } from '@grafana/data';
import { getDataSourceSrv, getTemplateSrv } from '@grafana/runtime';
import { DataQuery } from '@grafana/schema';
import { Alert, LoadingPlaceholder } from '@grafana/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { useAutoSave } from '../../hooks/useAutoSave';
import { PAYLOAD_EDITOR_TEST_IDS } from './test-ids';

interface Props {
  value: unknown;
  onChange: (value: unknown) => void;
  /**
   * Data Source Name
   *
   * @type {string}
   */
  datasourceUid: string;
}

/**
 * Payload Editor
 */
export const DatasourcePayloadEditorImpl: React.FC<Props> = ({ value, onChange, datasourceUid }) => {
  const dataSourceService = getDataSourceSrv();
  const templateService = getTemplateSrv();

  const [datasource, setDatasource] = useState<DataSourceApi>();
  const [isLoading, setIsLoading] = useState(true);

  const { startTimer, removeTimer } = useAutoSave();
  const [query, setQuery] = useState(value);
  const [isChanged, setIsChanged] = useState(false);

  const onChangeQuery = useCallback((query: unknown) => {
    setQuery(query);
    setIsChanged(true);
  }, []);

  const onRunQuery = useCallback(() => null, []);

  const onSaveUpdates = useCallback(() => {
    onChange(query);
    setIsChanged(false);
  }, [onChange, query]);

  useEffect(() => {
    const getDataSource = async (datasourceUid: string) => {
      setIsLoading(true);

      const ds = await dataSourceService.get(datasourceUid);

      setIsLoading(false);

      return ds;
    };

    const checkDatasourceType = async () => {
      const loadedDatasource = datasource;
      const replacedDatasourceUid = templateService.replace(datasourceUid);

      if (loadedDatasource && loadedDatasource.uid !== replacedDatasourceUid) {
        const currentDatasource = await getDataSource(replacedDatasourceUid);

        if (loadedDatasource.type !== currentDatasource.type) {
          onChangeQuery({});
        }

        setDatasource(currentDatasource);
      }

      if (replacedDatasourceUid && !datasource) {
        setDatasource(await getDataSource(replacedDatasourceUid));
      }
    };

    checkDatasourceType();
  }, [datasourceUid, dataSourceService, datasource, onChangeQuery, templateService]);

  useEffect(() => {
    if (isChanged) {
      startTimer(onSaveUpdates);
    } else {
      removeTimer();
    }

    return () => {
      removeTimer();
    };
  }, [startTimer, isChanged, onSaveUpdates, removeTimer]);

  if (isLoading) {
    return (
      <Alert severity="info" title="Please Wait" {...PAYLOAD_EDITOR_TEST_IDS.loadingMessage.apply()}>
        <LoadingPlaceholder text="Loading..." />
      </Alert>
    );
  }

  if (!datasource || !datasource.components?.QueryEditor) {
    return <Alert title="No Query Editor" severity="error" {...PAYLOAD_EDITOR_TEST_IDS.errorMessage.apply()} />;
  }

  const Editor = datasource.components.QueryEditor;

  return <Editor datasource={datasource} query={query as DataQuery} onChange={onChangeQuery} onRunQuery={onRunQuery} />;
};
