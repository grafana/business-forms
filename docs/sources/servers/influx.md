---
title: InfluxDB API
menuTitle: InfluxDB
description: Learn how to use the InfluxDB v2 API to retrieve and update data through the Business Forms panel.
keywords:
  - business forms
  - api server
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 10
---

# InfluxDB API

{{< admonition type="note" >}}

For details about API endpoints, see the [InfluxDB v2 API reference](https://docs.influxdata.com/influxdb/cloud/reference/api/).

{{< /admonition >}}

You can use the InfluxDB API to retrieve and update data through the Data Manipulation panel.

Thanks to community member [fercasjr](https://github.com/fercasjr) for providing examples.

## Query data

Update according to your environment:

- IP address or name of the server (`localhost` in the example)
- InfluxDB org
- Token
- Query (any valid query you want to test)

```js
const query = `
from(bucket: "bucket_example") 
	|> range(start: -1mo)
	|> filter(fn: (r) => r["_measurement"] == "measurement_example")
	|> filter(fn: (r) => r["_field"] == "field_example")
	|> window(every: 24h, period:24h ,offset:4h)
	|> last()
	|> yield(name: "last")
`;

/**
 * Set URL
 */
const url = `http://localhost:8086/api/v2/query?org=org_example`;

/**
 * Fetch
 */
const resp = fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.flux",
    Accept: "application/csv",
    Authorization: "Token INFLUX_API_TOKEN",
  },
  body: query,
})
  .catch((error) => {
    console.error(error);
  })
  .then((resp) => {
    console.log(resp);
  });
```

To write data to InfluxDB you can use the `experimental.to()`, `wide.to(), or `to()` functions in the Flux language or use the API.

## Write data

The generated payload of the HTTP POST request includes the following:

- `measurement_name`: name of the measurement that is written into InfluxDB (in this example is hardcoded).
- `tag1`: name of the tag that is written into InfluxDB (also hardcoded).
- `field1` and `field2`: Names of fields written to InfluxDB (also hardcoded).
- `body.element_id1` and `body.element_id2`: Field values written to InfluxDB.
- `Date.now()`: Code snippet for generating the measurement timestamp (in milliseconds).

The body's elements come from the plugin's form and are placed inside `${}`.

- `body.element_id1` gets the `element_id1` value from the `body` object.

```js
/**
 * Set body
 */
const body = {}; //this is an empty object called body

/**
 * The following code gets each element ant if it has changed then updates the values and passes them to "body" object
 */
context.panel.options.elements.forEach((element) => {
  if (!context.panel.options.update.updatedOnly) {
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
 * Important to declare precision for timestamp, by default is ns and in the following code a timestamp is generated in ms
 */
const url = `http://localhost:8086/api/v2/write?org=org_example&bucket=bucket_example&precision=ms`;

/**
 * Fetch
 */
const resp = fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
    Accept: "application/csv",
    Authorization: "Token INFLUX_API_TOKEN",
  },

  /**
   * This is the metric to be written in influxDB.
   * The syntax is explained in the documentation "line-protocol"*
   */
  body: `measurement_name,tag1=${body.element_id1} field1="${
    body.element_id2
  }",field2="${body.element_id3}" ${Date.now()}`,
})
  .catch((error) => {
    console.error(error);
  })
  .then((resp) => {
    console.log(resp);
  });
```
