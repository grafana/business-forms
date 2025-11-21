---
title: Form Elements
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
# Form Elements

The Business Forms plugin is equipped with a wide variety of element types to cover almost any imaginable web application requirements.

:::info
All form elements (starting from version 4.9.0, including [sections](/plugins/business-forms/form-elements/#sections)) can be created dynamically.
For more info, please refer to the [Dynamic Forms](/plugins/business-forms/dynamic/) page of the Business Forms panel documentation.
:::

## Layout

You have a choice of three layouts - **Basic**, standard **Buttons Only**, and **Sections**. To switch between them open the Layout category.

<Image
  title="Layout can be Basic, Buttons Only, and Sections."
  src="/img/plugins/business-forms/sections.png"
  width="80%"
/>

<Image
  title="Form elements layout types."
  src="/img/plugins/business-forms/layouts.png"
/>

### Basic

In the **Basic** layout, all form elements are positioned vertically, one following another.

### Sections

With the **Sections** layout, you can create as many sections as needed and place sections either vertically or horizontally using the **Orientation** option.

As shown in the picture above, when the layout **Sections** is chosen, the controls to create sections appear. For every section you can specify an ID, to use for referencing later, and a name which will be a displayed as a section label.

:::info Version

The **Collapsable** parameter has been supported starting from version 4.0.0.

:::

Sections can be collapsible. This functionality is available only for the sections in the **Vertical** orientation. You can make any section **Expanded** for the form opening/refresh.

<Image
  title="Collapsible sections."
  src="/img/blog/2024-07-02-form-panel-4.0.0/collapse.gif"
/>

In addition, you can control the **Expanded** and **Collapsed** states in the **Custom code** using the following commands:

```js
context.panel.expandSection(id);
context.panel.collapseSection(id);
```

:::info Parameters
The full list of the Business Form panel parameters can be found in the [Custom Code](/plugins/business-forms/code/#parameters) section of the panel's documentation.
:::

### Buttons Only

The standard **Buttons Only**, as the name implies, keeps only standard buttons on your form. The standard buttons include **Submit**, **Reset**, and **Save default**. With this layout, all panel options related to other form elements are hidden, which gives a cleaner Edit mode to work with.

## Add a form element

Go to the **Form Elements** category to add a form element. Start by specifying ID, label, and type. After you click the **Add Element** button, more element options are available to configure.

Element types have specific options. For instance, the **Text area** type has **Rows** to regulate the element size on the dashboard.

<Image
  title="Form element in Edit mode."
  src="/img/plugins/business-forms/add-form-element.png"
/>

## Move a form element

:::info Version

Supported starting from the version 3.0.0.

:::

You can drag-and-drop form elements in the edit mode to change their order on the form.

<Image
  title="Drag-and-drop form elements in Edit mode."
  src="/img/plugins/business-forms/drag.png"
/>

## Form element types

The picture below illustrates all available element types prior to the version 4.4.0

<Image
  title="Form elements on UI."
  src="/img/plugins/business-forms/elements-demo.png"
  width="60%"
/>

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

<Image
  title="Optionally select an icon for this element."
  src="/img/plugins/business-forms/icons.png"
/>

### Custom color/background color for elements

:::info Version

Colors for elements supported starting from version 4.0.0.

:::

You can play with **Form Elements** colors. Configurable are:

- Background color,
- Label background,
- Label color.

<Image
  title="Color options"
  src="/img/blog/2024-07-02-form-panel-4.0.0/colors.png"
/>

### Select Options from Query

:::info Version

Below is supported starting from the version 3.2.1.

:::

Reference a query from any configured data source to populate form elements dynamically.
You can specify the **Label** and **Value** fields.

<Image
  title="Use values from the query for your types with select options."
  src="/img/blog/2023-12-03-form-panel-3.3.0/options-from-query.png"
/>

### Select Options from Get Options Code

:::info Version

Below is supported starting from the version 3.5.0.

:::

**Get Options Code** allows to hard code options using the code editor. The code must:

- return array with `{label,value}` objects,
- be synchronous.

<Image
  title="Use hard-coded values from the Get Options Code for your types with select options."
  src="/img/blog/2023-12-03-form-panel-3.3.0/options-from-code.png"
/>

### Set Options received asynchronously

The **Get Options Code** does not support asynchronous code. However, you still can work with options received asynchronously.

It could be done in two steps:

#### Step 1. **Initial Request**.

<Image
  title="Initial request to work with options received asynchronously."
  src="/img/blog/2023-12-03-form-panel-3.3.0/initial-req-for-options.png"
/>

In the example below, we find a necessary element and update its options. Once the data has been received, we update the element using `context.panel.onChangeElements()`.

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

#### Step 2. Create the GET Options Code

Set options for your element from `context.panel.elements`.

<Image
  title="Get Options code for the Options received asynchronously"
  src="/img/blog/2023-12-03-form-panel-3.3.0/set-options-from-code.png"
/>

```js
const element = context.panel.elements.find(
  (element) => element.id === "select"
);

if (element?.options) {
  return element?.options;
}
```

### Custom Values

:::info Version

Available starting from version 4.9.0.

:::

If allowed, users can enter custom values into the **Select** and **Multi select** form element types

<Image
  title="If allowed users can enter custom values into the Select and Multi select form element types."
  src="/img/blog/2024-11-30-form-panel-4.9.0/select-multi-custom-value.gif"
/>

## Conditional Visibility

Every form element has the <b>Show If returned value is true</b> parameter where you enter JavaScript code.

- If this code returns `true`, the element is shown on the panel.
- If this code returns `false`, the element is hidden from the panel.

<Image
  title="Conditional visibility example."
  src="/img/blog/2023-10-10-form-panel-3.2.1/select.png"
/>

Example code to check the current value of the `select` element and show the `dateTime` element if the value equal to `max`:

```js
const select = context.panel.elements.find(
  (element) => element.id === "select"
);

if (select) {
  return select.value === "max";
}
```

:::info Version

Below is supported starting from the version 3.2.1.

:::

You can use the dashboard and global variables within your JavaScript code.

<Image
  title="Conditional visibility using a dashboard variable example."
  src="/img/blog/2023-10-10-form-panel-3.2.1/var.png"
/>

Example code to check the value of the dashboard variable `var`:

```js
const test = context.grafana.replaceVariables("$var");
return test === "test";
```

## Field Mapping

:::info Version

Below is supported starting from 4.4.0

:::

To map the Initial Form Elements values, use the **Initial Fields** options category.

### Data source 4.4.0

<Image
  title="Steps to configure the Initial Request for Data Source. New location of `Field Name` fields."
  src="/img/blog/2024-08-29-form-panel-4.4.0/field-name-ds-440.png"
/>

### Query 4.4.0

<Image
  title="Explicitly specify the field-to-form element mapping for Query using Query Field. New location of Query Field fields since version 4.2.0"
  src="/img/blog/2024-08-29-form-panel-4.4.0/field-name-query-440.png"
/>

:::info Version

Below is supported starting from version 3.2.1 to version 4.0.0

:::

Using the **Field name** parameter for **Data Source** and the **Query Field** for **Query**, you can specify field-to-form mapping.

### Data Source

<Image
  title="Explicitly specify the field-to-form element mapping for Data Source using Field name."
  src="/img/blog/2023-10-10-form-panel-3.2.1/field-name-ds.png"
/>

The `Field Name` option for each Form Element is located under the code editor when the data source option is enabled. Specify a field name for appropriate form element from the data source response.

### Query

<Image
  title="Explicitly specify the field-to-form element mapping for Query using Query Field."
  src="/img/blog/2023-10-10-form-panel-3.2.1/field-name-query.png"
/>

The `Query Field` option for each Form Element is located under the code editor when the Query option is enabled. Specify a field name for appropriate form element from the Query response.
