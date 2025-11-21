---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Number Input'
description: 'Learn how to use the number input form element with configurable minimum and maximum value constraints.'
labels:
  products:
    - enterprise
    - oss
---

# Number Input

The **Number Input** is a text box where users enter a number manually.

Specific for this element are the following options:

- Min. Sets the minimum allowed input number.
- Max. Sets the maximum allowed input number.

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'number',
  min: 0,
  max: 10,
  labelWidth: 10,
  width: 30,
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
  type: "number",
  min: 0,
  max: 10,
  labelWidth: 15,
  width: 150,
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

  _number_ | _null_. Required.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'number'.

- ### `min`

  _number_. Optional.  
   Sets the minimum allowed input number

- ### `max`

  _number_. Optional.  
   Sets the maximum allowed input number

<BaseParameters />

The `Number Input` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'number',
  min: 0,
  max: 10,
  labelWidth: 10,
  width: 35,
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

  _number_ | _null_. Required.  
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'number'.

- ### `min`

  _number_. Optional.  
   Sets the minimum allowed input number

- ### `max`

  _number_. Optional.  
   Sets the maximum allowed input number

<BaseOptionsParameters />
