---
tags:
  - Business Forms
  - Release Notes
image: /img/suite.png
hide_table_of_contents: true
title: 'Release Notes'
description: 'Learn about Release Notes in Grafana'
labels:
  products:
    - enterprise
    - oss
weight: 90
---
import BlogPost from "@theme/BlogPost";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Release Notes

Track the progress of the Business Forms panel with these release notes, detailing new features, enhancements, fixes, and breaking changes across all versions.

<Tabs
  defaultValue="v6"
  values={[
    { label: "Version 6", value: "v6" },
    { label: "Version 5", value: "v5" },
    { label: "Version 4", value: "v4" },
    { label: "Version 3", value: "v3" },
    { label: "Version 2", value: "v2" },
    { label: "Version 1", value: "v1" },
  ]}
>
  <TabItem value="v6">
## 6.2.0 (2025-09-02)

This release updated race condition for initial request.

## 6.1.0 (2025-08-31)

This release updated ESLint configuration and Development Provisioning for improved code quality and setup.

## 6.0.0 (2025-07-21)

:::warning Breaking Changes
Requires Grafana 11 and Grafana 12.
:::

This release includes TimeZone option for Date element and upgrade to Grafana 12.0 with dependency updates.

</TabItem>

  <TabItem value="v5">
## 5.1.0 (2025-02-26)

This release introduces new features like the `isEscaping` option for text elements and streaming state support for data, alongside refactoring of form elements and updates to Grafana 11.5 with the latest dependencies.

## 5.0.0 (2024-12-23)

:::warning Breaking Changes
Dashboard variables in `Show If`, `Disabled`, and `Options` are now replaced automatically; `replaceVariables` function removed
:::

Version 5.0.0 brings significant updates including automatic replacement of dashboard variables, a new `color` form element, and enhancements to text handling and data source support, while updating to Grafana 11.4.0.

  </TabItem>
  <TabItem value="v4">
## 4.9.0 (2024-11-16)

This release focuses on improving functionality with new Code Editor languages, enhanced testing, and dynamic updates, while removing outdated components and updating data source handling.

<BlogPost id="form-panel-4.9.0" />

## 4.8.0 (2024-10-25)

Version 4.8.0 introduces a new Date form element, improves refresh mechanisms, and enhances error handling, alongside updates to Grafana 11.3.0.

## 4.7.0 (2024-10-08)

This update enhances form elements with custom input options, improved toolbar features, and better handling of initial fields and disabled elements.

## 4.6.0 (2024-09-28)

Version 4.6.0 improves initial value handling, adds usability features to the Code Editor, and enhances button customization options.

## 4.5.0 (2024-09-06)

This release focuses on improving timezone handling for date/time inputs and expanding variable support across various form components.

## 4.4.0 (2024-08-29)

Version 4.4.0 introduces expandable editors, enhances multi-selection capabilities, and improves error display for data source queries.

<BlogPost id="form-panel-4.4.0-20240829" />

## 4.3.1 (2024-08-16)

A minor update addressing a specific bug related to migration of nested object properties.

## 4.3.0 (2024-08-12)

This release adds new helpers for form elements, improves migration processes, and introduces a custom button element.

## 4.2.0 (2024-07-18)

Version 4.2.0 enhances testing pipelines, updates tutorials, and refines logic for handling initial and changed values in forms.

## 4.1.0 (2024-07-09)

This update improves migration processes, enhances checkbox functionality, and optimizes testing workflows with Docker.

<BlogPost id="form-panel-4.0.0-20240702" />

## 4.0.0 (2024-07-01)

:::warning Breaking Changes

- Requires Grafana 10 or 11
- Updated Data Source requests to use Query Editor
- Removed non-context code parameters; update to use `context`
  :::

:::info Migration Guide

- `data` → `context.panel.data`
- `elements` → `context.panel.elements`
- `initial` → `context.panel.initial`
- `initialRequest` → `context.panel.initialRequest`
- `locationService` → `context.grafana.locationService`
- `notifyError` → `context.grafana.notifyError`
- `notifySuccess` → `context.grafana.notifySuccess`
- `notifyWarning` → `context.grafana.notifyWarning`
- `onChange` → `context.panel.onChange`
- `onOptionsChange` → `context.panel.onOptionsChange`
- `options` → `context.panel.options`
- `replaceVariables` → `context.grafana.replaceVariables`
- `response` → `context.panel.response`
- `setInitial` → `context.panel.setInitial`
- `templateService` → `context.grafana.templateService`
- `toDataQueryResponse` → `context.utils.toDataQueryResponse`
  :::

