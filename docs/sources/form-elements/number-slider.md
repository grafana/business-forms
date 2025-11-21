---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Number Slider'
description: 'Learn about Number Slider in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Number Slider

The **Number Slider** is a horizontal line with a toggle that a user can drag left and right with a mouse. Alternatively, the user can enter the integer number manually.

Specific for this element are the following options:

- Min. Sets the minimum allowed input number.
- Max. Sets the maximum allowed input number.
- Step. Sets the value of every move the toggle makes.

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'slider',
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 10,
  width: null,
  tooltip: '',
  section: '',
  unit: '',
  value: 5,
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
  type: "slider",
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 15,
  width: null,
  tooltip: "",
  section: "",
  unit: "",
  value: 5,
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

  _number_. Required.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'slider'.

- ### `min`

  _number_. Required.  
   Sets the minimum allowed number

- ### `max`

  _number_. Required.  
   Sets the maximum allowed number

- ### `step`

  _number_. Required.  
   Sets the value of every move the toggle makes.

<BaseParameters />

### Note

**width** , set to null for correct slider position.

The `Number Slider` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'slider',
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 10,
  width: null,
  tooltip: '',
  section: '',
  unit: '',
  value: 5,
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

  _number_. Required.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'slider'.

- ### `min`

  _number_. Required.  
   Sets the minimum allowed number

- ### `max`

  _number_. Required.  
   Sets the maximum allowed number

- ### `step`

  _number_. Required.  
   Sets the value of every move the toggle makes.

<BaseOptionsParameters />

### Note

**width** , set to null for correct slider position.
