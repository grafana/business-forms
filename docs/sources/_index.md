---
title: Business Forms
description: Learn how to insert and update application data and modify configuration directly from your Grafana dashboard using the Business Forms panel.
keywords:
  - business forms
labels:
  products:
    - enterprise
    - oss
    - cloud
weight: 10
---
# Business Forms

The Business Forms panel is a conceptually new plugin for Grafana. It is the first plugin that allows inserting and updating application data, as well as modifying configuration directly from your Grafana dashboard.

## Requirements

- Business Forms panel 6.X requires **Grafana 11** or **Grafana 12**.
- Business Forms panel 4.X, 5.X requires **Grafana 10** or **Grafana 11**.
- Data Manipulation panel 3.X requires **Grafana 9** or **Grafana 10**.
- Data Manipulation panel 2.X requires **Grafana 9** or **Grafana 8.5**.
- Data Manipulation panel 1.X requires **Grafana 8**.

## Getting Started

You can install the Business Forms panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/volkovlabs-form-panel/) or use the Grafana command line tool.

{{< youtube id="1qYzHfPXJF8" >}}

For the latter, please use the following command:

```sh
grafana cli plugins install volkovlabs-form-panel
```

## Highlights

- Provides functionality to create customizable forms.
- Supports custom code for initial and update requests.
- Supports API requests, including the `GET` request to get initial values and the `DELETE`, `PATCH`, `POST`, and `PUT` requests to send values updated in the form.
- Allows adding request headers to initial and update requests.
- Supports customization of the Submit and Reset buttons as well as the form layout.
- Allows splitting form elements into sections.
- Allows requesting the user's confirmation before running an update request.
- Allows sending all or only updated elements in the request payload.
- Allows displaying success and error notifications through custom code.
- Supports suggestions for available parameters when writing program code in the code editor.

<Image
  title="Business Forms panel for Grafana."
  src="/img/plugins/business-forms/panel.png"
/>

## Tutorial

In this video, Daria provides two examples of what the Business Forms plugin can do and then outline the configuration steps. Towards the end, she emphasizes that the Business Forms panel can be created dynamically or, in other words, as a code with a reference where you can get copy-paste examples.

{{< youtube id="ulbe8U8-IFA" >}}

We have many other tutorials that you can find helpful. You can review all related to this plugin tutorials [here](/plugins/business-forms/tutorials).

## Documentation

| Section                        | Description                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| [Data Flow](data-flow)         | Explains the data flow and its specifics.                                                  |
| [Form Elements](form-elements) | Explains the specifics of form elements.                                                   |
| [REST API](architecture)       | Explains the REST API architecture and how to use NGINX.                                   |
| [Custom Code](code)            | Explains how to access plugin options, API responses, form elements, and Grafana services. |
| [Features](features)           | Explains the plugin features.                                                              |
| [Servers](servers)             | Provides examples of API server implementations.                                           |
| [Tutorials](tutorials)         | Easy to follow tutorials                                                                   |
| [Release Notes](release)       | Stay up to date with the latest features and updates.                                      |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-forms/blob/main/LICENSE).

<Feedback />
