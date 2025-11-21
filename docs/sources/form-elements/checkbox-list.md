---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Checkbox List with custom options'
description: 'Learn how to create multi-selection checkbox list elements with custom options in the Business Forms panel.'
labels:
  products:
    - enterprise
    - oss
---

# Checkbox List with custom options

The **Checkbox list with custom options** type allows to creation of multi-selection checkmark elements.

<Image
  title="Checkbox list with custom options."
  src="/img/blog/2024-07-02-form-panel-4.0.0/checkbox.png"
/>

Specific for this element are the following options:

- User options.

To add an option click the 'Add option' button and then specify an option type (number or string), value, and label.

<Image
  title="Checkbox list with custom options."
  src="/img/blog/2024-07-02-form-panel-4.0.0/checkbox-options.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'checkboxList',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: [],
  disabled: false,
  background: '',
  labelBackground:'',
  labelColor: '',
  optionsSource:'Custom',
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
 * Element example
 */
const element = {
  uid: "uid-123",
  id: "id-123",
  title: "Element",
  type: "checkboxList",
  labelWidth: 15,
  width: 30,
  tooltip: "",
  section: "",
  unit: "",
  value: [],
  background: "",
  labelBackground: "",
  optionsSource: "Custom",
  labelColor: "",
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ],
  },
};

const elementsForUI = [];
elementsForUI.push(element);

context.panel.onChangeElements(elementsForUI);
```

<BaseChangeElements />

<!-- {{< docs/shared lookup="base-change-elements-example.md" source="business-forms" version="<PLUGINS_VERSION>" >}} -->

## Element Parameters

- ### `value`

  _Array_. Optional.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'checkboxList'.

- ### `optionsSource`

  _string_. Required.  
  Element options source: 'Query' | 'Custom' | 'Code'.

<BaseParameters />

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'string',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: [],
  showIf: '',
  disableIf: '',
  fieldName: '',
  queryField: {},
  optionsSource: '',
  queryOptions: {},
  options: [],
  getOptions: '',
  background: '',
  labelBackground:'',
  labelColor: '',
  hidden: false,
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

- ### `type`

  _string_. Required.  
  Element type: 'checkboxList'.

- ### `optionsSource`

  _string_. Required.  
  Element options source: 'Query' | 'Custom' | 'Code'.

<BaseOptionsParameters />

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
