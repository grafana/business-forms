/**
 * Inlined from @volkovlabs/components AutosizeCodeEditor/Toolbar.tsx.
 */
import { css, cx } from '@emotion/css';
import {
  CodeEditorMonacoOptions,
  InlineField,
  InlineFieldRow,
  PageToolbar,
  ToolbarButton,
  useStyles2,
} from '@grafana/ui';
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useState } from 'react';

import { getStyles } from './AutosizeCodeEditor.styles';
import { CODE_EDITOR_TEST_IDS } from './test-ids';

type Props = {
  monacoEditor: monacoType.editor.IStandaloneCodeEditor | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorValue: string;
  isModal?: boolean;
  currentMonacoOptions: CodeEditorMonacoOptions | undefined;
  setCurrentMonacoOptions: React.Dispatch<React.SetStateAction<CodeEditorMonacoOptions | undefined>>;
  isShowMiniMap?: boolean;
  setIsShowMiniMap: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  readOnly?: boolean;
};

export const Toolbar: React.FC<Props> = ({
  monacoEditor,
  setIsOpen,
  editorValue,
  isModal = false,
  setCurrentMonacoOptions,
  currentMonacoOptions,
  isShowMiniMap,
  setIsShowMiniMap,
  readOnly,
}) => {
  const styles = useStyles2(getStyles);
  const [copyPasteText, setCopyPasteText] = useState('');

  useEffect(() => {
    if (copyPasteText) {
      setTimeout(() => {
        setCopyPasteText('');
      }, 1000);
    }
  }, [copyPasteText]);

  return (
    <PageToolbar
      buttonOverflowAlignment="right"
      className={styles.line}
      forceShowLeftItems={true}
      leftItems={[
        <ToolbarButton
          key="code-editor-button-modal"
          tooltip={isModal ? 'Collapse code editor' : 'Expand code editor'}
          icon={isModal ? 'compress-arrows' : 'expand-arrows-alt'}
          iconSize="lg"
          onClick={() => setIsOpen(isModal ? false : true)}
          {...CODE_EDITOR_TEST_IDS.modalButton.apply(isModal ? 'modal-close' : 'modal-open')}
        />,
      ]}
    >
      <InlineFieldRow className={styles.copyPasteSection}>
        <ToolbarButton
          className={styles.copyPasteIcon}
          tooltip="Copy code"
          icon="file-blank"
          iconSize="lg"
          onClick={() => {
            navigator.clipboard.writeText(editorValue).then(() => {
              setCopyPasteText('Copied!');
            });
          }}
          {...CODE_EDITOR_TEST_IDS.copyButton.apply()}
        />
        <ToolbarButton
          disabled={readOnly}
          className={styles.copyPasteIcon}
          tooltip={readOnly ? `Cannot edit in read-only mode` : `Paste code`}
          icon="file-alt"
          iconSize="lg"
          onClick={async () => {
            if (monacoEditor) {
              const selection: monacoType.Selection | null = monacoEditor.getSelection();

              const text = await navigator.clipboard.readText();

              const range = {
                startLineNumber: selection?.startLineNumber || 1,
                startColumn: selection?.startColumn || 1,
                endLineNumber: selection?.endLineNumber || 1,
                endColumn: selection?.endColumn || 1,
              };

              monacoEditor.executeEdits('clipboard', [
                {
                  range: range,
                  text: text,
                  forceMoveMarkers: false,
                },
              ]);
              monacoEditor.focus();
              setCopyPasteText('Pasted!');
            }
          }}
          {...CODE_EDITOR_TEST_IDS.pasteButton.apply()}
        />
        <InlineField
          className={cx(
            styles.copyPasteText,
            copyPasteText
              ? css`
                  width: 45px;
                `
              : css`
                  width: 10px;
                `
          )}
          {...CODE_EDITOR_TEST_IDS.copyPasteText.apply()}
        >
          <div className={cx(styles.text, copyPasteText ? styles.left : '')}>{copyPasteText}</div>
        </InlineField>
      </InlineFieldRow>
      <ToolbarButton
        tooltip="Wrap code on new lines"
        icon="wrap-text"
        iconSize="lg"
        variant={currentMonacoOptions?.wordWrap === 'on' ? 'active' : 'default'}
        onClick={() => {
          const wrapCode = currentMonacoOptions?.wordWrap === 'on' ? 'off' : 'on';
          setCurrentMonacoOptions({
            ...currentMonacoOptions,
            wordWrap: wrapCode,
          });
        }}
        {...CODE_EDITOR_TEST_IDS.wrapButton.apply()}
      />
      {editorValue && editorValue.length > 100 && (
        <ToolbarButton
          tooltip={isShowMiniMap ? 'Hide mini map' : 'Show mini map'}
          icon="gf-movepane-right"
          iconSize="lg"
          variant={isShowMiniMap ? 'active' : 'default'}
          onClick={() => {
            setIsShowMiniMap((prev) => !prev);
          }}
          {...CODE_EDITOR_TEST_IDS.miniMapButton.apply()}
        />
      )}
    </PageToolbar>
  );
};
