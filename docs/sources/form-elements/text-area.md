---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Text Area'
description: 'Learn about Text Area in Grafana'
labels:
  products:
    - enterprise
    - oss
---
import Image from "@theme/Image";
import BaseParameters from "./_base-parameters.mdx";
import BaseChangeElements from "./_base-change-elements-example.mdx";
import InfoUseChangeElements from "./_info-use-change-elements.mdx";
import InfoUseOptionsChange from "./_info-use-options-change.mdx";
import BaseOptionsParameters from "./_base-options-parameters.mdx";

# Text Area

The **Text Area** is a rectangular area where a user can enter a text.

Specific for this element are the following options:

- Rows. Sets the vertical size of the element.

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'textarea',
  rows: 10,
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
  type: "textarea",
  rows: 10,
  labelWidth: 15,
  width: 35,
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
  Element type: 'textarea'.

- ### `rows`

  _number_. Required.  
  Sets the vertical size of the element.

<BaseParameters />

The `Read-only Text Area` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "textarea",
  rows: 10,
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
  Element type: 'textarea'.

- ### `rows`

  _number_. Required.  
  Sets the vertical size of the element.

<BaseOptionsParameters />
