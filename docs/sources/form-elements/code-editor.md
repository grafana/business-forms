---
title: Code editor
description: Learn how to use the code editor form element with syntax highlighting and support for multiple programming languages.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Code editor

The **Code editor** highlights keywords and formats the entered text. This element has the following specific options:

- **Language**: Select from a wide range of languages (C, C++, C#, Go, HTML, Java, JavaScript, JSON, Markdown, MySQL, PHP, PostgreSQL, Python, Ruby, SQL, TypeScript).
- **Height**: Specifies how high the entry window is.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/code-editor.png" class="border" alt="Options specific to the Code Editor type." >}}

## Change elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element parameters

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

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The code-editor element does not support options for selection. However, they must be specified in the element object.

## Change options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
