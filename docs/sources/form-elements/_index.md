---
title: Form elements
description: Learn about the wide variety of form element types available in the Business Forms plugin to build web applications.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 30
---

# Form elements

The Business Forms plugin provides a wide variety of element types to meet almost any web application requirement.

{{< admonition type="note" >}}
All form elements (starting from version 4.9.0, including [sections](#sections)) can be created dynamically.
For more info, please refer to the [Dynamic Forms](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/features/dynamic-forms/) page of the Business Forms panel documentation.
{{< /admonition >}}

## Layout

You can choose from three layouts: **Basic**, **Buttons Only**, and **Sections**. To switch between them, open the **Layout** category.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/sections.png" class="border" alt="Layout can be Basic, Buttons Only, and Sections." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/layouts.png" class="border" alt="Form elements layout types." >}}

### Basic

In the **Basic** layout, all form elements are positioned vertically, one following another.

### Sections

With the **Sections** layout, you can create as many sections as needed and place sections either vertically or horizontally using the **Orientation** option.

When you select the **Sections** layout, controls for creating sections appear. For each section, you can specify an ID for later reference and a name that displays as the section label.

{{< admonition type="note" >}}

The **Collapsable** parameter has been supported starting from version 4.0.0.

{{< /admonition >}}

Sections can be collapsible. This functionality is available only for sections in the **Vertical** orientation. You can set any section to **Expanded** when the form opens or refreshes.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-forms/collapse.mp4" >}}

You can also control the **Expanded** and **Collapsed** states in **Custom code** by using the following commands:

```js
context.panel.expandSection(id);
context.panel.collapseSection(id);
```

