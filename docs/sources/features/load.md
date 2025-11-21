---
tags:
  - Business Forms
image: /img/plugins/business-forms/data-manipulation-flow.png
title: 'Load Indication'
description: 'Learn about Load Indication in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Load indication

If the data loading takes time, the Data Manipulation form will indicate that as follows.

## Initial Request

The end user will see a running blue line at the top of the form.

<Image
  title="A moving blue line indicates an initial request being in progress."
  src="/img/blog/2023-10-10-form-panel-3.2.1/status-initial.png"
/>

## Update Request

All buttons are disabled and moving circled dots are placed instead of the Submit button icon.

<Image
  title="Dots moving in a circle indicate an update request being in progress."
  src="/img/blog/2023-10-10-form-panel-3.2.1/status-update.png"
/>

## Custom Code

Custom code can be asynchronous. For that, the custom code should return the `Promise`.

```js
const getInitialData = async () => {
  const response = await fetch("http://123");

  const data = await response.json();

  /**
   * Update Elements with data
   */
  context.panel.onChange([]);
};

/**
 * Return Promise
 */
return getInitialData();
```
