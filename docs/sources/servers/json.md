---
title: JSON API Server
menuTitle: JSON
description: Learn how to set up a JSON API server on Node.js to retrieve and update JSON objects for testing the Business Forms panel.
keywords:
  - business forms
  - api server
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 20
---
# JSON API Server

JSON API Server on Node.js enables retrieving and updating JSON objects to test Data Manipulation panel.

## Features

- CORS enabled.
- Update requests can be `PATCH`, `POST`, or `PUT`.
- Includes the [Docker image](https://github.com/VolkovLabs/business-forms/blob/main/server-json/Dockerfile) to get started.

## Example

<Code
  url="https://github.com/VolkovLabs/business-forms/blob/main/server-json/server.ts"
  language="js"
/>
