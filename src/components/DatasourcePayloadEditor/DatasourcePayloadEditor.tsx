import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { DatasourceQueryEditor } from './DatasourceQueryEditor';
import { get } from 'lodash';
import React, { useMemo } from 'react';

import { PanelOptions } from '../../types';

/**
 * Properties
 */
type Props = StandardEditorProps<unknown, { datasourceKey: string }, PanelOptions>;

/**
 * Payload Editor
 */
export const DatasourcePayloadEditor: React.FC<Props> = ({ context, value, onChange, item }) => {
  /**
   * Template Service
   */
  const templateService = getTemplateSrv();

  /**
   * Datasource Uid
   */
  const datasourceUid = useMemo(
    () => templateService.replace(get(context.options, item.settings?.datasourceKey || '')),
    [context.options, item.settings?.datasourceKey, templateService]
  );

  return (
    <DatasourceQueryEditor
      value={value}
      onChange={(payload) => {
        onChange(payload);
      }}
      datasourceUid={datasourceUid}
    />
  );
};
