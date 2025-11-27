---
title: Context parameters
description: Learn how to use context parameters to access panel data, form elements, Grafana services, and other functionality in custom code.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---

# Context parameters

## context.element

Returns the current element.

#### Usage

```javascript
context.element;
```

#### Example

```javascript
const currentElement = context.element;
```

## Panel

### panel.data

Returns the result set of panel queries.

#### Usage

```javascript
context.panel.data;
```

#### Example

```javascript
const data = context.panel.data;
```

### panel.elements

Returns all form elements.

#### Usage

```javascript
context.panel.elements;
```

#### Example

```javascript
const currentElements = context.panel.elements;
```

### panel.initial

Returns the parsed values from the initial request.

#### Usage

```javascript
context.panel.initial;
```

#### Example

```javascript
const initialValues = context.panel.initial;
```

### panel.initialRequest()

Performs an initial request to reload the panel.

#### Usage

```javascript
context.panel.initialRequest();
```

#### Example

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.grafana.notifySuccess(["Update", "Values updated successfully."]);
  context.panel.initialRequest();
} else {
  context.grafana.notifyError([
    "Error",
    `An error occurred updating values: ${context.panel.response.status}`,
  ]);
}
```

### panel.options

Returns the panel's options.

#### Usage

```javascript
context.panel.options;
```

#### Example

```javascript
const options = context.panel.options;
```

### panel.onOptionsChange(options)

Modifies the panel options and triggers a refresh. The `context.panel.onOptionsChange()` handler is required to update the panel.

{{< admonition type="note" >}}

The `context.panel.onOptionsChange(options)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.onOptionsChange(options)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.onOptionsChange(options);
```

#### Example

```javascript
context.panel.onOptionsChange({
  ...context.panel.options,
  elements: context.panel.options.elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  }),
});
```

```javascript
const options = context.panel.options;
context.panel.onOptionsChange({
  ...options,
  sync: true,
});
```

#### Arguments

- `options` _Object_
  <br />
  Panel options. Use `console.log('options:',context.panel.options)` to check all
  fields

### panel.onChangeElements(options)

Updates elements in the local state. Accepts an array of new elements.

#### Usage

```javascript
context.panel.onChangeElements(elements);
```

#### Example

```javascript
context.panel.onChangeElements(
  context.panel.elements.map((element) => ({
    ...element,
    value: json[element.id],
  }))
);
```

```javascript
context.panel.onChangeElements(
  elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  })
);
```

#### Arguments

- `elements` _Array_
  <br />
  Array of elements.

### panel.patchFormValue(values)

Updates the values of the specified elements. Accepts an object.

#### Usage

```javascript
context.panel.patchFormValue(elements);
```

#### Example

```javascript
// only passed elements should be updated, the rest stay the same
context.panel.patchFormValue({ name: "Alex" });
```

```javascript
// name and isAdmin
context.panel.patchFormValue({ name: "Alex", isAdmin: true });
```

#### Arguments

- `values` _Object_
  <br />
  Object. Each key is the `id` of the element and the `value` of the key is the value
  of the element

### panel.setFormValue(values)

Updates the values of elements. Accepts an object. If a value is not passed for an element, the initial value is used or the value is cleared.

#### Usage

```javascript
context.panel.setFormValue(elements);
```

#### Example

```javascript
context.panel.setFormValue({ name: "Alex", isAdmin: true });
```

#### Arguments

- `values` _Object_
  <br />
  Object. Each key is the `id` of the element and the `value` of the key is the value
  of the element

### panel.formValue()

Returns the current form values as an object.

#### Usage

```javascript
context.panel.formValue(elements);
```

#### Example

```javascript
const payload = context.panel.formValue;
// return { name: 'Alex', isAdmin: true }
```

### panel.response

Returns the current request's response.

#### Usage

```javascript
context.panel.response;
```

#### Example

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.grafana.notifySuccess(["Update", "Values updated successfully."]);
  context.grafana.refresh();
} else {
  context.grafana.notifyError([
    "Update",
    `An error occurred updating values: ${context.panel.response.status}`,
  ]);
}
```

### panel.setInitial(values)

Specifies initial values for a custom initial request to highlight modified values and requests a user's confirmation.

#### Usage

```javascript
context.panel.setInitial(values);
```

#### Example

```javascript
// Initial custom code example
const payload = {};

context.panel.elements.forEach((element) => {
  if (!element.value) {
    return;
  }

  payload[element.id] = element.value;
});

context.panel.setInitial(payload);

return;
```

#### Arguments

