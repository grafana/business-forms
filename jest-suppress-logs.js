/**
 * Silence the i18next/Locize marketing banner that prints once per init
 * during tests. Keep other console.info output intact.
 *
 * This file runs via setupFiles (before setupFilesAfterEnv) so the override
 * is in place before i18next initializes during module loading.
 */
const originalConsoleInfo = console.info;
console.info = (...args) => {
  const message = args.map((arg) => (typeof arg === 'string' ? arg : '')).join(' ');
  if (message.includes('i18next is made possible') || message.includes('Locize')) {
    return;
  }
  originalConsoleInfo(...args);
};
