# Business Forms for Grafana
[![CI](https://github.com/grafana/business-forms/actions/workflows/push.yml/badge.svg)](https://github.com/grafana/business-forms/actions/workflows/push.yml)
[![CD](https://github.com/grafana/business-forms/actions/workflows/publish.yml/badge.svg)](https://github.com/grafana/business-forms/actions/workflows/publish.yml)
[![License](https://img.shields.io/github/license/grafana/business-forms)](https://github.com/grafana/business-forms/blob/main/LICENSE)

>This project was originally contributed by [Volkov Labs](https://github.com/volkovlabs/business-forms) - thanks for all your great work!
>
>We have republished under the same plugin ID, keeping the community signature. This means you can simply update your plugin version. A new ID would have required manual updates to your dashboards. For additional information on the changes, see the [Notices](https://github.com/grafana/business-forms/blob/main/NOTICES).

This project is currently maintained by Grafana Labs. We welcome pull requests and will review them on a best-effort basis. If you're interested in taking on this project long-term, contact [integrations@grafana.com](mailto:integrations@grafana.com). We're eager to work with new maintainers and eventually hand over the project.

The **Business Forms panel** is a groundbreaking plugin for Grafana, designed to empower users by allowing direct interaction with application data and configurations within dashboards. Whether you're managing data or customizing settings, this plugin streamlines workflows with an intuitive interface.

## 📋 Requirements

Ensure your Grafana version meets the following requirements for compatibility with Business Forms:

- **Business Forms 6.X**: Grafana 11 or 12
- **Business Forms 4.X, 5.X**: Grafana 10.3 or 11
- **Data Manipulation 3.X**: Grafana 9 or 10
- **Data Manipulation 2.X**: Grafana 8.5 or 9
- **Data Manipulation 1.X**: Grafana 8

## 🛠️ Getting Started

Install the Business Forms panel easily via the [Grafana Plugins Catalog](https://grafana.com/grafana/plugins/volkovlabs-form-panel/) or using the Grafana CLI.

### Install via Grafana CLI

```bash
grafana cli plugins install volkovlabs-form-panel
```

## ✨ Key Features

- **Customizable Forms**: Create tailored forms to suit your specific needs.
- **Custom Code Support**: Write custom code for initial and update requests.
- **API Integration**: Supports `GET`, `DELETE`, `PATCH`, `POST`, and `PUT` requests for data manipulation.
- **Request Headers**: Add custom headers to initial and update requests.
- **Flexible UI**: Customize Submit/Reset buttons and form layouts.
- **Sectional Layouts**: Organize form elements into distinct sections.
- **User Confirmation**: Prompt users for confirmation before executing updates.
- **Payload Control**: Send all data or only updated elements in requests.
- **Notifications**: Display success/error messages via custom code.
- **Code Suggestions**: Get parameter suggestions in the built-in code editor.

## 📚 Documentation

Explore detailed guides and resources to maximize the potential of Business Forms:

| Section                                                                      | Description                                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Data Flow](https://volkovlabs.io/plugins/business-forms/data-flow/)         | Understand data flow and its specifics.                     |
| [Form Elements](https://volkovlabs.io/plugins/business-forms/form-elements/) | Learn about form element configurations.                    |
| [REST API](https://volkovlabs.io/plugins/business-forms/architecture/)       | Dive into REST API architecture and NGINX usage.            |
| [Custom Code](https://volkovlabs.io/plugins/business-forms/code/)            | Access plugin options, API responses, and Grafana services. |
| [Features](https://volkovlabs.io/plugins/business-forms/features/)           | Explore all plugin capabilities.                            |
| [Servers](https://volkovlabs.io/plugins/business-forms/servers/)             | View examples of API server implementations.                |
| [Tutorials](https://volkovlabs.io/plugins/business-forms/tutorials/)         | Follow step-by-step guides.                                 |
| [Release Notes](https://volkovlabs.io/plugins/business-forms/release/)       | Stay updated with the latest features and fixes.            |

## 📜 License

This project is licensed under the Apache License Version 2.0. See the [LICENSE](https://github.com/grafana/business-forms/blob/main/LICENSE) file for details.