A major release renaming the plugin to Business Forms, adding support for frontend data sources, and introducing significant enhancements like collapsible sections, while requiring Grafana 10 or 11.

    </TabItem>

  <TabItem value="v3">
## 3.8.0 (2024-05-30)

This release adds new form elements like Checkbox List, improves Code Editor functionality, and introduces comprehensive testing and provisioning examples.

## 3.7.0 (2024-03-10)

Version 3.7.0 focuses on compatibility with newer Grafana versions, enhances file upload capabilities, and refines custom code integration.

:::warning Breaking Changes
Requires Grafana 9.2 or 10
:::

## 3.6.0 (2024-01-10)

This update introduces backend service integration for custom code, enhances file encoding in payloads, and fixes issues with custom options.

## 3.5.0 (2024-01-04)

Version 3.5.0 adds new code-driven features like `disableIf`, enhances reset functionality, and improves code editor usability with suggestions.

## 3.4.0 (2023-12-14)

This release enhances customization with new code and payload options, improves panel syncing, and updates to Grafana 10.2.2.

<BlogPost id="form-panel-3.4.0-20240105" />

## 3.3.0 (2023-11-21)

Version 3.3.0 introduces new form elements, enhances custom code integration, and updates to Grafana 10.2.1 with improved editor features.

<BlogPost id="form-panel-3.3.0-20231203" />

## 3.2.1 (2023-09-07)

A minor update ensuring backward compatibility for option identifiers.

<BlogPost id="form-panel-3.2.1-20231010" />

## 3.2.0 (2023-09-06)

This release enhances form elements with new features like file uploads, data source mapping, and asynchronous code execution, alongside UI improvements.

## 3.1.0 (2023-08-13)

Version 3.1.0 introduces multi-select elements, conditional visibility, and enhanced custom code capabilities for payloads and resets.

<BlogPost id="form-panel-3.1.0-20230823" />

## 3.0.0 (2023-07-15)

:::warning Breaking Changes

- Requires Grafana 9 or 10
- Form elements now use local state, not saved to dashboard by default
- Refactoring of local states and elements may introduce breaking changes; test before production upgrade
  :::

A major update introducing local state for form elements, compatibility with Grafana 10, and new features like drag-and-drop editing, with breaking changes.

<BlogPost id="form-panel-3.0.0-20230715" />

  </TabItem>
  <TabItem value="v2">
## 2.8.0 (2023-03-16)

This release enhances form layouts, adds compatibility with Grafana 9.4.3, and introduces new request options and server API integrations.

<BlogPost id="form-panel-2.8.0-20230316" />

## 2.7.0 (2022-11-10)

Version 2.7.0 improves compatibility with Grafana 9.2.2, enhances payload flexibility, and adds status notifications for form submissions.

<BlogPost id="form-panel-2.7.0-20221110" />

## 2.6.0 (2022-10-23)

This update ensures compatibility with Grafana 9.1.6, adds data source initialization for elements, and introduces custom code for variable updates.

## 2.5.0 (2022-09-10)

Version 2.5.0 focuses on request header validation, panel reload capabilities, and compatibility with Grafana 9.1.4.

## 2.4.0 (2022-08-31)

This release enhances usability with variable support in URLs, introduces a playground server, and ensures compatibility with Grafana 9.1.1.

## 2.3.0 (2022-08-11)

:::warning Breaking Changes
Signed as a community plugin
:::

A minor update signing the plugin as a community plugin and enhancing documentation.

## 2.2.0 (2022-08-09)

This release adds compatibility with Grafana 9.0.6 and introduces data source integration for initial values and configurations.

## 2.1.0 (2022-07-17)

Version 2.1.0 enhances code editor functionality and updates documentation with tutorials for Grafana 9.0.3 compatibility.

## 2.0.0 (2022-06-17)

:::warning Breaking Changes
Requires Grafana 8.3 or 9
:::

A major update ensuring compatibility with Grafana 8.3 and 9, with breaking changes for older versions.

  </TabItem>
  <TabItem value="v1">
## 1.4.0 (2022-05-30)

This release introduces usability features like element width updates, value change highlighting, and form submission confirmations.

## 1.3.0 (2022-05-22)

Version 1.3.0 enhances form layouts with sections, adds code editor support for configurations, and improves UI feedback.

## 1.2.0 (2022-05-19)

This update improves form element customization with label widths, tooltips, and server API integration for feedback dashboards.

## 1.1.0 (2022-05-12)

Version 1.1.0 introduces new form element types, variable support, and enhanced customization options for headers and layouts.

## 1.0.0 (2022-05-11)

The initial release of the Business Forms panel, based on the Volkov Labs panel template, marking the foundation for future enhancements.

  </TabItem>
</Tabs>
