---
title: Data Flow
description: Learn how data flows through the Business Forms panel from initial requests to update requests and custom code execution.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 20
---
# Data Flow

{{< admonition type="note" >}}

Relevant starting from version 3.2.0.

{{< /admonition >}}

The Data Manipulation plugin offers to convert any Grafana dashboard into a fully functional web application. No wonder getting lost in all option parameters and their interconnections is easy.

The schema below is created to illustrate the major parts and their roles.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/data-manipulation-flow.png" class="border" alt="Data flow diagram for the Data Manipulation panel." >}}

## Initial Request

The initial request is executed after the browser finishes a page-loading step. You can configure your Initial request as Query, Data Source, and REST API.

### Query

The query is short for the native Grafana query. Any initial request carries data from a data source into Grafana and is what the core Grafana does already with excellence. The Query method works with the data frames prepared by the Data Source, the one you specified on the left.

This method was created to allow leveraging the existing Grafana data extraction mechanism. To make it work, map every Data Manipulation form element to the appropriate data frame field.

{{< admonition type="note" >}}

Since version 4.2.0. the `Query Field` and `Field Name` fields have been relocated from the `Elements` category to the `Initial Fields` options category.

{{< /admonition >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/query.png" class="border" alt="Configure the Initial Request for Query. " >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/query-new.png" class="border" alt="New location of `Query Field` fields." >}}

### Data source

Do not confuse this data source with the one you can select on the left-hand side. This is a different parameter located in the **Update Request** category and is visible when the **Data source** type is selected.

The **Data source** type is more flexible than the **Query** type. However, it means the developer must also take more responsibility by creating the **Initial Payload Request**.

The **Initial Payload Request** is a mandatory piece of code that needs to contain the database request at the bare minimum. More complex data parsing functionality could be added if required.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/ds-all.png" class="border" alt="Steps to configure the Initial Request for Data Source." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/ds-all-new.png" class="border" alt="Steps to configure the Initial Request for Data Source. New location of `Field Name` fields." >}}

### REST API

The **REST API** type works with an external API server. When specifying the API URL, you can use global and dashboard variables. Header parameters are available as separate options.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/rest-get.png" class="border" alt="Steps to configure the Initial Request for REST API." >}}

You can find ready-to-use API servers for Deno, InfluxDB, JSON API, MySQL, Node-Red, and PostgreSQL in [servers section](../servers).

Find more information, tips and tricks in our [documentation](../architecture).

## Initial Request Custom Code

To create post-processing logic, you can access panel options, API responses, form elements, Grafana services, dashboard, and global variables. Find the [code snippet here](../code).

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/init-custom.png" class="border" alt="Initial Request Custom Code exists for every Initial Request type." >}}

## Ball is on the user's side

The Data Manipulation form rests at this step, awaiting the user's actions.

## Highlight Changes

You can enable the Highlight Changes feature, which displays all modifications made by the user in a specified color. For the Query and REST API Initial request types, simply enabling the feature in the plugin edit mode is enough.

For the Data Source type, you must use the `SetInitial()` function in the Initial Request Custom Code. See the illustration for the Initial Request, Data Source type above (on the picture). Also, find [code examples here](../request).

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/highlight.png" class="border" alt="Enable Highlight Changes to see the new values on the form." >}}

## Reset button

The reset button is not shown by default. To review all available options, switch the visibility parameter to anything, but **Hidden**.
**Primary**, **Secondary** and **Destructive** are pre-set visualization templates. In the **Custom**, you can specify foreground color, background color, icon and the text to replace the 'Reset' label if needed.

When this button is not hidden (any other mode is selected), you will also get the Reset Request category. There, you can go with either Custom Code, Initial Request or Data Source option.

The **Initial request** is selected by default. In that event, the plugin executes the Initial Request again as if the form is being loaded for the first time.

With the **Data Source** reset action you can specify a data source for the Reset Request and set payload in the following **Custom code** area.

In the **Custom code**, you can have any custom logic required. For instance, set all form elements to their defaults.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/reset.png" class="border" alt="Reset button can call the Initial Request or execute any custom code." >}}

## Update request

The Update Request carries data from the Grafana dashboard to your data source. There are two ways of doing so - Data Source and Rest API. This process is independent of the Initial Request, which means you can use any combination of Initial and Update Request types.

### Data Source

For the Data Source type, start with the Data Source parameter. Then go to the Update Request Payload, select Custom code and create a payload script there. Use JavaScript and the language of your data source to create a code that will update your data source data.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/update-request-ds.png" class="border" alt="Steps to configure the Update Request for Data Source." >}}

### Use Initial Request after Update Request

You can trigger the `Initial Request` immediately after updating the data using Custom Code. In Initial Request mode, various types can be used — but there's one important point to consider if you're using `QUERY` as the initial request type.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/update-custom-code.png" class="border" alt="Code and logic after update request" >}}

If the type is `QUERY`, it accepts and sets values from data.

If you're using it in combination with an update query of type DataSource, you need to call `context.grafana.refresh()` in the code that runs after a successful update.
Since this may take some time, it's recommended to use it with `setTimeout` to ensure proper execution. In this case, the query will fetch the updated data from the data source.

Another possible approach is to update the variables in the data source, which will trigger a second query and retrieve the new data.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/code-after-update-with-timeout.png" class="border" alt="Custom code: setTimeout combine with context.grafana.refresh()" >}}

### Query editor and Frontend Data Source

{{< admonition type="note" >}}
Query editor and Frontend Data Sources are available starting from version 4.0.0.
{{< /admonition >}}

