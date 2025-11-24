---
title: Link
description: Learn how to add customizable link elements to your Business Forms that can open in the same or a new tab.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Link

{{< admonition type="note" >}}

This feature is supported starting from version 3.2.1 and Grafana 10.1.0.

{{< /admonition >}}

This element type lets you add links to your Business form. You can customize the link text using the **Link Text** option. If you don't specify link text, the link address is displayed.

This element has the following specific options:

- **Link text**
- **Open in**: The link can open in the same tab or a new tab.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/link.png" class="border" alt="The Link element type." >}}

## Change Elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'link',
  linkText: '',
  target : '_blank',
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
  type: "link",
  linkText: "",
  target: "_blank",
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
  Element type: 'link'.

- ### `linkText`

  _string_. Required.  
  Link text.

- ### `target`

  _string_. Required.  
  Open link in new tab or on the same tab. '\_blank' | '\_self'

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The `link` element does not support options for selection. However, they must be specified in the element object

## Change Options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: "link",
  linkText: "",
  target: "_blank",
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
  Element type: 'link'.

- ### `linkText`

  _string_. Required.  
  Link text.

- ### `target`

  _string_. Required.  
  Open link in new tab or on the same tab. '\_blank' | '\_self'

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
