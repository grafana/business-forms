---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Color Picker'
description: 'Learn about Color Picker in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Color Picker

The **Color Picker** allows to check color from palette.

- Color format. HEX or RGB

<Image
  title="Color Picker element."
  src="/img/plugins/business-forms/color-picker.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'colorPicker',
  labelWidth: 10,
  colorFormat: 'hex'
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
  type: "colorPicker",
  colorFormat: 'hex'
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
  Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'colorPicker'.

- ### `colorFormat`

  _number_. Required.  
  Color picker value output format. 'hex' | 'rgb'

<BaseParameters />

The `Color Picker` element does not support options for selection. However, they must be specified in the element object.

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "colorPicker",
  colorFormat: 'hex',
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
 Current element value.

- ### `type`

_string_. Required.  
 Element type: 'colorPicker'.

- ### `colorFormat`

  _number_. Required.  
  Color picker value output format. 'hex' | 'rgb'

<BaseOptionsParameters />
