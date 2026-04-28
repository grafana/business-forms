import { StandardEditorProps } from '@grafana/data';
import { Button, InlineField, InlineFieldRow, Input } from '@grafana/ui';
import React, { ChangeEvent } from 'react';

import { TEST_IDS } from '../../constants';
import { HeaderParameter } from '../../types';

/**
 * Properties
 */
type Props = StandardEditorProps<HeaderParameter[]>;

/**
 * Header Parameters Editor
 */
export const HeaderParametersEditor: React.FC<Props> = ({ value: parameters, onChange }) => {
  const params = parameters ?? [];

  /**
   * Return
   */
  return (
    <div data-testid={TEST_IDS.headerParametersEditor.root}>
      {params.map((parameter, id) => (
        <InlineFieldRow key={id} data-testid={TEST_IDS.headerParametersEditor.parameter(parameter.name)}>
          <InlineField label="Name" labelWidth={8} invalid={parameter.name === ''}>
            <Input
              placeholder="name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(params.map((p, i) => (i === id ? { ...p, name: event.target.value } : p)));
              }}
              value={parameter.name}
              data-testid={TEST_IDS.headerParametersEditor.fieldName}
            />
          </InlineField>
          <InlineField label="Value" labelWidth={8} grow>
            <Input
              placeholder="value"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(params.map((p, i) => (i === id ? { ...p, value: event.target.value } : p)));
              }}
              type="password"
              value={parameter.value}
              data-testid={TEST_IDS.headerParametersEditor.fieldValue}
            />
          </InlineField>
          <Button
            aria-label={`Remove ${parameter.name} parameter`}
            variant="secondary"
            onClick={() => {
              onChange(params.filter((_, i) => i !== id));
            }}
            icon="trash-alt"
            data-testid={TEST_IDS.headerParametersEditor.buttonRemove}
          />
        </InlineFieldRow>
      ))}

      <Button
        variant="secondary"
        onClick={() => {
          onChange([...params, { name: '', value: '' }]);
        }}
        icon="plus"
        data-testid={TEST_IDS.headerParametersEditor.buttonAdd}
      >
        Add Parameter
      </Button>
    </div>
  );
};
