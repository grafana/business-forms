/**
 * Inlined from @volkovlabs/components AutosizeCodeEditor.tsx.
 */
import { CodeEditor, Modal, useStyles2 } from '@grafana/ui';
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useEffect, useState } from 'react';

import { getStyles } from './AutosizeCodeEditor.styles';
import { CODE_EDITOR_CONFIG } from './config';
import { CODE_EDITOR_TEST_IDS } from './test-ids';
import { Toolbar } from './Toolbar';

type Props = React.ComponentProps<typeof CodeEditor> & {
  minHeight?: number;
  maxHeight?: number;
  isEscaping?: boolean;
};

const getHeightByValue = (value: string, minHeight?: number, maxHeight?: number) => {
  const height = value.split('\n').length * CODE_EDITOR_CONFIG.lineHeight;

  const minCurrentHeight = minHeight || CODE_EDITOR_CONFIG.height.min;
  const maxCurrentHeight = maxHeight || CODE_EDITOR_CONFIG.height.max;

  if (height < minCurrentHeight) {
    return minCurrentHeight;
  }

  if (height > maxCurrentHeight) {
    return maxCurrentHeight;
  }

  return height;
};

export const AutosizeCodeEditor: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  minHeight,
  maxHeight,
  height: staticHeight,
  onEditorDidMount,
  monacoOptions,
  showMiniMap,
  isEscaping = false,
  ...restProps
}) => {
  const styles = useStyles2(getStyles);

  const [isOpen, setIsOpen] = useState(false);
  const [isShowMiniMap, setIsShowMiniMap] = useState(showMiniMap);
  const [currentMonacoOptions, setCurrentMonacoOptions] = useState(monacoOptions);
  const [monacoEditor, setMonacoEditor] = useState<monacoType.editor.IStandaloneCodeEditor | null>(null);
  const [monacoEditorModal, setMonacoEditorModal] = useState<monacoType.editor.IStandaloneCodeEditor | null>(null);

  const [height, setHeight] = useState(getHeightByValue(value, minHeight, maxHeight));

  const setEndLine = useCallback(
    (editor: monacoType.editor.IStandaloneCodeEditor, monaco: typeof monacoType): void => {
      if (isEscaping) {
        const model = editor.getModel();
        model?.setEOL(monaco.editor.EndOfLineSequence.LF);
      }
    },
    [isEscaping]
  );

  const onEditorDidMountMain = useCallback(
    (editor: monacoType.editor.IStandaloneCodeEditor, monaco: typeof monacoType) => {
      setEndLine(editor, monaco);
      setMonacoEditor(editor);
      if (onEditorDidMount) {
        onEditorDidMount(editor, monaco);
      }
    },
    [setEndLine, onEditorDidMount]
  );

  const modalEditorDidMount = useCallback(
    (editor: monacoType.editor.IStandaloneCodeEditor, monaco: typeof monacoType) => {
      setEndLine(editor, monaco);
      setMonacoEditorModal(editor);
      if (monacoEditor) {
        const positionsParams: monacoType.Position | null = monacoEditor?.getPosition();
        if (positionsParams) {
          editor.setPosition({ lineNumber: positionsParams.lineNumber, column: positionsParams.column });
          editor.focus();

          setTimeout(() => {
            editor.revealLineInCenter(positionsParams.lineNumber);
          }, 0);
        }
      }
      if (onEditorDidMount) {
        onEditorDidMount(editor, monaco);
      }
    },
    [setEndLine, monacoEditor, onEditorDidMount]
  );

  const onChangeValue = useCallback(
    (value: string) => {
      const currentValue = isEscaping ? value.replaceAll('\n', '\\n') : value;
      onChange?.(currentValue);
      setHeight(getHeightByValue(value, minHeight, maxHeight));
    },
    [maxHeight, minHeight, onChange, isEscaping]
  );

  const onBlurUpdate = useCallback(
    (value: string) => {
      const currentValue = isEscaping ? value.replaceAll('\n', '\\n') : value;
      onBlur?.(currentValue);
    },
    [onBlur, isEscaping]
  );

  useEffect(() => {
    setHeight(getHeightByValue(value, minHeight, maxHeight));
  }, [value, minHeight, maxHeight]);

  return (
    <>
      <Toolbar
        editorValue={value}
        setIsOpen={setIsOpen}
        monacoEditor={monacoEditor}
        isShowMiniMap={isShowMiniMap}
        setIsShowMiniMap={setIsShowMiniMap}
        currentMonacoOptions={currentMonacoOptions}
        setCurrentMonacoOptions={setCurrentMonacoOptions}
        readOnly={restProps.readOnly}
      />
      <CodeEditor
        value={isEscaping ? value.replaceAll('\\n', '\n') : value}
        showMiniMap={isShowMiniMap}
        height={staticHeight ?? height}
        monacoOptions={currentMonacoOptions}
        onEditorDidMount={onEditorDidMountMain}
        onChange={onChangeValue}
        onBlur={onBlurUpdate}
        {...restProps}
      />

      <Modal
        title="Code editor"
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        className={styles.modal}
        contentClassName={styles.modalBody}
        closeOnEscape
        trapFocus
      >
        <div className={styles.content} {...CODE_EDITOR_TEST_IDS.modal.apply()}>
          <Toolbar
            isModal
            editorValue={value}
            setIsOpen={setIsOpen}
            isShowMiniMap={isShowMiniMap}
            monacoEditor={monacoEditorModal}
            setIsShowMiniMap={setIsShowMiniMap}
            currentMonacoOptions={currentMonacoOptions}
            setCurrentMonacoOptions={setCurrentMonacoOptions}
            readOnly={restProps.readOnly}
          />
          <CodeEditor
            value={isEscaping ? value.replaceAll('\\n', '\n') : value}
            showMiniMap={isShowMiniMap}
            containerStyles={styles.modalEditor}
            monacoOptions={currentMonacoOptions}
            onEditorDidMount={modalEditorDidMount}
            onChange={onChangeValue}
            onBlur={onBlurUpdate}
            {...restProps}
          />
        </div>
      </Modal>
    </>
  );
};
