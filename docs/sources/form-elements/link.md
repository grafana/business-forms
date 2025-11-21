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

:::info Version

Below is supported starting from version 3.2.1 and Grafana 10.1.0.

:::

This element type allows you to add links to your Business form. The link text is customizable using the **Link Text** option. If not specified, the link address will be displayed.

Specific for this element are the following options:

- **Link text**
- **Open in**. The link can be opened in the same or a new tab.

<Image
  title="The Link element type."
  src="/img/plugins/business-forms/link.png"
/>

## Change Elements Model

<InfoUseChangeElements />

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

<BaseChangeElements />

## Element Parameters

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

<BaseParameters />

The `link` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

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

<BaseOptionsParameters />
