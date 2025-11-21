---
title: base parameters
---
- ### `uid`

  _string_. Required.  
  Unique identifier is used for correct mapping on UI.

- ### `id`

  _string_. Required.  
  Unique identifier of element.

- ### `title`

  _string_. Required.  
  Title/Label of element. Equivalent to the 'Label' in the UI editor.

<Image
  title="Label field"
  src="/img/plugins/business-forms/elements/base-options/label-field.png"
/>

- ### `labelWidth`

  _Number_ | _null_ . Required.  
  Element label width.

- ### `width`

  _Number_ | _null_. Required.  
  Element width.

- ### `tooltip`

  _string_. Required.  
  Element tooltip. Leave empty string ('') if not displayed

- ### `section`

  _string_. Required.  
  Unique section identifier (section ID). Specified if the element is placed in a section. Leave empty string ('') if the element has no section.

- ### `unit`

  _string_. Required.  
  Units of measurement. Located to the right of the element. Leave empty string ('') if has no unit.

<Image
  title="Unit of measurement"
  src="/img/plugins/business-forms/elements/base-options/unit.png"
/>

- ### `background`

  _string_. Optional.  
  Hex color code. Background color.

- ### `labelBackground`

  _string_. Optional.
  Hex color code. Label Background color.

- ### `labelColor`

  _string_. Optional.  
  Hex color code. Label color.

- ### `helpers`

  Helpers - provide information about the item display or its disable state, returns options

```js
 {
  showIf: () => true,
  disableIf: () => false,
  getOptions: () => options || [],
 }
```

- ### `helpers.showIf`

  _Function_. Required.
  Should return _true_ or _false_. Responsible for displaying the element on the UI.

- ### `helpers.disableIf`

  _Function_. Required.
  Should return _true_ or _false_. Responsible for disable state the element on the UI.

- ### `helpers.getOptions`

  _Function_. Required.
  Should return array of options.

  Each option contain following property

  - `value`.  
    _string_. Required.
    Option value

  - `label`.  
    _string_. Required.
    Option label
