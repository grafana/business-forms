---
tags:
  - Business Forms
  - API Server
image: /img/plugins/business-forms/panel.png
title: 'API Server for MySQL'
description: 'Learn about API Server for MySQL in Grafana'
labels:
  products:
    - enterprise
    - oss
---
import Code from "@theme/Code";
import Image from "@theme/Image";

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
