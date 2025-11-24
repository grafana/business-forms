---
title: Custom button
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

The **Custom button** lets you add a custom button to the panel.

- Custom code for execution
- Different variants
- Customization options
- Placement in the form or in the main buttons after the form

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/button-element.png" class="border" alt="Custom Button element" >}}

{{< admonition type="note" >}}

Custom buttons are supported starting from the version 4.4.0.

{{< /admonition >}}

In addition to all other types, in release 4.4.0, a custom button type was added.

With the **Button** Form Elements type, you can add more functionality to your form, such as calculating a value, performing validation checks, or any other custom action.

You can style a custom button with various options. You can configure colors, size, and position.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/buttons-dash.png" class="border" alt="New Form Elements type - Custom Button." >}}

With the **Button place** option, you can place the custom button element among other form elements or in the form footer, next to the standard buttons.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/buttons-options.png" class="border" alt="Available options for the Button Form Elements type." >}}

## Change Elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-change-elements-example.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

## Element parameters

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

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The code-editor element does not support options for selection. However, they must be specified in the element object

## Change Options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

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

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

### Note

**fieldName** , **queryField**, **value** not supported with custom button - use custom code instead.
