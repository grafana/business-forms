/**
 * Inlined from @volkovlabs/components AutosizeCodeEditor.styles.ts.
 */
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => {
  return {
    line: css`
      margin: 0 0;
      border: 1px solid ${theme.colors.border.medium};
      border-bottom: 0;
      background: ${theme.colors.background.secondary};
      padding: ${theme.spacing(0.5)};
    `,
    modal: css`
      width: 80%;
      height: 80%;
    `,
    content: css`
      padding: ${theme.spacing(1)};
      height: 100%;
    `,
    modalBody: css`
      height: 100%;
    `,
    modalIconLine: css`
      margin: ${theme.spacing(0.5)} 0 0 ${theme.spacing(0.5)};
    `,
    modalEditor: css`
      height: 100%;
      border-radius: 2px;
      border: 1px solid ${theme.colors.border.medium};
    `,
    copyPasteSection: css`
      margin: ${theme.spacing(0.5)} 0 0 ${theme.spacing(1)};
    `,
    copyPasteIcon: css`
      margin: ${theme.spacing(0)};
    `,
    copyPasteText: css`
      margin: ${theme.spacing(0)};
      font-size: 12px;
      color: ${theme.colors.text.secondary};
      transition: width 0.5s ease;
    `,
    text: css`
      position: absolute;
      left: -20%;
      opacity: 0;
      top: 8px;
      transition:
        left 0.5s ease,
        opacity 0.5s ease;
    `,
    left: css`
      left: 0;
      opacity: 1;
    `,
  };
};
