---
title: Color picker
description: Learn how to use the color picker form element to select colors in HEX or RGB format.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Color picker

The **Color Picker** lets you select a color from a palette.

This element has the following specific option:

- **Color format**: HEX or RGB

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/color-picker.png" class="border" alt="Color Picker element." >}}

## Change elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element parameters

- ### `value`

  _string_. Optional.  
  Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'colorPicker'.

- ### `colorFormat`

  _number_. Required.  
  Color picker value output format. 'hex' | 'rgb'

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The `Color Picker` element does not support options for selection. However, they must be specified in the element object.

## Change options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
