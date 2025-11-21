---
title: info use options change
---
:::info
Use this model to set element(s) if you use [`context.panel.onOptionsChange({})`](/plugins/business-forms/code/panel/#panelonoptionschangeoptions) method.

The element added through this method will be added to the panel options. Operation of the element may not be the same as the expected behavior.

If you use it in the initial request, don't forget to disable the Synchronize option.
Enabling the Synchronize option and using it together with `context.panel.onOptionsChange()` in the Initial Request will cause the panel to reload constantly.
:::

<Image
  title="Disable Synchronize with data to avoid endless reloading of the panel if onOptionsChange() is used in the initial request."
  src="/img/plugins/business-forms/infinity-reload.png"
/>
