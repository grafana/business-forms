---
title: info use options change
---
{{< admonition type="note" >}}
Use this model to set elements if you use the [`context.panel.onOptionsChange({})`](/plugins/business-forms/code/panel/#panelonoptionschangeoptions) method.

Elements added through this method are added to the panel options. The element's operation might not match the expected behavior.

If you use this method in the initial request, disable the Synchronize option.
Enabling the Synchronize option with `context.panel.onOptionsChange()` in the Initial Request causes the panel to reload constantly.
{{< /admonition >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/infinity-reload.png" class="border" alt="Disable Synchronize with data to avoid endless reloading of the panel if onOptionsChange() is used in the initial request." >}}
