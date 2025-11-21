---
tags:
  - Business Forms
image: /img/plugins/business-forms/form-api.png
title: 'REST API'
description: 'Learn about REST API in Grafana'
labels:
  products:
    - enterprise
    - oss
weight: 40
---
import BlogPost from "@theme/BlogPost";
import Image from "@theme/Image";
import Youtube from "@theme/Youtube";

# REST API

The Business Forms panel can request data (`GET` request) and update data (`DELETE`, `PATCH`, `POST`, or `PUT` request) or configuration through REST API.

<Image
  title="Business Forms panel uses GET or POST/PUT request to interact with API server."
  src="/img/plugins/business-forms/form-api.png"
/>

## JSON Payload

Form elements defined in the panel options are used to parse data within the initial request and send data within the update request.

<Image
  title="Form elements defined in Data Manipulation panel."
  src="/img/plugins/business-forms/elements.png"
  width="80%"
/>

The JSON response of the initial request includes the form elements' identifiers and values. The response is parsed and initial values on the form are updated.

```json
{ "name": "Name", "amount": 30, "updated": false, "step": 4 }
```

Once values have been updated, all the form elements will create a similar payload for the update request.

## NGINX

We recommend that you run Grafana behind an NGINX reverse proxy for an additional security layer. The reverse proxy also allows you to expose additional API endpoints and static files within the scope of the same domain, which makes it CORS-ready.

<Image
  title="Grafana and Server API behind an NGINX reverse proxy."
  src="/img/plugins/business-forms/form-nginx-api.png"
/>

## CORS

Operation of the Business Forms panel plugin may be blocked by a CORS policy when accessing an API server. You can find a rejection error in the browser's console.

<Image
  title="Rejection error in the browser's console."
  src="/img/plugins/business-forms/cors.png"
/>

Please consider that Grafana will not explicitly indicate a CORS error.

### Policies

**Same-Origin** is a policy that strictly restricts interaction with resources solely to the same domain, host, and port. For example, the `abc.com` domain can retrieve data from `abc.com/page1`, but cannot access any other domain such as `anyotherdomain.com`.

**Cross-Origin Resource Sharing (CORS)** policy offers more flexibility by allowing interactions between different domains. When CORS restrictions are disabled, any domain can freely request data. On the other hand, when CORS restrictions are enabled, only certain domains designated in its allow list are permitted.

## Connect to API Server

We acknowledge the risks of data manipulation and consider security concerns seriously. This blog post explores three secure ways to connect Data Manipulation panel to an API server.

<BlogPost id="how-to-connect-the-data-manipulation-plugin-for-grafana-to-api-server-1abe5f60c904" />
