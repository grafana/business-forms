/**
 * Inlined from @volkovlabs/components utils/code-parameters-builder.ts.
 */
import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

interface CodeParameterGroup {
  detail: string;
  items: Record<string, CodeParameterGroup | CodeParameterItem>;
}

export class CodeParameterItem<TValue = unknown> {
  value: TValue = {} as TValue;

  constructor(
    public detail: string,
    public kind: CodeEditorSuggestionItemKind = CodeEditorSuggestionItemKind.Property
  ) {}
}

type PayloadForGroup<TGroup extends CodeParameterGroup> = {
  [Key in keyof TGroup['items']]: TGroup['items'][Key] extends CodeParameterGroup
    ? PayloadForGroup<TGroup['items'][Key]>
    : TGroup['items'][Key] extends CodeParameterItem
      ? TGroup['items'][Key]['value']
      : unknown;
};

export class CodeParametersBuilder<TGroup extends CodeParameterGroup> {
  suggestions: CodeEditorSuggestionItem[] = [];

  constructor(group: TGroup, basePath = 'context') {
    this.suggestions.push({
      label: basePath,
      kind: CodeEditorSuggestionItemKind.Constant,
      detail: group.detail,
    });

    this.addSuggestions(basePath, group);
  }

  private addSuggestions(path: string, group: CodeParameterGroup) {
    Object.entries(group.items).forEach(([key, item]) => {
      const itemPath = `${path}.${key}`;

      if ('items' in item) {
        this.suggestions.push({
          label: itemPath,
          detail: item.detail,
          kind: CodeEditorSuggestionItemKind.Property,
        });

        this.addSuggestions(itemPath, item);

        return;
      }

      this.suggestions.push({
        label: itemPath,
        detail: item.detail,
        kind: item.kind,
      });
    });
  }

  create(payload: PayloadForGroup<TGroup>) {
    return payload;
  }
}
