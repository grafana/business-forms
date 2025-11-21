---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Multi-select with custom options'
description: 'Learn about Multi-select with custom options in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Multi Select with Custom Options

The **Multi-select with custom options** is a dropdown where users can select one or many options.

Specific for this element are the following options:

- User options.

To add an option click the 'Add option' button and then specify an option type (number or string), value, label and select an icon from the given list.

<Image
  title="Add custom options for the multi-select custom type."
  src="/img/plugins/business-forms/multi.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'multiselect',
  allowCustomValue:true,
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
  type: "multiselect",
  optionsSource: "Custom",
  allowCustomValue: true,
  labelWidth: 15,
  width: 40,
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
    getOptions: () => [{ value: 11, label: "11" }],
  },
};

const elementsForUI = [];
elementsForUI.push(element);

context.panel.onChangeElements(elementsForUI);
```

```javascript
/**
 * Hardcoded element with multi values
 */
const element = {
  uid: "uid-123",
  id: "element-123",
  title: "Element",
  type: "multiselect",
  optionsSource: "Custom",
  allowCustomValue: true,
  labelWidth: 15,
  width: 40,
  tooltip: "",
  section: "",
  unit: "",
  value: [11, 22],
  background: "",
  labelBackground: "",
  labelColor: "",
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [
      { value: 11, label: "11" },
      { value: 22, label: "22" },
      { value: 33, label: "33" },
    ],
  },
};

const elementsForUI = [];
elementsForUI.push(element);

context.panel.onChangeElements(elementsForUI);
```

<BaseChangeElements />

## Element Parameters

- ### `value`

  _Array_. Optional.  
   Current element value.

```js
{
  value: [11, 22];
}
```

- ### `type`

  _string_. Required.  
  Element type: 'multiselect'.

- ### `optionsSource`

  _string_. Required.  
  Element options source: 'Query' | 'Custom' | 'Code'.

- ### `allowCustomValue`

  _boolean_. Required.  
  Allow add custom values

<BaseParameters />

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "multiselect",
  optionsSource: "Custom",
  queryOptions: {},
  options: [],
  getOptions: '',
  allowCustomValue: true,
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

  _Array_. Optional.  
   Current element value.

```js
{
  value: [11, 22];
}
```

- ### `type`

  _string_. Required.  
  Element type: 'multiselect'.

- ### `optionsSource`

  _string_. Required.  
  Element options source: 'Query' | 'Custom' | 'Code'.

- ### `allowCustomValue`

  _boolean_. Required.  
  Allow add custom values

- ### `getOptions`

  _string_. Optional.  
   "getOptions" function of the element returns options for list. Use for `optionsSource: 'Code'`.

  ```js
  {
    getOptions: "return [{value:1,label:'1'}]";
  }
  ```

- ### `queryOptions`

  _object_. Optional.  
   Return options from query. Use for `optionsSource: 'Query'`.

  Parameters:

  - `source`  
     _string_. Frame refId

  - `value`  
     _string_. Field name

  - `label`  
     _string_. Field name

- ### `options`

  _array_. Optional.  
  Return options for checkbox list.

  Each option contain following property

  - `value`.  
    _String_. Required.
    Option value

  - `label`.  
    _String_. Required.
    Option label

<BaseOptionsParameters />
