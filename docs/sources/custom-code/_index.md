---
title: Custom Code
description: Learn how to use custom code to access panel options, REST API responses, form elements, and Grafana services in Business Forms.
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 50
---
# Custom Code

Custom code allows you to access the panel's options, REST API responses, form elements, and various Grafana services.

Custom code is executed after the `Initial` and `Update` requests, when `Element Value Changed`.

## Parameters

| Parameter                                                                                                                        | Description                                                                                                                                   | <span style={{fontSize:'14px'}}>Initial, Update</span> | <span style={{fontSize:'14px'}}>Change Value</span> | <span style={{fontSize:'14px'}}>ShowIf, DisableIf, Get Options</span> |
| :------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------- |
| [`context.element`](/plugins/business-forms/code/panel/#contextelement)                                                          | Current element                                                                                                                               |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.data`](/plugins/business-forms/code/panel/#paneldata)                                                            | Result set of panel queries.                                                                                                                  | :heavy_check_mark:                                     | :heavy_check_mark:                                  | :heavy_check_mark: (For `Get Options`)                                |
| [`context.panel.elements`](/plugins/business-forms/code/panel/#panelelements)                                                    | Form elements.                                                                                                                                | :heavy_check_mark:                                     | :heavy_check_mark:                                  | :heavy_check_mark:                                                    |
| [`context.panel.initial`](/plugins/business-forms/code/panel/#panelinitial)                                                      | Parsed values from the initial request.                                                                                                       | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.initialRequest()`](/plugins/business-forms/code/panel/#panelinitialrequest)                                      | Performs an initial request to reload the panel.                                                                                              | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.options`](/plugins/business-forms/code/panel/#paneloptions)                                                      | Panel's options.                                                                                                                              | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.onOptionsChange({})`](/plugins/business-forms/code/panel/#panelonoptionschangeoptions)                           | Modifies a handler to refresh the panel.                                                                                                      | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.onChangeElements([])`](/plugins/business-forms/code/panel/#panelonchangeelementsoptions)                         | Updates elements in the local state. Change elements. Accepts an array of new elements.                                                       | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.patchFormValue({})`](/plugins/business-forms/code/panel/#panelpatchformvaluevalues)                              | Update the value of the elements. Accepts an object.                                                                                          | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.setFormValue({})`](/plugins/business-forms/code/panel/#panelsetformvaluevalues)                                  | Update the value of the elements. Accepts an object. If value is not passed to the element, the value should be used from initial or cleared. | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.formValue()`](/plugins/business-forms/code/panel/#panelformvalue)                                                | Contains a current form value as object.                                                                                                      | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.response`](/plugins/business-forms/code/panel/#panelresponse)                                                    | Request's response.                                                                                                                           | :heavy_check_mark:                                     |                                                     |                                                                       |
| [`context.panel.setInitial({})`](/plugins/business-forms/code/panel/#panelsetinitialvalues)                                      | Specifies initial values for a custom initial request to highlight modified values and requests a user's confirmation.                        | :heavy_check_mark:                                     |                                                     |                                                                       |
| [`context.panel.enableSubmit()`](/plugins/business-forms/code/panel/#panelenablesubmit)                                          | Enable Submit button                                                                                                                          | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.disableSubmit()`](/plugins/business-forms/code/panel/#paneldisablesubmit)                                        | Disable Submit button                                                                                                                         | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.enableReset()`](/plugins/business-forms/code/panel/#panelenablereset)                                            | Enable Reset button                                                                                                                           |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.disableReset()`](/plugins/business-forms/code/panel/#paneldisablereset)                                          | Disable Reset button                                                                                                                          |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.enableSaveDefault()`](/plugins/business-forms/code/panel/#panelenablesavedefault)                                | Enable Save Default button                                                                                                                    |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.disableSaveDefault()`](/plugins/business-forms/code/panel/#paneldisablesavedefault)                              | Disable Save Default button                                                                                                                   |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.setError('Message')`](/plugins/business-forms/code/panel/#panelseterrormessage)                                  | Displays an error on panel.                                                                                                                   |                                                        | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.add(section)`](/plugins/business-forms/code/panel/#sectionsutilsaddsection)                        | Add a new Section. Added in v4.9.0.                                                                                                           | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.update(sections)`](/plugins/business-forms/code/panel/#sectionsutilsupdatesections)                | Change Sections. Added in v4.9.0.                                                                                                             | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.remove(id)`](/plugins/business-forms/code/panel/#sectionsutilsremoveid)                            | Remove Section. Added in v4.9.0.                                                                                                              | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.assign(id, elements)`](/plugins/business-forms/code/panel/#sectionsutilsassignidelements)          | Assign elements to Section. Added in v4.9.0.                                                                                                  | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.unassign(elements)`](/plugins/business-forms/code/panel/#sectionsutilsunassignelements)            | Unassign elements from Section. Added in v4.9.0.                                                                                              | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.get(id)`](/plugins/business-forms/code/panel/#sectionsutilsgetid)                                  | Get Section by id. Return Section with elements assign to section. Added in v4.9.0.                                                           | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.getAll()`](/plugins/business-forms/code/panel/#sectionsutilsgetall)                                | Get All Sections. Return Sections with elements assign to each section. Added in v4.9.0.                                                      | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.collapse(id)`](/plugins/business-forms/code/panel/#sectionsutilscollapseid)                        | Collapse Section. Updated in v4.9.0.                                                                                                          | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.expand(id)`](/plugins/business-forms/code/panel/#sectionsutilsexpandid)                            | Expand Section. Updated in v4.9.0.                                                                                                            | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.toggle(id)`](/plugins/business-forms/code/panel/#sectionsutilstoggleid)                            | Toggle (Collapse/Expand) Section. Updated in v4.9.0.                                                                                          | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.panel.sectionsUtils.expandedState`](/plugins/business-forms/code/panel/#sectionsutilsexpandedstate)                    | Return Expand/Collapse State for Sections. Updated in v4.9.0.                                                                                 | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.locationService`](/plugins/business-forms/code/panel/#grafanalocationservice)                                  | Grafana's `locationService` function to work with the browser's location and history.                                                         | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.backendService`](/plugins/business-forms/code/panel/#grafanabackendservice)                                    | Grafana's `backendService` used to communicate to a remote backend such as the Grafana backend, a datasource etc.                             | :heavy_check_mark:                                     |                                                     |                                                                       |
| [`context.grafana.notifyError(['Header', 'Message'])`](/plugins/business-forms/code/panel/#grafananotifyerrorheader-message)     | Displays an error.                                                                                                                            | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.notifySuccess(['Header', 'Message'])`](/plugins/business-forms/code/panel/#grafananotifysuccessheader-message) | Displays a success notification.                                                                                                              | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.notifyWarning(['Header', 'Message'])`](/plugins/business-forms/code/panel/#grafananotifywarningheader-message) | Displays a warning.                                                                                                                           | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.eventBus`](/plugins/business-forms/code/panel/#grafanaeventbus)                                                | Publish and subscribe to application events.                                                                                                  | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.templateService`](/plugins/business-forms/code/panel/#grafanatemplateservice)                                  | Grafana's `templateService` function that provides access to variables and enables the update of a time range.                                | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.grafana.refresh()`](/plugins/business-forms/code/panel/#grafanarefresh)                                                | Function to refresh dashboard panels using application events.                                                                                | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |
| [`context.utils.fileToBase64(file)`](/plugins/business-forms/code/panel/#utilsfiletobase64file)                                  | Convert to base64 format                                                                                                                      | :heavy_check_mark:                                     |                                                     |                                                                       |
| [`context.utils.toDataQueryResponse(data)`](/plugins/business-forms/code/panel/#utilstodataqueryresponseres)                     | Parse the results from /api/ds/query into a DataQueryResponse                                                                                 | :heavy_check_mark:                                     | :heavy_check_mark:                                  |                                                                       |

## Inspect

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

## Refresh Dashboard after update request or show warning

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

## Update variable after update request to interact with other panels

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.panel.response.json().then((resp) => {
    context.grafana.locationService.partial({ "var-name": resp["name"] }, true);
  });
}
```

## Perform Initial Request after update request or show error

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

## Perform initial request only on dashboard load

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

## Clear elements' values after click on the Submit or Reset button

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

## Update local state in Data Manipulation panel 3.1.0

```javascript
context.panel.onChangeElements(
  elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  })
);
```

The `context.panel.onChangeElements()` function is required to update the element values in the local state.

## Simplified the Form Elements `patchFormValue` helper

Before version 4.4.0, in order to update a form element value, a user had to use `context.panel.elements.map()`. In the 4.4.0, we added a new function to simplify that approach. It has an object's key as an inpit parameter and a new value.

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

## Simplified the Form Elements `formValue` helper

Before version 4.4.0, in order to get a form element value, a user had to use `context.panel.elements.forEach()`. In the 4.4.0, we added a new function to simplify that approach. It has an object's key as an inpit parameter.

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
