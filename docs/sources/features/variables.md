---
title: Variables
description: Learn how dashboard and global variables are automatically replaced in URLs, headers, payloads, JavaScript code, and form elements.
keywords:
  - business forms
  - variables
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Variables

Business Forms automatically replaces dashboard and global variables in the following elements:

- URLs for initial and update requests
- Header parameter values
- Update request payloads
- JavaScript code
- Section names (starting from version 4.9.0)
- Form element labels (starting from version 4.9.0)
- Button text (starting from version 4.9.0)

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/var-sections-labels-buttons.png" class="border" alt="Use dashboard variables in the sections, labels, and button texts." >}}

Three types of variables are thoroughly explained in the [Grafana Crash Course](/grafana/variables).

## JavaScript code

```js
const formIcon = context.panel.elements.find(
  (element) => element.id === "icon"
);
formIcon.value = "$IconVar";
```

## Synchronize with dashboard variables

For information about how Business Forms works with dashboard variables, refer to this [blog post](https://volkovlabs.io/blog/form-panel-use-variables-20240301/).

The following video covers the same content.

{{< youtube id="DW-yuSopejY" >}}
