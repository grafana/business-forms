---
description: 'import Image from "@theme/Image";'
weight: 2
title: '_base options parameters'
labels:
  products:
    - enterprise
    - oss
---
import Image from "@theme/Image";

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

- ### `showIf`

  _string_. Optional.  
   "Show if" function of the element returns the value true or false. Responsible for displaying the element on the UI.

  ```js
  {
    showIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```

- ### `disableIf`

  _string_. Optional.  
   "Disable if" function of the element returns the value true or false. Responsible for disable state the element on the UI.

  ```js
  {
    disableIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```

- ### `fieldName`

  _string_. Optional.  
   Name field from DataSource initial request. Use for initial value. Rec. use `value` instead it.

- ### `queryField`

  _object_. Optional.  
   Name query from Query initial request. Use for initial value. Rec. use `value` instead it.

  Parameters:

  - `refId`  
     _string_. Frame refId

  - `value`  
     _string_. Field name

  - `label`  
     _string_. Format: `refId:value` (`A:time`)