{{< admonition type="note" >}}
The full list of the Business Form panel parameters can be found in the [Custom Code](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/#parameters) section of the panel's documentation.
{{< /admonition >}}

### Buttons Only

The **Buttons Only** layout displays only standard buttons on your form. The standard buttons include **Submit**, **Reset**, and **Save default**. This layout hides all panel options related to other form elements, which provides a cleaner edit mode.

## Add a form element

To add a form element, go to the **Form Elements** category. Specify the element ID, label, and type. After you click **Add Element**, you can configure additional element options.

Element types have specific options. For example, the **Text area** type includes a **Rows** option that controls the element size on the dashboard.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/add-form-element.png" class="border" alt="Form element in Edit mode." >}}

## Move a form element

{{< admonition type="note" >}}

Supported starting from the version 3.0.0.

{{< /admonition >}}

You can drag-and-drop form elements in the edit mode to change their order on the form.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/drag.png" class="border" alt="Drag-and-drop form elements in Edit mode." >}}

## Form element types

The following image shows all available element types before version 4.4.0:

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/elements-demo.png" class="border" alt="Form elements on UI." >}}

- [`Custom button`](/plugins/business-forms/elements/button/)
- [`Checkbox List with custom options`](/plugins/business-forms/elements/button/)
- [`Code Editor`](/plugins/business-forms/elements/code-editor/)
- [`Color Picker`](/plugins/business-forms/elements/button/)
- [`Date`](/plugins/business-forms/elements/date/)
- [`Date and Time`](/plugins/business-forms/elements/date-time/)
- [`File`](/plugins/business-forms/elements/file/)
- [`Link`](/plugins/business-forms/elements/link/)
- [`Multi-select with custom options`](/plugins/business-forms/elements/multi-select/)
- [`Number Input`](/plugins/business-forms/elements/number-input/)
- [`Number Slider`](/plugins/business-forms/elements/number-slider/)
- [`Password Input`](/plugins/business-forms/elements/password-input/)
- [`Radio Group with boolean options`](/plugins/business-forms/elements/radio-group-boolean-options/)
- [`Radio Group with custom options`](/plugins/business-forms/elements/radio-group-custom-options/)
- [`Read-only`](/plugins/business-forms/elements/read-only/)
- [`Read-only Text Area`](/plugins/business-forms/elements/read-only-text-area/)
- [`String Input`](/plugins/business-forms/elements/string-input/)
- [`Select with Custom options`](/plugins/business-forms/elements/select-with-options/)
- [`Text Area`](/plugins/business-forms/elements/text-area/)
- [`Time`](/plugins/business-forms/elements/time/)

## Common configuration

There are three form elements with select options.

- Multi Select with Custom Options
- Select with Custom Options
- Radio Group with Custom Options

All three have some options in common.

#### Icon

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/icons.png" class="border" alt="Optionally select an icon for this element." >}}

### Custom color and background color for elements

{{< admonition type="note" >}}

Element colors are supported starting from version 4.0.0.

{{< /admonition >}}

You can customize the following **Form Elements** colors:

- Background color
- Label background
- Label color

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/colors.png" class="border" alt="Color options" >}}

### Select options from a query

{{< admonition type="note" >}}

This feature is supported starting from version 3.2.1.

{{< /admonition >}}

You can reference a query from any configured data source to populate form elements dynamically. Specify the **Label** and **Value** fields.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/options-from-query.png" class="border" alt="Use values from the query for your types with select options." >}}

### Select options from GET Options code

{{< admonition type="note" >}}

This feature is supported starting from version 3.5.0.

{{< /admonition >}}

**Get Options Code** lets you hard code options using the code editor. The code must:

- Return an array with `{label,value}` objects.
- Be synchronous.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/options-from-code.png" class="border" alt="Use hard-coded values from the Get Options Code for your types with select options." >}}

### Set options received asynchronously

**Get Options Code** doesn't support asynchronous code. However, you can still work with options received asynchronously.

Complete the following steps:

#### Step 1: Initial request

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/initial-req-for-options.png" class="border" alt="Initial request to work with options received asynchronously." >}}

In the following example, the code finds the required element and updates its options. After the data is received, the element is updated using `context.panel.onChangeElements()`.

```js
const url = "https://jsonplaceholder.typicode.com/users";
const element = context.panel.elements.find(
  (element) => element.id === "select"
);

async function fetchData() {
  try {
    const response = await fetch(url);
    const body = await response.json();

    const optionsNew = body.map((element) => ({
      label: element.name,
      value: element.username,
    }));

    const newElement = {
      ...element,
      options: optionsNew,
    };
    const newElements = context.panel.elements.map((element) => {
      if (element.id === "select") {
        return newElement;
      }
      return element;
    });
    context.panel.onChangeElements(newElements);
  } catch (error) {
    console.log("Error:", error);
  }
}

return fetchData();
```

#### Step 2. Create the GET Options code

Set options for your element from `context.panel.elements`.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/set-options-from-code.png" class="border" alt="Get Options code for the Options received asynchronously" >}}

```js
const element = context.panel.elements.find(
  (element) => element.id === "select"
);

if (element?.options) {
  return element?.options;
}
```

### Custom Values

{{< admonition type="note" >}}

Available starting from version 4.9.0.

{{< /admonition >}}

If enabled, users can enter custom values in the **Select** and **Multi select** form element types.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-forms/select-multi-custom-value.mp4" >}}

## Conditional visibility

Every form element has a **Show If returned value is true** parameter where you can enter JavaScript code.

- If this code returns `true`, the element is shown on the panel.
- If this code returns `false`, the element is hidden from the panel.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/select.png" class="border" alt="Conditional visibility example." >}}

Example code to check the current value of the `select` element and show the `dateTime` element if the value equal to `max`:

```js
const select = context.panel.elements.find(
  (element) => element.id === "select"
);

if (select) {
  return select.value === "max";
}
```

{{< admonition type="note" >}}

Below is supported starting from the version 3.2.1.

{{< /admonition >}}

You can use dashboard and global variables in your JavaScript code.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/var.png" class="border" alt="Conditional visibility using a dashboard variable example." >}}

Example code to check the value of the dashboard variable `var`:

```js
const test = context.grafana.replaceVariables("$var");
return test === "test";
```

## Field mapping

{{< admonition type="note" >}}

This feature is supported starting from version 4.4.0.

{{< /admonition >}}

To map initial form element values, use the **Initial Fields** options category.

### Data source 4.4.0

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/field-name-ds-440.png" class="border" alt="Steps to configure the Initial Request for Data Source. New location of `Field Name` fields." >}}

### Query 4.4.0

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/field-name-query-440.png" class="border" alt="Explicitly specify the field-to-form element mapping for Query using Query Field. New location of Query Field fields since version 4.2.0" >}}

{{< admonition type="note" >}}

This feature is supported in versions 3.2.1 through 4.0.0.

{{< /admonition >}}

You can specify field-to-form mapping using the **Field name** parameter for **Data Source** or the **Query Field** parameter for **Query**.

### Data Source

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/field-name-ds.png" class="border" alt="Explicitly specify the field-to-form element mapping for Data Source using Field name." >}}

The `Field Name` option for each Form Element is located under the code editor when the data source option is enabled. Specify a field name for appropriate form element from the data source response.

### Query

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/field-name-query.png" class="border" alt="Explicitly specify the field-to-form element mapping for Query using Query Field." >}}

The `Query Field` option for each Form Element is located under the code editor when the Query option is enabled. Specify a field name for appropriate form element from the Query response.
