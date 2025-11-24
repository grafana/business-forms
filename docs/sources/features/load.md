---
title: Load indication
description: Learn how the Business Forms panel indicates loading progress during initial and update requests.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Load indication

When data loading takes time, the Business Forms panel displays loading indicators.

## Initial request

A moving blue line displays at the top of the form.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/status-initial.png" class="border" alt="A moving blue line indicates an initial request being in progress." >}}

## Update request

All buttons are disabled and moving circular dots display in place of the Submit button icon.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/status-update.png" class="border" alt="Dots moving in a circle indicate an update request being in progress." >}}

## Custom code

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
