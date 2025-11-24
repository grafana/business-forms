---
title: Date and Time
description: Learn how to use the date and time form element with time zone support and min/max value constraints.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Date and Time

The **Date and Time** element provides access to the built-in Grafana date time component where users can select a date and time using familiar controls.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/calendar.png" max-width="175px" class="border" alt="Date and time type is Grafana universal type." >}}

This element has the following specific options:

- **Min**: Sets the allowed minimum.
- **Max**: Sets the allowed maximum.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/min-max.png" max-width="300px" class="border" alt="Options specific to the Date and time type." >}}

{{< admonition type="note" >}}
The **Time Zone** option is available starting from version 4.0.0.
{{< /admonition >}}

- **UTC**. The date-time value is saved in the UTC zone,
- **Local**. The date-time value is saved following the browser's time zone.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/time-zone.png" max-width="400px" class="border" alt="New Time Zones option for Date and time elements." >}}

## Change Elements model

{{< docs/shared lookup="info-use-change-elements.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'datetime',
  min: '',
  max: '',
  isUseLocalTime: true,
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
  type: "datetime",
  min: "",
  max: "",
  isUseLocalTime: true,
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
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'datetime'.

- ### `min`

  _string_. Optional.  
   Min available date. Format: '2025-01-28T08:07:37.359Z'

- ### `max`

  _string_. Optional.  
   Max available date. Format: '2025-01-28T08:07:37.359Z'

- ### `isUseLocalTime`

  _boolean_. Required.  
   Use local time for output value or transform to UTC.

{{< docs/shared lookup="base-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

The Date-Time element does not support options for selection. However, they must be specified in the element object

## Change Options model

{{< docs/shared lookup="info-use-options-change.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'datetime',
  min: '',
  max: '',
  isUseLocalTime: true,
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
   Current element value. Format: '2025-01-28T08:07:37.359Z'

- ### `type`

  _string_. Required.  
  Element type: 'datetime'.

- ### `min`

  _string_. Optional.  
   Min available date. Format: '2025-01-28T08:07:37.359Z'

- ### `max`

  _string_. Optional.  
   Max available date. Format: '2025-01-28T08:07:37.359Z'

- ### `isUseLocalTime`

  _boolean_. Required.  
   Use local time for output value or transform to UTC.

{{< docs/shared lookup="base-options-parameters.md" source="plugins/volkovlabs-form-panel" version="<PLUGINS_VERSION>" >}}
