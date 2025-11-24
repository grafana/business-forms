---
title: Custom code
description: Learn how to use custom code to access panel options, REST API responses, form elements, and Grafana services in Business Forms.
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 50
---

# Custom code

You can use custom code to access the panel's options, REST API responses, form elements, and various Grafana services.

Custom code is executed after the `Initial` and `Update` requests and when `Element Value Changed` occurs.

## Parameters

<!-- prettier-ignore-start -->

| Parameter | Description | Initial, Update | Change value | ShowIf, DisableIf, GET options |
| --------- | ----------- | --------------- | ------------ | ------------------------------ |
| [`context.element`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#contextelement) | Current element | | YES | |
| [`context.panel.data`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#paneldata) | Result set of panel queries. | YES  | YES | YES (For `Get Options`) |
| [`context.panel.elements`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelelements)  | Form elements. | YES | YES  | YES |
| [`context.panel.initial`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelinitial) | Parsed values from the initial request. | YES  | YES | |
| [`context.panel.initialRequest()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelinitialrequest)  | Performs an initial request to reload the panel. | YES | YES | |
| [`context.panel.options`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#paneloptions) | Panel's options. | YES | YES | |
| [`context.panel.onOptionsChange({})`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelonoptionschangeoptions) | Modifies a handler to refresh the panel. | YES  | YES |  |
| [`context.panel.onChangeElements([])`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelonchangeelementsoptions)  | Updates elements in the local state. Change elements. Accepts an array of new elements. | YES  | YES |  |
| [`context.panel.patchFormValue({})`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelpatchformvaluevalues) | Update the value of the elements. Accepts an object.  | YES  | YES  |
| [`context.panel.setFormValue({})`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelsetformvaluevalues)  | Update the value of the elements. Accepts an object. If value is not passed to the element, the value should be used from initial or cleared. | YES  | YES | |
| [`context.panel.formValue()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelformvalue) | Contains a current form value as object. | YES | YES |  |
| [`context.panel.response`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelresponse) | Request's response.                                                                                                                           | YES                                     |                                                     |                                                                       |
| [`context.panel.setInitial({})`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelsetinitialvalues)                                      | Specifies initial values for a custom initial request to highlight modified values and requests a user's confirmation.                        | YES                                     |                                                     |                                                                       |
| [`context.panel.enableSubmit()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelenablesubmit)                                          | Enable Submit button                                                                                                                          | YES                                     | YES                                  |                                                                       |
| [`context.panel.disableSubmit()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#paneldisablesubmit)                                        | Disable Submit button                                                                                                                         | YES                                     | YES                                  |                                                                       |
| [`context.panel.enableReset()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelenablereset)                                            | Enable Reset button                                                                                                                           |                                                        | YES                                  |                                                                       |
| [`context.panel.disableReset()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#paneldisablereset)                                          | Disable Reset button                                                                                                                          |                                                        | YES                                  |                                                                       |
| [`context.panel.enableSaveDefault()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelenablesavedefault)                                | Enable Save Default button                                                                                                                    |                                                        | YES                                  |                                                                       |
| [`context.panel.disableSaveDefault()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#paneldisablesavedefault)                              | Disable Save Default button                                                                                                                   |                                                        | YES                                  |                                                                       |
| [`context.panel.setError('Message')`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#panelseterrormessage)                                  | Displays an error on panel.                                                                                                                   |                                                        | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.add(section)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsaddsection)                        | Add a new Section. Added in v4.9.0.                                                                                                           | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.update(sections)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsupdatesections)                | Change Sections. Added in v4.9.0.                                                                                                             | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.remove(id)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsremoveid)                            | Remove Section. Added in v4.9.0.                                                                                                              | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.assign(id, elements)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsassignidelements)          | Assign elements to Section. Added in v4.9.0.                                                                                                  | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.unassign(elements)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsunassignelements)            | Unassign elements from Section. Added in v4.9.0.                                                                                              | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.get(id)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsgetid)                                  | Get Section by id. Return Section with elements assign to section. Added in v4.9.0.                                                           | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.getAll()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsgetall)                                | Get All Sections. Return Sections with elements assign to each section. Added in v4.9.0.                                                      | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.collapse(id)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilscollapseid)                        | Collapse Section. Updated in v4.9.0.                                                                                                          | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.expand(id)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsexpandid)                            | Expand Section. Updated in v4.9.0.                                                                                                            | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.toggle(id)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilstoggleid)                            | Toggle (Collapse/Expand) Section. Updated in v4.9.0.                                                                                          | YES                                     | YES                                  |                                                                       |
| [`context.panel.sectionsUtils.expandedState`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#sectionsutilsexpandedstate)                    | Return Expand/Collapse State for Sections. Updated in v4.9.0.                                                                                 | YES                                     | YES                                  |                                                                       |
| [`context.grafana.locationService`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafanalocationservice)                                  | Grafana's `locationService` function to work with the browser's location and history.                                                         | YES                                     | YES                                  |                                                                       |
| [`context.grafana.backendService`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafanabackendservice)                                    | Grafana's `backendService` used to communicate to a remote backend such as the Grafana backend, a datasource etc.                             | YES                                     |                                                     |                                                                       |
| [`context.grafana.notifyError(['Header', 'Message'])`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafananotifyerrorheader-message)     | Displays an error.                                                                                                                            | YES                                     | YES                                  |                                                                       |
| [`context.grafana.notifySuccess(['Header', 'Message'])`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafananotifysuccessheader-message) | Displays a success notification.                                                                                                              | YES                                     | YES                                  |                                                                       |
| [`context.grafana.notifyWarning(['Header', 'Message'])`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafananotifywarningheader-message) | Displays a warning.                                                                                                                           | YES                                     | YES                                  |                                                                       |
| [`context.grafana.eventBus`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafanaeventbus)                                                | Publish and subscribe to application events.                                                                                                  | YES                                     | YES                                  |                                                                       |
| [`context.grafana.templateService`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafanatemplateservice)                                  | Grafana's `templateService` function that provides access to variables and enables the update of a time range.                                | YES                                     | YES                                  |                                                                       |
| [`context.grafana.refresh()`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#grafanarefresh)                                                | Function to refresh dashboard panels using application events.                                                                                | YES                                     | YES                                  |                                                                       |
| [`context.utils.fileToBase64(file)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#utilsfiletobase64file)                                  | Convert to base64 format                                                                                                                      | YES                                     |                                                     |                                                                       |
| [`context.utils.toDataQueryResponse(data)`](https://grafana.com/docs/plugins/volkovlabs-form-panel/<PLUGINS_VERSION>/custom-code/context-parameters/#utilstodataqueryresponseres)                     | Parse the results from /api/ds/query into a DataQueryResponse                                                                                 | YES                                     | YES                                  |                                                                       |

<!-- prettier-ignore-end -->

## Inspect parameters

To find out the current parameters, you can log them in the browser's console:

```javascript
console.log(
  context.panel.options,
  context.panel.data,
  context.panel.response,
  context.panel.elements,
  context.grafana.locationService,
  context.grafana.templateService
);
```

## Refresh the dashboard after an update request or show a warning

The following example shows how to refresh the dashboard after a successful update request or display an error notification if the request fails.

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

## Update a variable after an update request to interact with other panels

The following example demonstrates how to update a dashboard variable with data from the response, enabling interaction with other panels.

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.panel.response.json().then((resp) => {
    context.grafana.locationService.partial({ "var-name": resp["name"] }, true);
  });
}
```

## Perform an initial request after an update request or show an error

The following example shows how to trigger an initial request to reload the panel after a successful update or display an error notification if the request fails.

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

## Perform an initial request only on dashboard load

The following example demonstrates how to fetch and populate form elements only when the dashboard first loads, avoiding unnecessary requests on subsequent interactions.

```javascript
const getValues = async () => {
  /**
   * Check if all values are empty
   */
  const isFirstLoad = context.panel.elements.every((element) => !element.value);

  if (isFirstLoad) {
    /**
     * Get Data
     */
    const response = await fetch();
    const json = await response.json();

    /**
     * Update initial element values
     */
    context.panel.onChangeElements(
      context.panel.elements.map((element) => ({
        ...element,
        value: json[element.id],
      }))
    );
  }
};

return getValues();
```

## Clear element values after clicking the Submit or Reset button

The following example shows how to reset or modify form element values programmatically.

```javascript
context.panel.onOptionsChange({
  ...context.panel.options,
  elements: context.panel.options.elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  }),
});
```

{{< admonition type="note" >}}

The `context.panel.onOptionsChange()` handler calls refresh panel.

{{< /admonition >}}

The `context.panel.onOptionsChange()` handler is required to update the panel.

## Update the local state in Data Manipulation panel 3.1.0

The following example demonstrates how to update element values in the local state without refreshing the entire panel.

```javascript
context.panel.onChangeElements(
  elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  })
);
```

The `context.panel.onChangeElements()` function is required to update the element values in the local state.

## Simplified form elements `patchFormValue` helper

Before version 4.4.0, to update a form element value, you had to use `context.panel.elements.map()`. In version 4.4.0, a new function was added to simplify that approach. It accepts an object with element IDs as keys and their new values.

Before 4.4.0 version:

```javascript
context.panel.onChangeElements(
  context.panel.elements.map((element) =>
    element.id === "name" ? { ...element, value: "Alex" } : element
  )
);
```

The simplified version example:

```javascript
// only passed elements should be updated, the rest stay the same
context.panel.patchFormValue({ name: "Alex" });
// name and isAdmin
context.panel.patchFormValue({ name: "Alex", isAdmin: true });
```

## Simplified form elements `formValue` helper

Before version 4.4.0, to get form element values, you had to use `context.panel.elements.forEach()`. In version 4.4.0, a new function was added to simplify that approach. It returns an object with element IDs as keys.

Before 4.4.0 version:

```
const payload = {};

context.panel.elements.forEach((element) => {
  payload[element.id] = element.value;
});

// payload = { name: 'Alex', isAdmin: true }
```

The simplified version example:

```
context.panel.formValue // { name: 'Alex', isAdmin: true }
```
