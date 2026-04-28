# AGENTS.md — Business Forms Plugin (volkovlabs-form-panel)

Grafana panel plugin for inserting/updating data and modifying configuration via forms.
Frontend-only plugin (no Go backend). Node >= 24, TypeScript 5.8, React 18, Webpack 5.

## Build / Dev Commands

```bash
npm run build          # Production webpack build
npm run dev            # Watch-mode dev build
npm run start          # Docker compose dev environment (Grafana + servers)
npm run stop           # Tear down docker compose
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint (flat config, ESLint 9)
npm run lint:fix       # ESLint autofix
npm run spellcheck     # cspell across all source files (matches CI exactly)
```

## Test Commands

Unit tests use **Jest 30** with `@swc/jest`, `@testing-library/react`, and `jest-environment-jsdom`.
Tests are randomized and mocks are reset between tests.

```bash
npm test                        # Jest watch mode (changed files only)
npm run test:ci                 # Full suite, 4 workers, coverage

# Run a single test file
npx jest src/components/FormPanel/FormPanel.test.tsx

# Run tests matching a name pattern
npx jest --testNamePattern="Should display"

# Single file + name pattern
npx jest src/module.test.ts --testNamePattern="Should be instance"
```

E2E tests use **Playwright** with `@grafana/plugin-e2e`:

```bash
npm run test:e2e                # Playwright headless
npm run test:e2e:dev            # Playwright with UI
npm run test:e2e:docker         # Playwright in Docker container
```

## Critical Rules

- **Never modify anything inside `.config/`** — it is managed by Grafana plugin tooling.
- **Never change `id` or `type` in `src/plugin.json`** — changes to plugin.json require a Grafana server restart.
- When you need Grafana API docs, fetch from `https://grafana.com/developers/plugin-tools/llms.txt`.
- **Always update the PR summary** when pushing new commits to a PR.

## Project Structure

```text
src/
  components/       # PascalCase dirs, each with Component.tsx, .test.tsx, .styles.ts, index.ts
  constants/        # Shared constants including TEST_IDS (tests.ts)
  hooks/            # Custom React hooks (use* prefix)
  types/            # TypeScript types, interfaces, enums
  utils/            # Utility functions
  module.ts         # Plugin entry point
  plugin.json       # Plugin metadata
test/               # Playwright E2E tests
provisioning/       # Grafana provisioning for local dev
server-json/        # Test helper servers
server-pg/
```

## Path Aliases

`@/*` maps to `src/*`. Use it for non-relative imports within `src/`:

```ts
import { TEST_IDS } from '@/constants';
import { FormElementType } from '@/types';
import { toLocalFormElement } from '@/utils';
```

Use relative imports only for siblings/parents within the same component directory:

```ts
import { FormPanel } from './FormPanel';
import { FormElements } from '../FormElements';
```

## Import Ordering

1. External packages (`@emotion/css`, `@grafana/*`, `@volkovlabs/*`, `lodash`, `react`)
2. Path-aliased internal imports (`@/constants`, `@/hooks`, `@/types`, `@/utils`)
3. Relative imports (`./FormPanel`, `../FormElements`)

## Naming Conventions

| What                 | Convention                                            | Example                                 |
| -------------------- | ----------------------------------------------------- | --------------------------------------- |
| Component files/dirs | PascalCase                                            | `FormPanel/FormPanel.tsx`               |
| Non-component files  | kebab-case                                            | `form-element.ts`, `code-parameters.ts` |
| Components           | PascalCase                                            | `FormPanel`, `CustomCodeEditor`         |
| Types/Interfaces     | PascalCase                                            | `PanelOptions`, `FormElement`           |
| Enums                | PascalCase name, UPPER_SNAKE values                   | `FormElementType.BOOLEAN`               |
| Constants            | UPPER_SNAKE_CASE                                      | `TEST_IDS`, `FORM_ELEMENT_DEFAULT`      |
| Hooks                | camelCase, `use` prefix                               | `useAutoSave`, `useFormLayout`          |
| Barrel exports       | `index.ts` with `export * from './...'` per directory |                                         |

