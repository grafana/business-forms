---
title: Node-RED
description: Learn how to use Node-RED as a visual API gateway for authentication, CORS management, and database integration with the Business Forms panel.
keywords:
  - business forms
  - api server
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 40
---
# Node-RED

Node-RED is a good companion for Data Manipulation panel because it is simple, provides a visual interface, and does not require any developer experience.

Thanks to the community member [Alejandro Guida](https://github.com/canob) for the explanation.

## Use Cases

Node-RED usage scenarios involving the Data Manipulation panel plugin:

- Manage authentication (acquire and renew tokens) for API Services using OAuth2 authentication. Because the Data Manipulation Plugin cannot handle this type of authentication, the API inside API approach is used.
- API Gateway to relax CORS restrictions, because Node-RED's default response includes the `Access-Control-Allow-Origin: *` header.
- Manage authentication across all destination databases and APIs to preserve a single authentication type for all services.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/node-red.png" class="border" alt="Node-RED flow to implement GET and POST endpoints for multiple databases." >}}
