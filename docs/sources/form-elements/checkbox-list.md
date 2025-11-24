---
title: Checkbox List with custom options
description: Learn how to create multi-selection checkbox list elements with custom options in the Business Forms panel.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Checkbox list with custom options

The **Checkbox list with custom options** type lets you create multi-selection checkmark elements.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/checkbox.png" max-width="300px" class="border" alt="Checkbox list with custom options." >}}

Specific for this element is the following option:

- User options

To add an option, click **Add option**, and then specify an option type (number or string), value, and label.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/checkbox-options.png" class="border" alt="Checkbox list with custom options." >}}

## Change Elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element parameters

- ### `value`

  _Array_. Optional.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'checkboxList'.

- ### `optionsSource`

  _string_. Required.  
  Element options source: 'Query' | 'Custom' | 'Code'.

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Change Options model

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

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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
