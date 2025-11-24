---
title: Radio Group with boolean options
description: Learn how to use the radio group form element that provides a choice between True and False values.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# Radio Group with boolean options

The **Radio Group with boolean options** provides a user with a choice between True and False.

This type does not have any specific options.

## Change Elements Model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'boolean',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: true,
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
  type: "boolean",
  labelWidth: 15,
  width: 150,
  tooltip: "",
  section: "",
  unit: "",
  value: true,
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

## Element Parameters

- ### `value`

  _boolean_. Required.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'boolean'.

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The `Radio Group with boolean options` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: "boolean",
  labelWidth: 10,
  width: 35,
  tooltip: '',
  section: '',
  unit: '',
  value: true,
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

  _boolean_. Required.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'boolean'.

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
