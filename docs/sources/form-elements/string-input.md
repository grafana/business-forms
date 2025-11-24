---
title: String Input
description: Learn how to use the string input form element for manual text entry with optional visibility controls.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# String Input

The **String Input** is a text box where a user manually enters a string value.

Specific for this element are the following options:

- A visual control, a button, to make the element hidden.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/element.png" class="border" alt="String input element" >}}

## Change Elements Model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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
 * Hardcoded example with type string
 */
const stringElement = {
  uid: "uid-123",
  id: "string-123",
  title: "String element",
  type: "string",
  labelWidth: 15,
  width: 30,
  tooltip: "",
  section: "",
  unit: "Ghz",
  value: "test",
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
elementsForUI.push(stringElement);

context.panel.onChangeElements(elementsForUI);
```

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element Parameters

- ### `value`

  _string_. Optional.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'string'.

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The string element does not support options for selection. However, they must be specified in the element object

## Change Options Model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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
  value: '',
  showIf: '',
  disableIf: '',
  fieldName: '',
  queryField: {},
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

  _string_. Optional.  
   Current element value.

- ### `hidden`

  _string_. Required.  
   Hide element from panel.

- ### `type`

  _string_. Required.  
  Element type: 'string'.

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