- `values` _Object_

  Object. Each key is the `id` of the element and the `value` of the key is the value
  of the element

  ```javascript
  // example
  {
    "max": 100,
    "min": 10,
    "speed": 54,
    "option1": "option1",
    "option2": "option1",
    "code": "option1"
  }
  ```

## Errors

### panel.setError(message)

Displays an error on panel.

#### Usage

```javascript
context.panel.setError(message);
```

#### Example

```javascript
context.panel.setError("Message");
```

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/set-error.png" class="border" alt="Displays an error on panel." >}}

#### Arguments

- `message` _String_

  Error Message

## Buttons

### panel.enableSubmit()

Enables the Submit button.

#### Usage

```javascript
context.panel.enableSubmit();
```

#### Example

```javascript
if (condition) {
  context.panel.enableSubmit();
}

context.panel.enableSubmit();
```

### panel.disableSubmit()

Disables the Submit button.

#### Usage

```javascript
context.panel.disableSubmit();
```

#### Example

```javascript
if (condition) {
  context.panel.disableSubmit();
}

//

context.panel.disableSubmit();
```

### panel.enableReset()

Enables the Reset button.

#### Usage

```javascript
context.panel.enableReset();
```

#### Example

```javascript
if (condition) {
  context.panel.enableReset();
}

context.panel.disableSubmit();
```

### panel.disableReset()

Disables the Reset button.

#### Usage

```javascript
context.panel.disableReset();
```

#### Example

```javascript
if (condition) {
  context.panel.disableReset();
}

context.panel.disableReset();
```

### panel.enableSaveDefault()

Enables the Save Default button.

#### Usage

```javascript
context.panel.enableSaveDefault();
```

#### Example

```javascript
if (condition) {
  context.panel.enableSaveDefault();
}

context.panel.enableSaveDefault();
```

### panel.disableSaveDefault()

Disables the Save Default button.

#### Usage

```javascript
context.panel.disableSaveDefault();
```

#### Example

```javascript
if (condition) {
  context.panel.disableSaveDefault();
}

context.panel.disableSaveDefault();
```

## Sections Utils

### sectionsUtils.add(section)

Adds a new section.

_Added in: v4.9.0_

{{< admonition type="note" >}}

The `context.panel.sectionsUtils.add(section)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.add(section)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.sectionsUtils.add(section);
```

#### Example

```javascript
context.panel.sectionsUtils.add({
  name: "Section 1",
  id: "id-s-1",
  elements: [],
});

const newSection = {
  name: "Section 2",
  id: "id-s-2",
  elements: ["elem-1", "elem-2"],
};

context.panel.sectionsUtils.add(newSection);
```

#### Arguments

- `section` _Object_
  <br />
  Section. Each section include `name`, `id`, `elements`

#### Common Section properties

- `name` _string_. Section name.

- `id` _string_. Section Id.

- `elements` _Array_. Elements ids assign to section. Could Be empty array.

### sectionsUtils.update(sections)

Updates existing sections.

_Added in: v4.9.0_

{{< admonition type="note" >}}

The `context.panel.sectionsUtils.update(sections)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.update(sections)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.sectionsUtils.update(sections);
```

#### Example

```javascript
context.panel.sectionsUtils.update([{ name: "Section 1", id: "id-s-1" }]);
```

#### Arguments

- `sections` _Array_
  <br />
  Sections. Each section include `name` and `id`

### sectionsUtils.remove(id)

Removes a section.

_Added in: v4.9.0_

{{< admonition type="note" >}}

The `context.panel.sectionsUtils.remove(id)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.remove(id)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.removeSection(id);
```

#### Example

```javascript
context.panel.removeSection("id-s-1");
```

#### Arguments

- `id` _string_. Section id.

### sectionsUtils.assign(id,elements)

Assigns elements to a section.

_Added in: v4.9.0_

{{< admonition type="note" >}}

The `context.panel.sectionsUtils.assign(id,elements)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.assign(id,elements)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.sectionsUtils.assign(id, elements);
```

#### Example

```javascript
context.panel.sectionsUtils.assign("id-s-1", ["elem-1", "elem-2"]);
```

#### Arguments

- `id` _string_. Section Id.
- `elements` _Array_. Array of elements ids

### sectionsUtils.unassign(elements)

Unassigns elements from a section.

_Added in: v4.9.0_

{{< admonition type="note" >}}

The `context.panel.sectionsUtils.unassign(elements)` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.unassign(elements)` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

#### Usage

```javascript
context.panel.sectionsUtils.unassign(elements);
```

#### Example

```javascript
context.panel.sectionsUtils.unassign(["elem-1", "elem-2"]);
```

#### Arguments

- `elements` _Array_. Array of elements ids

### sectionsUtils.get(id)

Returns the section with the specified ID, including all elements assigned to it.

_Added in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.get(id);
```

