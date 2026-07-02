/**
 * Test IDs for DatasourcePayloadEditor.
 *
 * Inlined from @volkovlabs/components TEST_IDS.payloadEditor.
 */
import { createSelector } from '../../test-utils/jest-selectors';

export const PAYLOAD_EDITOR_TEST_IDS = {
  loadingMessage: createSelector('data-testid payload-editor loading-message'),
  errorMessage: createSelector('data-testid payload-editor error-message'),
};