This feature is related to the:

- **Initial Request** -> **Initial Action** -> **Data Source**,
- **Update Request** -> **Update Action** -> **Data Source**.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/init-update.png" class="border" alt="The payload area relates to the Data Source (Initial and Update requests)." >}}

We simplified work with the payload creation. The Business Forms panel has a designated area to enter the payload request.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/ini-payload.png" class="border" alt="Payload for the Initial Request example." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/update-payload.png" class="border" alt="Payload for the Update Request example." >}}

Sometimes, when migrating to a new version, you may need to convert a large number of panels. This involves creating payloads and updating queries using the new payload format.

To ensure a smoother transition, you can use a more seamless approach.
For example, you can keep the old payload generation logic and simply return a static string in the query editor instead of relying on the new payload.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/seamless-update.png" class="border" alt="Seamless Query Update Example" >}}

### Use nested objects in payload

Creating a payload for the request can be configured in a variety of ways. Keys may contain various values including nested objects. Here is a simple example:

```js
const testMatchers = [
  {
    id: "1",
    value: 1,
  },
  {
    id: "2",
    value: 2,
  },
];

let payload = {
  title: "",
  body: "",
  userId: 0,
  matchers: testMatchers,
};

context.panel.elements.forEach((element) => {
  if (element.id === "postTitle") {
    payload.title = element.value;
  }

  if (element.id === "postBody") {
    payload.body = element.value;
  }

  if (element.id === "postId") {
    payload.userId = element.value;
  }
});

return payload;
```

#### Payload example

```js
{
  "title": "${payload.title}",
  "body": "${payload.body}",
  "userId": "${payload.userId}",
  "matchers": ${payload.matchers}
}
```

After calling the update request, you may get an error. In the body of the request you may see something like:

```
\"matchers\": [object Object],[object Object],[object Object],[object Object]
```

The code editor provides all required tools to use interpolation and value escaping for nested objects. Use `JSON.stringify` and `replaceAll('\"', '\\"')` for nested values in the payload object.

#### Updated example

```
const testMatchers = [
  {
    id: "1",
    value: 1,
  },
  {
    id: "2",
    value: 2,
  },
];

let payload = {
  title: "",
  body: "",
  userId: 0,
  /**
   * Nested value type
   */
  matchers: JSON.stringify(testMatchers).replaceAll('\"', '\\"'),
};

context.panel.elements.forEach((element) => {
  if (element.id === "postTitle") {
    payload.title = element.value;
  }

  if (element.id === "postBody") {
    payload.body = element.value;
  }

  if (element.id === "postId") {
    payload.userId = element.value;
  }
});

return payload;
```

### Use Text Area with multiple lines

Text Area element allows you to create text with multiple lines:

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/text-area-multiline.png" class="border" alt="Text Area element with multiple lines." >}}

After entering the data and submitting the form, you may see a data source error. The issue is caused by not properly processing and converting multiple lines in the payload.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/datasource-error-update.png" class="border" alt="Data source update error with multiple lines." >}}

To avoid this behavior, please add following steps in the Create Payload code editor:

- Find element refer to the TextArea element.
- Add replace logic to value `payload[element.id] = element.value.replaceAll("\n", "\\n");`

#### Code example

```js
const payload = {};

context.panel.elements.forEach((element) => {
  if (!element.value) {
    return;
  }

  /**
   * Required logic to update the value
   */
  if (element.id === "description") {
    payload[element.id] = element.value.replaceAll("\n", "\\n");
    return;
  }

  payload[element.id] = element.value;
});

/**
 * Check payload using developer tools
 */
console.log("update payload:", payload);

/**
 * Data Source payload
 */
return payload;
```

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/datasource-create-payload-code-editor.png" class="border" alt="Create payload code editor with custom payload to update multiple lines." >}}

### REST API

See the description for the Initial Request REST API. Both Initial and Update requests have the same parameters. Also similarly, you can use global and dashboard variables in the API server call along with header parameters.

## Submit button

You can enable the Confirmation step if needed. This step looks like a popup window with old and new values. For the Query and REST API Initial request types, simply enabling the feature in the plugin edit mode, Update Request category, is enough.

For the Data Source type, you must use the `SetInitial()` function in the Initial Request Custom Code. See the illustration for the Initial Request, Data Source type above (on the picture).

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/confirm.png" class="border" alt="Confirmation step looks like a table with old and new values." >}}

Following Confirmation, the Submit button initiates the Update Request.

## Update Request Custom Code

Or in other words, the post-processing step. Similarly to the Initial Request Custom Code, this step exists in all Update Request Custom Code types. You can access the same entities from the code: panel options, API responses, form elements, Grafana services, dashboard, and global variable. Find the [code snippet here](../code).

For example, during the post-processing, you can output a status message, transition the user to another dashboard, reload a page, call an initial request, etc.

## Save Default Button

In addition to the Submit and Reset button, there is a third one - Save Default. It saves the current form values in the dashboard. You can choose an icon and text instead of the pre-set ones.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/default-button.png" max-width="400px" class="border" alt="Save Default Button configuration." >}}

## Initial Request vs Update Request

Below is the comparative table showing the similarities and differences between the initial and update requests.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/init-update.png" class="border" alt="Similarities and differences between the initial and update requests." >}}

## Buttons

The below schema summarises the information about buttons available in the Data Manipulation form.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/buttons.png" class="border" alt="Three buttons are available in the Data Manipulation form." >}}
