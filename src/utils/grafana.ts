import { Field } from '@grafana/data';

/**
 * Get Field Values
 * @param field
 */
export const getFieldValues = (field?: Field): unknown[] => {
  if (!field) {
    return [];
  }

  return Array.from(field.values);
};
