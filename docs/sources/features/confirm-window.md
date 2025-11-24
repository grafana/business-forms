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

The Confirmation window, if enabled, is shown after a user clicks the submit button to highlight changes made in the Business Form.

{{< admonition type="note" >}}

Custom confirmation window labels have been supported starting from version 3.3.0.

{{< /admonition >}}

You can customize all labels using the **Update Confirmation Window** category.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/confirm-update.png" class="border" alt="Customize confirmation window labels." >}}

## Display Values parameter

{{< admonition type="note" >}}

The **Display Values** parameter has been supported starting from version 4.0.0.

{{< /admonition >}}

The **Display Values** parameter has two options to choose from:

- **All values** to always show all data elements regardless if there was any change in values.
- **Updated Only** to show only the data elements with changed values.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/display-values.png" class="border" alt="Display Values parameter." >}}
