---
description: 'import Image from "@theme/Image";'
weight: 1
title: '_base change elements example'
labels:
  products:
    - enterprise
    - oss
---
import Image from "@theme/Image";

### Code Example with Query action for Initial Request

<Image
  title="Initial Request"
  src="/img/plugins/business-forms/elements/query-action.png"
/>

```js
/**
 * Convert JSON to form elements array
 */
const formElements = JSON.parse(
  context.panel.data.series[0].fields[0].values[0]
);
/**
 * Set elements with helpers
 */
context.panel.onChangeElements(
  formElements.map((element) => {
    const elementInForm = context.panel.elements.find(
      (item) => item.uid === element.uid
    );
    let value = element.value;

    if (element.uid === "comment" && elementInForm) {
      value = elementInForm.value;
    }

    return {
      ...element,
      value,
      helpers: {
        showIf: () => true,
        disableIf: () => false,
        getOptions: () => element.options,
      },
    };
  })
);
```
