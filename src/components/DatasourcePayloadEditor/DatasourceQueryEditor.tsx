import { DataSourceApi } from '@grafana/data';
import { getDataSourceSrv, getTemplateSrv } from '@grafana/runtime';
import { DataQuery } from '@grafana/schema';
import { Alert, LoadingPlaceholder } from '@grafana/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { TEST_IDS } from '@/constants';
import { useAutoSave } from '@/hooks';

/**
 * Properties
 */
interface Props {
  /**
   * Query value
   */
  value: unknown;

  /**
   * On Change
   *
   * @param value
   */
  onChange: (value: unknown) => void;

  /**
   * Datasource UID
   *
   * @type {string}
   */
  datasourceUid: string;
}

/**
 * Datasource Query Editor
 * Dynamically loads and renders the native QueryEditor for the selected datasource.
 * Saves changes via auto-save timer.
 */
export const DatasourceQueryEditor: React.FC<Props> = ({ value, onChange, datasourceUid }) => {
  const dataSourceService = getDataSourceSrv();
  const templateService = getTemplateSrv();

  /**
   * Datasource state
   */
  const [datasource, setDatasource] = useState<DataSourceApi>();
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Query / auto-save state
   */
  const { startTimer, removeTimer } = useAutoSave();
  const [query, setQuery] = useState(value);
  const [isChanged, setIsChanged] = useState(false);

  /**
   * On Change Query
   */
  const onChangeQuery = useCallback((query: unknown) => {
    setQuery(query);
    setIsChanged(true);
  }, []);

  /**
   * On Run Query — no-op, required by QueryEditor interface
   */
  const onRunQuery = useCallback(() => null, []);

  /**
   * Save Updates
   */
  const onSaveUpdates = useCallback(() => {
    onChange(query);
    setIsChanged(false);
  }, [onChange, query]);

  /**
   * Load datasource and reset query on type change
   */
  useEffect(() => {
    const getDataSource = async (uid: string) => {
      setIsLoading(true);
      const ds = await dataSourceService.get(uid);
      setIsLoading(false);
      return ds;
    };

    const checkDatasource = async () => {
      const replacedUid = templateService.replace(datasourceUid);

      if (datasource && datasource.uid !== replacedUid) {
        const current = await getDataSource(replacedUid);
        if (datasource.type !== current.type) {
          onChangeQuery({});
        }
        setDatasource(current);
        return;
      }

      if (replacedUid && !datasource) {
        setDatasource(await getDataSource(replacedUid));
      }
    };

    checkDatasource();
  }, [datasourceUid, dataSourceService, datasource, onChangeQuery, templateService]);

  /**
   * Auto-save timer
   */
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
      <Alert severity="info" title="Please Wait" data-testid={TEST_IDS.payloadEditor.loadingMessage}>
        <LoadingPlaceholder text="Loading..." />
      </Alert>
    );
  }

  if (!datasource || !datasource.components?.QueryEditor) {
    return <Alert title="No Query Editor" severity="error" data-testid={TEST_IDS.payloadEditor.errorMessage} />;
  }

  const Editor = datasource.components.QueryEditor;

  return <Editor datasource={datasource} query={query as DataQuery} onChange={onChangeQuery} onRunQuery={onRunQuery} />;
};
