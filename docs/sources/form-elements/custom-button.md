---
title: Custom Button
description: Learn how to add custom buttons with configurable styles, icons, and custom code execution to your forms.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# Custom button

The **Custom button** allows add custom button to panel.

- Custom code to execution
- Different variants
- Customization
- Place in form or in main buttons after form

<Image
  title="Custom Button element"
  src="/img/plugins/business-forms/button-element.png"
/>

:::info Version

Custom buttons are supported starting from the version 4.4.0.

:::

In addition to all other types, in release 4.4.0 we added a custom button type.

With the **Button** Form Elements type, you can have more functionality on your form, such as calculating a value, performing validation checks, or any other.

A user has some options to style a custom button. Colors, size, and position are up to configuration.

<Image
  title="New Form Elements type - Custom Button."
  src="/img/blog/2024-08-29-form-panel-4.4.0/buttons-dash.png"
/>

With the **Button place** option, the custom button element can be placed among other Form Elements or in the form footer, next to the standard buttons.

<Image
  title="Available options for the Button Form Elements type."
  src="/img/blog/2024-08-29-form-panel-4.4.0/buttons-options.png"
/>

## Change Elements Model

<InfoUseChangeElements />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show:'form',
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
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show: "form",
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
  Current element value. Not supported for custom button.

- ### `type`

  _string_. Required.  
  Element type: 'button'.

- ### `customCode`

  _string_. Required.  
  Code to execute on button click.

```js
{
  customCode: 'console.log('click')'
}
```

- ### `buttonLabel`

  _string_. Required.  
  Button label. Keep empty string do not show label.

- ### `icon`

  _string_. Required.  
  Button icon name. Keep empty string do not show icon. All available icons: [`Grafana Icons`](https://developers.grafana.com/ui/latest/index.html?path=/story/docs-overview-icon--icons-overview)

- ### `size`

  _string_. Required.  
  Button size: 'sm' | 'md' | 'lg'

- ### `variant`

  _string_. Required.  
  Button display variant: 'destructive' | 'hidden' | 'primary' | 'secondary' | 'custom'.

  If `custom` is selected, set custom colors for the button.

- ### `foregroundColor`

  _string_. Required.  
  Label button color in hex format.

- ### `backgroundColor`

  _string_. Required.  
  Button main color in hex format.

- ### `show`

  _string_. Required.  
  Show button in form or show button in buttons after form. 'bottom' | 'form'.

<BaseParameters />

The code-editor element does not support options for selection. However, they must be specified in the element object

## Change Options Model

<InfoUseOptionsChange />

```js
{
  uid:'',
  id: '',
  title: '',
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show: "form",
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
  Current element value. Not supported for custom button.

- ### `type`

  _string_. Required.  
  Element type: 'button'.

- ### `customCode`

  _string_. Required.  
  Code to execute on button click.

```js
{
  customCode: 'console.log('click')'
}
```

- ### `buttonLabel`

  _string_. Required.  
  Button label. Keep empty string do not show label.

- ### `icon`

  _string_. Required.  
  Button icon name. Keep empty string do not show icon. All available icons: [`Grafana Icon`](https://developers.grafana.com/ui/latest/index.html?path=/story/docs-overview-icon--icons-overview)

- ### `size`

  _string_. Required.  
  Button size. 'sm' | 'md' | 'lg'

- ### `variant`

  _string_. Required.  
  Button display variant. 'destructive' | 'hidden' | 'primary' | 'secondary' | 'custom'. If `custom` is selected, set custom colors for the button.

- ### `foregroundColor`

  _string_. Required.  
  Label button color in hex format.

- ### `backgroundColor`

  _string_. Required.  
  Button main color in hex format.

- ### `show`

  _string_. Required.  
  Show button in form or show button in buttons after form. 'bottom' | 'form'

<BaseOptionsParameters />

### Note

**fieldName** , **queryField**, **value** not supported with custom button - use custom code instead.
