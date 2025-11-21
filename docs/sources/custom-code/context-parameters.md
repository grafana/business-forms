---
title: Context Parameters
description: Learn how to use context parameters to access panel data, form elements, Grafana services, and other functionality in custom code.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# Context Parameters

## context.element

Return a current element.

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

Result set of panel queries.

#### Usage

```javascript
context.panel.data;
```

#### Example

```javascript
const data = context.panel.data;
```

### panel.elements

Return form elements.

#### Usage

```javascript
context.panel.elements;
```

#### Example

```javascript
const currentElements = context.panel.elements;
```

### panel.initial

Parsed values from the initial request.

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

Return panel's options.

#### Usage

```javascript
context.panel.options;
```

#### Example

```javascript
const options = context.panel.options;
```

### panel.onOptionsChange(options)

Modifies a handler to refresh the panel. The context.panel.onOptionsChange() handler is required to update the panel.

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

Updates elements in the local state. Change elements. Accepts an array of new elements.

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

Update the value of the elements. Accepts an object.

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

Update the value of the elements. Accepts an object. If value is not passed to the element, the value should be used from initial or cleared.

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

Return a current form value as object.

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

Contains a current Request's response.

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

<Image
  title="Displays an error on panel."
  src="/img/plugins/business-forms/parameters/set-error.png"
/>

#### Arguments

- `message` _String_

  Error Message

## Buttons

### panel.enableSubmit()

Enable Submit button.

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

Disable Submit button.

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

Enable Reset button.

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

Disable Reset button.

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

Enable Save Default button.

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

Disable Save Default button.

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

Add a new Section.

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

Change Sections.

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

Remove Section.

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

Assign elements to Section.

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

Unassign elements from Section.

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

Get Section by id. Return Section with elements assign to section.

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

Get All Sections. Return Sections with elements assign to each section.

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

Collapse Section.

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

Expand Section.

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

Toggle (Collapse/Expand) Section.

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

Grafana's `locationService` function to work with the browser's location and history.

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

Grafana's backendService used to communicate to a remote backend such as the Grafana backend, a datasource etc.

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

<Image
  title="Displays an error."
  src="/img/plugins/business-forms/parameters/notify-error.png"
/>

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

Grafana's templateService function that provides access to variables and enables the update of a time range.

#### Usage

```javascript
context.grafana.templateService;
```

#### Example

```javascript
const regEx = context.grafana.templateService.regex;
```

### grafana.refresh()

Function to refresh dashboard panels using application events.

#### Usage

```javascript
context.grafana.refresh();
```

## Utils

### utils.fileToBase64(file)

Convert ot base64 format.

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

Parse the results from /api/ds/query into a DataQueryResponse

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
