---
title: File
description: Learn how to use the file form element to upload files as binary or Base64 encoded data with configurable file type restrictions.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# File

The **File** type allows users to access their file system to select a file. The file will be transferred as binary or Base64 encoded.

Specific for this element are the following options:

- Accept. Lists the allowed file extensions. Example:

```js
 .png,.gif
```

<Image
  title="Options specific to the File type."
  src="/img/blog/2023-10-10-form-panel-3.2.1/accepted.png"
/>

#### Example of the File type in a project

You can find an example of the File type in the following article. There we demonstrate how Data Manipulation can interact with other plugins ([the Business Variable panel](/plugins/business-variable/) and [the Base64 panel](/plugins/business-media/)).

The Data Manipulation panel with a file upload feature is used twice in that example. One time to illustrate the configuration using Data Source and the other to HTTP API Server. Learn more in this [blog post](https://volkovlabs.io/blog/form-panel-file-upload-20240310/).

If you are a visual style learner, you can watch the video. It covers the same ground.

{{< youtube id="V4Sza0uDQNs" >}}

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'file',
  accept: '',
  multiple: false,
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
  type: "file",
  accept: "",
  multiple: false,
  labelWidth: 15,
  width: 150,
  tooltip: "",
  section: "",
  unit: "",
  value: [],
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
  Element type: 'file'.

- ### `accept`

  _string_. Required.  
  Accepted file types.

  ```js
  {
    accept: ".png,.gif";
  }
  ```

- ### `multiple`

  _boolean_. Required.  
  Support multiple files

<BaseParameters />

The File element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "file",
  accept: '',
  multiple: false,
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
  Element type: 'file'.

- ### `accept`

  _string_. Required.  
  Accepted file types.

  ```js
  {
    accept: ".png,.gif";
  }
  ```

- ### `multiple`

  _boolean_. Required.  
  Support multiple files

<BaseOptionsParameters />
