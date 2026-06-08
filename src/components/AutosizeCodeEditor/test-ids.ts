/**
 * Test IDs for AutosizeCodeEditor.
 *
 * Inlined from @volkovlabs/components TEST_IDS.codeEditor.
 */
import { createSelector } from '../../test-utils/jest-selectors';

export const CODE_EDITOR_TEST_IDS = {
  copyButton: createSelector(() => `data-testid code-editor copy-button`),
  copyPasteText: createSelector(() => `data-testid code-editor copy-paste-text`),
  modal: createSelector(() => `data-testid code-editor modal-window`),
  miniMapButton: createSelector(() => `data-testid code-editor mini-map-button`),
  modalButton: createSelector((name: unknown) => `data-testid code-editor modal-button-${name}`),
  pasteButton: createSelector(() => `data-testid code-editor paste-button`),
  wrapButton: createSelector(() => `data-testid code-editor wrap-button`),
};