#### Example

```javascript
context.panel.sectionsUtils.get("section-id");
```

#### Arguments

- `id` _string_. Section Id

### sectionsUtils.getAll()

Returns all sections with their assigned elements.

_Added in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.getAll();
```

#### Example

```javascript
context.panel.sectionsUtils.getAll();
```

### sectionsUtils.collapse(id)

Collapses the specified section.

_Updated in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.collapse(id);
```

#### Example

```javascript
context.panel.sectionsUtils.collapse("section-id");
```

#### Arguments

- `id` _string_. Section Id

### sectionsUtils.expand(id)

Expands the specified section.

_Added in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.expand(id);
```

#### Example

```javascript
context.panel.sectionsUtils.expand("section-id");
```

#### Arguments

- `id` _string_. Section Id

### sectionsUtils.toggle(id)

Toggles the specified section between collapsed and expanded states.

_Added in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.toggle(id);
```

#### Example

```javascript
context.panel.sectionsUtils.toggle("section-id");
```

#### Arguments

- `id` _string_. Section Id

### sectionsUtils.expandedState

Returns Expand/Collapse State for Sections.

_Added in: v4.9.0_

#### Usage

```javascript
context.panel.sectionsUtils.expandedState;
```

#### Example

```javascript
const sectionsExpandedState = context.panel.sectionsUtils.expandedState;
```

## Grafana

### grafana.locationService

Provides access to Grafana's `locationService` for working with the browser's location and history.

#### Usage

```javascript
context.grafana.locationService;
```

#### Example

```javascript
context.grafana.locationService.reload();

const history = context.grafana.locationService.history;
```

### grafana.backendService

Provides access to Grafana's `backendService` for communicating with remote backends such as the Grafana backend or a data source.

#### Usage

```javascript
context.grafana.backendService;
```

#### Example

```javascript
const deviceID = context.grafana.backendService.deviceID;
```

### grafana.notifyError([header, message])

Displays an error.

#### Usage

```javascript
context.grafana.notifyError([header, message]);
```

#### Example

```javascript
context.grafana.notifyError([
  "Error",
  `An error occurred updating values: ${context.panel.response.status}`,
]);

context.grafana.notifyError(["Error Title", `Show error message`]);
```

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/notify-error.png" class="border" alt="Displays an error." >}}

#### Arguments

- `header` _string_. Error title
- `message` _string_. Error message

### grafana.notifySuccess([header, message])

Displays a success notification.

#### Usage

```javascript
context.grafana.notifySuccess([header, message]);
```

#### Example

```javascript
context.grafana.notifySuccess(["Success Title", `Success message`]);
```

#### Arguments

- `header` _string_. Success title
- `message` _string_. Success message

### grafana.notifyWarning([header, message])

Displays a warning.

#### Usage

```javascript
context.grafana.notifyWarning([header, message]);
```

#### Example

```javascript
context.grafana.notifyWarning(["warning Title", `warning message`]);
```

#### Arguments

- `header` _string_. Warning title
- `message` _string_. Warning message

### grafana.eventBus

Publish and subscribe to application events.

#### Usage

```javascript
context.grafana.eventBus;
```

#### Example

```javascript
const subscriber = eventBus.getStream(RefreshEvent).subscribe(() => {
  // to do
});
```

### grafana.templateService

Provides access to Grafana's `templateService` for working with variables and updating the time range.

#### Usage

```javascript
context.grafana.templateService;
```

#### Example

```javascript
const regEx = context.grafana.templateService.regex;
```

### grafana.refresh()

Refreshes dashboard panels using application events.

#### Usage

```javascript
context.grafana.refresh();
```

## Utils

### utils.fileToBase64(file)

Converts a file to base64 format.

#### Usage

```javascript
context.utils.fileToBase64(file);
```

#### Example

```javascript
const payload = {};

context.panel.elements.forEach((element) => {
  if (!element.value) {
    return;
  }

  payload[element.id] = element.value;
});

/**
 * Data Source payload
 */
const getPayload = async () => {
  const file = payload.file[0];
  const base64 = await context.utils.fileToBase64(file);

  return {
    file,
    base64,
  };
};

return getPayload();
```

#### Arguments

- `file` _File_. A File provides information about files.

### utils.toDataQueryResponse(res)

Parses the results from `/api/ds/query` into a `DataQueryResponse` object.

#### Usage

```javascript
context.utils.toDataQueryResponse(res);
```

#### Example

```javascript
const dataQuery = context.utils.toDataQueryResponse(context.panel.response);
```

#### Arguments

- `res` _response_. The HTTP response data
