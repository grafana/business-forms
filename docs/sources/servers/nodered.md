---
tags:
  - Business Forms
  - API Server
image: /img/plugins/business-forms/panel.png
title: 'Node-RED'
description: 'Learn about Node-RED in Grafana'
labels:
  products:
    - enterprise
    - oss
---
import Image from "@theme/Image";

# Node-RED

Node-RED is a good companion for Data Manipulation panel because it is simple, provides a visual interface, and does not require any developer experience.

Thanks to the community member [Alejandro Guida](https://github.com/canob) for the explanation.

## Use Cases

Node-RED usage scenarios involving the Data Manipulation panel plugin:

- Manage authentication (acquire and renew tokens) for API Services using OAuth2 authentication. Because the Data Manipulation Plugin cannot handle this type of authentication, the API inside API approach is used.
- API Gateway to relax CORS restrictions, because Node-RED's default response includes the `Access-Control-Allow-Origin: *` header.
- Manage authentication across all destination databases and APIs to preserve a single authentication type for all services.

<Image
  title="Node-RED flow to implement GET and POST endpoints for multiple databases."
  src="/img/plugins/business-forms/node-red.png"
/>
