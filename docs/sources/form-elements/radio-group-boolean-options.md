---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Radio Group with boolean options'
description: 'Learn about Radio Group with boolean options in Grafana'
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

# Radio Group with boolean options

The **Radio Group with boolean options** provides a user with a choice between True and False.

This type does not have any specific options.

## Change Elements Model

<InfoUseChangeElements />

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

<BaseChangeElements />

## Element Parameters

- ### `value`

  _boolean_. Required.  
   Current element value.

- ### `type`

  _string_. Required.  
  Element type: 'boolean'.

<BaseParameters />

The `Radio Group with boolean options` element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

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

<BaseOptionsParameters />
