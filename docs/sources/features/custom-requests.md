---
title: Custom Requests
description: Learn how to create custom initial and update requests with custom code for the Business Forms panel.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
---
# Custom Requests

The Business Forms panel allows you to create your own initial and update requests with custom code.

## Initial Request

Select `Code` to choose an initial request, and then define the custom code:

{{< admonition type="note" >}}

The `context.panel.onOptionsChange()` handler calls the refresh panel.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.onOptionsChange()` in the Initial Request will cause the panel to reload constantly.

{{< /admonition >}}

<Image
  title="Disable Synchronize with data to avoid endless reloading of the panel if onOptionsChange() is used in the initial request."
  src="/img/plugins/business-forms/infinity-reload.png"
/>

```js
const bucketsSelect = context.panel.elements.find(
  (element) => element.id === "buckets"
);

/**
 * Set URL
 */
const url = `http://localhost:3001/test`;

/**
 * Fetch
 */
const resp = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "PRIVATE-TOKEN": "$token",
  },
})
  .catch((error) => {
    console.error(error);
  })
  .then(async (resp) => {
    const body = await resp.json();

    bucketsSelect.options = body.buckets.map((value) => {
      return { label: value, value };
    });

    context.panel.onOptionsChange(options);
  });
```

### Initial values

To support the `Highlight changed values` and `Require Confirmation` features, you need to use the `setInitial({})` function within your custom code to update initial values:

```js
context.panel.setInitial({ value: 99, name: "Test" });
```

## Update Request

Select `Code` to choose an update request, and then define the custom code. Depending on the selected payload option, it will add all or only the updated values.

```js
/**
 * Set body
 */
const body = {};
context.panel.options.elements.forEach((element) => {
  if (!options.update.updatedOnly) {
    body[element.id] = element.value;
    return;
  }

  /**
   * Skip not updated elements
   */
  if (element.value === initial[element.id]) {
    return;
  }

  body[element.id] = element.value;
});

/**
 * Set URL
 */
const url = `http://localhost:3001/${body["name"]}`;

/**
 * Fetch
 */
const resp = fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "PRIVATE-TOKEN": "$token",
  },
  body: JSON.stringify(body),
})
  .catch((error) => {
    console.error(error);
  })
  .then((resp) => {
    console.log(resp);
  });
```
