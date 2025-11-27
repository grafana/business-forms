---
title: REST API
description: Learn how to use REST API to request and update data or configuration through the Business Forms panel.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 40
---

# REST API

The Business Forms panel requests data (`GET` request) and updates data (`DELETE`, `PATCH`, `POST`, or `PUT` request) or configuration through REST API.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/form-api.png" class="border" alt="Business Forms panel uses GET or POST/PUT request to interact with API server." >}}

## JSON payload

The panel uses form elements defined in the panel options to parse data within the initial request and send data within the update request.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/elements.png" class="border" alt="Form elements defined in Data Manipulation panel." >}}

The JSON response of the initial request includes the form elements' identifiers and values. The panel parses the response and updates the initial values on the form.

```json
{ "name": "Name", "amount": 30, "updated": false, "step": 4 }
```

After you update values, all the form elements create a similar payload for the update request.

## NGINX

It's recommended that you run Grafana behind an NGINX reverse proxy for an additional security layer. The reverse proxy also allows you to expose additional API endpoints and static files within the scope of the same domain, which makes it CORS-ready.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/form-nginx-api.png" class="border" alt="Grafana and Server API behind an NGINX reverse proxy." >}}

## CORS

Operation of the Business Forms panel plugin may be blocked by a CORS policy when accessing an API server. You can find a rejection error in the browser's console.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/cors.png" class="border" alt="Rejection error in the browser's console." >}}

Note that Grafana doesn't explicitly indicate a CORS error.

### Policies

**Same-Origin** is a policy that strictly restricts interaction with resources to the same domain, host, and port. For example, the `abc.com` domain can retrieve data from `abc.com/page1`, but can't access any other domain such as `anyotherdomain.com`.

**Cross-Origin Resource Sharing (CORS)** policy offers more flexibility by allowing interactions between different domains. When CORS restrictions are disabled, any domain can request data. When CORS restrictions are enabled, only certain domains designated in its allow list are permitted.

## Connect to API server

Data manipulation can be risky and these security concerns have been considered seriously. This [blog post](https://volkovlabs.io/blog/how-to-connect-the-data-manipulation-plugin-for-grafana-to-api-server-1abe5f60c904/) explores three secure ways to connect Data Manipulation panel to an API server.
