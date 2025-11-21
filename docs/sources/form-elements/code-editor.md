---
tags:
  - Business Forms
image: /img/plugins/business-forms/request.png
title: 'Code Editor'
description: 'Learn about Code Editor in Grafana'
labels:
  products:
    - enterprise
    - oss
---

# Code Editor

The **Code editor** highlights keywords and formats the entered text. Specific for this element are the following options:

- Language. You have a wide range of languages to select from (C, C++, C#, GO, HTML, Java, JavaScript, JSON, Markdown, MySQL, PHP, PostgreSQL, Python, Ruby, SQL, TypeScript).
- Height. How high the entering window should be.

<Image
  title="Options specific to the Code Editor type."
  src="/img/plugins/business-forms/code-editor.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'code',
  labelWidth: 10,
  height: 300,
  language: 'javascript',
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
  type: "code",
  labelWidth: 15,
  height: 300,
  language: "javascript",
  width: 150,
  tooltip: "",
  section: "",
  unit: "",
  value: "console.log('')",
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
  Element type: 'code'.

- ### `height`

  _number_. Required.  
  Code editor height

- ### `language`

  _string_. Required.  
  Supported language for code editor: 'c' | 'cpp' | 'sharp' | 'go' | 'java' | 'javascript' | 'json' | 'mysql' | 'php' | 'pgsql' | 'python' | 'ruby' | 'sql' | 'typescript' | 'html' | 'markdown'.

<BaseParameters />

The code-editor element does not support options for selection. However, they must be specified in the element object.

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'code',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: '',
  height: 300,
  language: "javascript",
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
 Element type: 'code'.

- ### `height`

  _number_. Required.  
  Code editor height

- ### `language`

_string_. Required.  
 Supported language for code editor.
'c' | 'cpp' | 'sharp' | 'go' | 'java' | 'javascript' | 'json' | 'mysql' | 'php' | 'pgsql' | 'python' | 'ruby' | 'sql' | 'typescript' | 'html' | 'markdown'

<BaseOptionsParameters />
