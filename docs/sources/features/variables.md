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

Dashboard and global variables are replaced automatically in the following elements:

- URL for initial and update requests
- Header parameters' values
- Payload of the update request
- JavaScript code
- Sections names (starting from version 4.9.0)
- Form elements labels (starting from version 4.9.0)
- Button texts (starting from version 4.9.0)

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/var-sections-labels-buttons.png" class="border" alt="Use dashboard variables in the sections, labels, and button texts." >}}

Three types of variables are thoroughly explained in our [Grafana Crash Course](/grafana/variables).

## JavaScript code

```js
const formIcon = context.panel.elements.find(
  (element) => element.id === "icon"
);
formIcon.value = "$IconVar";
```

## Synchronize with dashboard variables

To demonstrate how Data Manipulation plugin can work with dashboard variables we created this [blog post](https://volkovlabs.io/blog/form-panel-use-variables-20240301/).

If you are a visual style learner, you can watch the video. It covers the same ground.

{{< youtube id="DW-yuSopejY" >}}
