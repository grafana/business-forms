---
title: Dynamic forms
description: Learn how to update form elements, values, and options dynamically from any data source using custom code.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# Dynamic forms

With custom code, you can update form elements or their values and options from any data source.

{{< youtube id="RSVH1bSBNl8" >}}

## Select options

Define options of the `icon` element from the `icons` series with the `icon_id` and `title` columns

```js
const icons = context.panel.data.series.find(
  (serie) => serie.refId === "icons"
);
const iconSelect = context.panel.elements.find(
  (element) => element.id === "icon"
);

if (icons?.fields.length) {
  const ids =
    icons.fields.find((f) => f.name === "icon_id").values.buffer ||
    icons.fields.find((f) => f.name === "icon_id").values;
  const titles =
    icons.fields.find((f) => f.name === "title").values.buffer ||
    icons.fields.find((f) => f.name === "title").values;

  iconSelect.options = titles.map((value, index) => {
    return { label: value, value: ids[index] };
  });
}

context.panel.onOptionsChange(options);
```

## Update elements from data sources

{{< admonition type="note" >}}

The `context.panel.onOptionsChange()` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.onOptionsChange()` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

<Image
  title="Disable Synchronize with data to avoid endless reloading of the panel if onOptionsChange() is used in the initial request."
  src="/img/plugins/business-forms/infinity-reload.png"
/>

```js
const feedback = context.panel.data.series.find(
  (serie) => serie.refId === "Feedback"
);
const typeOptions = context.panel.data.series.find(
  (serie) => serie.refId === "Types"
);

if (feedback?.fields.length) {
  const ids =
    feedback.fields.find((f) => f.name === "id").values.buffer ||
    feedback.fields.find((f) => f.name === "id").values;
  const titles =
    feedback.fields.find((f) => f.name === "title").values.buffer ||
    feedback.fields.find((f) => f.name === "title").values;
  const types =
    feedback.fields.find((f) => f.name === "type").values.buffer ||
    feedback.fields.find((f) => f.name === "type").values;

  /**
   * Set Elements
   */
  const elements = ids.map((id, index) => {
    return { id, title: titles[index], type: types[index] };
  });

  /**
   * Find Type element
   */
  const typeSelect = elements.find((element) => element.id === "type");
  if (typeSelect && typeOptions?.fields.length) {
    const labels =
      typeOptions.fields.find((f) => f.name === "label").values.buffer ||
      typeOptions.fields.find((f) => f.name === "label").values;
    const values =
      typeOptions.fields.find((f) => f.name === "value").values.buffer ||
      typeOptions.fields.find((f) => f.name === "value").values;

    /**
     * Update Types
     */
    typeSelect.options = labels.map((label, index) => {
      return { label, value: values[index] };
    });
  }

  /**
   * Update Panel Options
   */
  context.panel.onOptionsChange({ ...context.panel.options, elements });
}
```

## Dynamic Business Forms

The Business Forms can be created dynamically following the code-specified configuration.
You can find more details in this [blog post](https://volkovlabs.io/blog/form-panel-server-based-elements-20240428/).

## Sections

{{< admonition type="note" >}}

Starting from version 4.9.0, **Sections** can be created dynamically as well.

{{< /admonition >}}

In addition to simple forms, you can create [sections](/plugins/business-forms/form-elements/#sections) dynamically.

In the example below, the data about the required sections comes from the data source. In this case, we use the [Business Input](/plugins/business-input/) data source to create a basic data frame containing section information, such as ID and name.

Next, the **Sections** and **Form Elements** categories are shown as not configured.

In the **Initial Request** category, the **Initial Action** is set to **Code**.

<Image
  title="Create sections dynamically. Example."
  src="/img/blog/2024-11-30-form-panel-4.9.0/dyn-sec-how.png"
/>

The JavaScript from the example above:

```JavaScript
const ids = context.panel.data.series[0].fields[0].values
const names = context.panel.data.series[0].fields[1].values

const sections = ids.map((item, index) => ({
  id: item,
  name: names[index]
}))

context.panel.sectionsUtils.add({ name: sections[0].name, id: sections[0].id, elements: [] })
context.panel.sectionsUtils.add({ name: sections[1].name, id: sections[1].id, elements: [] })
context.panel.sectionsUtils.add({ name: sections[2].name, id: sections[2].id, elements: [] })

```

Find more available commands and code snippets in the [Panel Parameters](/plugins/business-forms/code/panel/) sections of the Business Forms panel documentation.
