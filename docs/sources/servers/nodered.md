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

Node-RED is a good companion for the Data Manipulation panel because it's simple, provides a visual interface, and doesn't require developer experience.

Thanks to community member [Alejandro Guida](https://github.com/canob) for this explanation.

## Use cases

Node-RED usage scenarios with the Data Manipulation panel:

- Manage authentication (acquire and renew tokens) for API services using OAuth2 authentication. Because the Data Manipulation panel can't handle this type of authentication, you can use the API inside API approach.
- Use an API gateway to relax CORS restrictions, because Node-RED's default response includes the `Access-Control-Allow-Origin: *` header.
- Manage authentication across all destination databases and APIs to maintain a single authentication type for all services.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/node-red.png" class="border" alt="Node-RED flow to implement GET and POST endpoints for multiple databases." >}}
