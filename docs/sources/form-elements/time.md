---
title: Time
description: Learn how to use the time form element for scenarios where only time selection is needed without a date.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Time

{{< admonition type="note" >}}

The **Time** type is available starting from version 3.8.0.

{{< /admonition >}}

If date is irrelevant to your scenario, you can select the **Time** type instead of **Date** or **Date and Time**.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/time-element.png" max-width="300px" class="border" alt="Time element" >}}

## Change Elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'time',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: '',
  disabled: false,
  background: '',
  labelBackground:'',
  labelColor: '',
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [],
  }
}
```

### Code example

```javascript
/**
 * Hardcoded element
 */
const element = {
  uid: "uid-123",
  id: "element-123",
  title: "Element",
  type: "time",
  labelWidth: 15,
  width: 150,
  tooltip: "",
  section: "",
  unit: "",
  value: "",
  background: "",
  labelBackground: "",
  labelColor: "",
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [],
  },
};

const elementsForUI = [];
elementsForUI.push(element);

context.panel.onChangeElements(elementsForUI);
```

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element parameters

- ### `value`

  _string_. Optional.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'time'.

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The Date element does not support options for selection. However, they must be specified in the element object

## Change Options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'time',
  min: '',
  max: '',
  labelWidth: 10,
  width: 35,
  tooltip: '',
  section: '',
  unit: '',
  value: '',
  showIf: '',
  disableIf: '',
  fieldName: '',
  queryField: {},
  background: '',
  labelBackground:'',
  labelColor: '',
}
```

### Code example

```javascript
context.panel.onOptionsChange({
  ...context.panel.options,
  elements: context.panel.options.elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  }),
});
```

```javascript
const formElements = JSON.parse(
  context.panel.data.series[0].fields[0].values[0]
);

context.panel.onOptionsChange({
  ...context.panel.options,
  elements: formElements,
});
```

- ### `value`

  _string_. Optional.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'time'.

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
