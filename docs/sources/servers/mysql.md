---
title: API Server for MySQL
menuTitle: MySQL
description: Learn how to set up a Node.js API server to retrieve and update values in a MySQL database using the Business Forms panel.
keywords:
  - business forms
  - api server
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 30
---
# API Server for MySQL

API Server on Node.js enables retrieving and updating values in the MySQL database with Data Manipulation panel.

## Features

- CORS enabled.
- Customizable through environment variables.
- Includes checks and error handling.
- Includes [SQL statement](https://github.com/VolkovLabs/business-forms/blob/main/server-mysql/feedbacks.sql), the [Docker image](https://github.com/VolkovLabs/business-forms/blob/main/server-mysql/Dockerfile), and [README](https://github.com/VolkovLabs/business-forms/blob/main/server-mysql/README.md) to get started.

## Example

<Code
  url="https://github.com/VolkovLabs/business-forms/blob/main/server-mysql/server.ts"
  language="js"
/>
