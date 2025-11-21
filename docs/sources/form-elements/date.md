---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Date'
description: 'Learn about Date in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Date

:::info Version

The **Date** type is available starting from version 4.9.0.

:::

If time is irrelevant to your scenario, instead of **Date and time**, you can select **Date** type.

<Image
  title="Date and Date and time types."
  src="/img/blog/2024-11-30-form-panel-4.9.0/date-type.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'date',
  min: '',
  max: '',
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
  type: "date",
  min: "",
  max: "",
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

<BaseChangeElements />

## Element Parameters

- ### `value`

  _string_. Optional.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'date'.

- ### `min`

  _string_. Optional.  
   Min available date. Format: '2025-01-28T08:07:37.359Z'

- ### `max`

  _string_. Optional.  
   Max available date. Format: '2025-01-28T08:07:37.359Z'

<BaseParameters />

The Date element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'date',
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
  Element type: 'date'.

- ### `min`

  _string_. Optional.  
   Min available date. Format: '2025-01-28T08:07:37.359Z'

- ### `max`

  _string_. Optional.  
   Max available date. Format: '2025-01-28T08:07:37.359Z'

<BaseOptionsParameters />
