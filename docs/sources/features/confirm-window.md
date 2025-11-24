---
title: Confirmation window
description: Learn how to configure and customize the confirmation window to highlight changes before submitting form updates.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Confirmation window

When enabled, the confirmation window displays after you click the submit button. It highlights the changes you made in the Business Form.

{{< admonition type="note" >}}

Custom confirmation window labels have been supported starting from version 3.3.0.

{{< /admonition >}}

You can customize all labels using the **Update Confirmation Window** category.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/confirm-update.png" class="border" alt="Customize confirmation window labels." >}}

## Display Values parameter

{{< admonition type="note" >}}

The **Display Values** parameter is supported starting from version 4.0.0.

{{< /admonition >}}

The **Display Values** parameter has two options:

- **All values**: Shows all data elements, regardless of whether their values changed.
- **Updated Only**: Shows only the data elements with changed values.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/display-values.png" class="border" alt="Display Values parameter." >}}
