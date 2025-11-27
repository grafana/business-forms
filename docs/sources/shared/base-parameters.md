---
title: base parameters
---
- ### `uid`

  _string_. Required.  
  A unique identifier used for correct mapping on the UI.

- ### `id`

  _string_. Required.  
  The unique identifier of the element.

- ### `title`

  _string_. Required.  
  The title or label of the element. Equivalent to the 'Label' in the UI editor.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/label-field.png" class="border" alt="Label field" >}}

- ### `labelWidth`

  _Number_ | _null_ . Required.  
  The element label width.

- ### `width`

  _Number_ | _null_. Required.  
  The element width.

- ### `tooltip`

  _string_. Required.  
  The element tooltip. Leave as an empty string ('') if not displayed.

- ### `section`

  _string_. Required.  
  The unique section identifier (section ID). Specify this if the element is in a section. Leave as an empty string ('') if the element has no section.

- ### `unit`

  _string_. Required.  
  The units of measurement. Located to the right of the element. Leave as an empty string ('') if the element has no unit.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/unit.png" class="border" alt="Unit of measurement" >}}

- ### `background`

  _string_. Optional.  
  The background color as a hex color code.

- ### `labelBackground`

  _string_. Optional.
  The label background color as a hex color code.

- ### `labelColor`

  _string_. Optional.  
  The label color as a hex color code.

- ### `helpers`

  Helpers provide information about the item display or its disabled state and return options.

```js
 {
  showIf: () => true,
  disableIf: () => false,
  getOptions: () => options || [],
 }
```

- ### `helpers.showIf`

  _Function_. Required.
  Returns _true_ or _false_. Controls whether the element displays on the UI.

- ### `helpers.disableIf`

  _Function_. Required.
  Returns _true_ or _false_. Controls whether the element is disabled on the UI.

- ### `helpers.getOptions`

  _Function_. Required.
  Returns an array of options.

  Each option contains the following properties:

  - `value`.  
    _string_. Required.
    The option value.

  - `label`.  
    _string_. Required.
    The option label.