## Formatting & TypeScript

- **Prettier**: Print width 120, single quotes, trailing commas (es5), semicolons, 2-space indent, no tabs.
- **Strict mode** enabled. Use `const enum` for enums (see `FormElementType`).
- JSDoc block comments on all exported interfaces, types, functions, and their properties:

```ts
/**
 * Panel Options
 */
export interface PanelOptions {
  /**
   * Sync
   * @type {boolean}
   */
  sync: boolean;
}
```

## Component Pattern

Each component lives in `ComponentName/` with `ComponentName.tsx`, `.test.tsx`, `.styles.ts`, and `index.ts`.

Styles use Grafana's `useStyles2` hook with `@emotion/css`:

```ts
export const getStyles = (theme: GrafanaTheme2) => ({
  wrapper: css`
    display: flex;
  `,
});
// In component: const styles = useStyles2(getStyles);
```

## Testing Patterns

- Test IDs centralized in `src/constants/tests.ts` (`TEST_IDS` object).
- `@volkovlabs/jest-selectors` (`getJestSelectors`) for selector helpers.
- `@testing-library/react` (`render`, `screen`, `fireEvent`, `waitFor`, `act`).
- JSDoc block comments above mock sections: `/** * Mock Form Elements */`.
- `describe`/`it` blocks with descriptive labels.
- Factory function pattern: `getComponent(props)` to render with configurable props.
- Mock modules with `jest.mock()` at top of file, preserving real implementations where needed:

```ts
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
  getAppEvents: jest.fn(() => appEventsMock),
}));
```

## Error Handling

- Grafana notification APIs: `context.grafana.notifySuccess()`, `notifyError()`, `notifyWarning()`.
- `AppEvents` for event-bus error publishing. Wrap fetch/datasource requests in `try/catch`.
- No `console.log` or `console.error` — `no-console` is enforced as an error
- No `debugger` statements

## ESLint

Flat config (ESLint 9) at `eslint.config.mjs`, extending `@grafana/eslint-config/flat.js` and
`eslint-config-prettier`. Custom rule: `@typescript-eslint/no-empty-object-type: off`. Test files,
mocks, config files, and server dirs are excluded from linting.

### Markdown Lint

Always run `npx markdownlint-cli <file>` when updating
`.md` files and fix any issues before committing. This
includes `AGENTS.md`, `README.md`, and `CHANGELOG.md`.

### Additional Rules

- `no-console` and `no-debugger` are errors
- `@typescript-eslint/no-deprecated` is a warning — avoid
  using deprecated APIs
- Unused variables are errors (except rest siblings)
- Do not edit files in `.config/` — they are scaffolded
  by `@grafana/create-plugin`

## Changelog Policy

**Always update `CHANGELOG.md` when making changes.** Every commit that
modifies code, documentation, dependencies, or configuration must have a
corresponding entry in the changelog under the current unreleased version
section. Add entries as part of the same commit or as a follow-up commit
before pushing.

## Version Synchronization

When upgrading `@playwright/test`, also update the base image in `test/Dockerfile` to match:

```bash
# Check for mismatch:
node -e "console.log(require('./package.json').devDependencies['@playwright/test'])"
grep 'FROM mcr.microsoft.com/playwright' test/Dockerfile
```

The image tag must match the installed version exactly (e.g., `v1.59.1-noble` for `^1.59.1`).

## Branching Policy

- **Never commit directly to `main`**. Always create a new branch for changes.
- Use descriptive branch names (e.g., `feat/add-feature`, `fix/bug-description`).
- When pushing new commits to a PR, always update the PR summary to reflect all
  changes.
- **Do not commit automatically**. Only commit when explicitly asked.
- **Do not push automatically**. Only push when explicitly asked.
