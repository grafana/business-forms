---
title: base options parameters
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

- ### `showIf`

  _string_. Optional.  
   The "Show if" function of the element returns true or false. Controls whether the element displays on the UI.

  ```js
  {
    showIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```

- ### `disableIf`

  _string_. Optional.  
   The "Disable if" function of the element returns true or false. Controls whether the element is disabled on the UI.

  ```js
  {
    disableIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```

- ### `fieldName`

  _string_. Optional.  
   The name field from the DataSource initial request. Use for the initial value. We recommend using `value` instead.

- ### `queryField`

  _object_. Optional.  
   The name query from the Query initial request. Use for the initial value. We recommend using `value` instead.

  Parameters:

  - `refId`  
     _string_. The frame refId.

  - `value`  
     _string_. The field name.

  - `label`  
     _string_. The format: `refId:value` (for example, `A:time`).
