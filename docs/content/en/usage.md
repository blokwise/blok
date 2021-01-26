---
title: The component
description: ""
position: 3
category: Guide
---

## What is it good for

The `Blok` components provides the possibility to automagically load and render a tree of storyblok schemas. It recursively resolves all bloks as single compponents down the leaves.

## Usage

Use the `Blok` component to load components according to storyblok schemas:

```vue
<template>
  <Blok :blok="blok" />
</template>

<script>
export default {
  data() {
    return {
      // this is one blok schema
      blok: {
        _uid: "10a9f451-4e30-47e1-ba7a-08d3ac8b3fbe",
        component: "Logo",
        image: {
          filename: "logo.svg",
        },
      },
    };
  },
};
</script>
```

The `Blok` component searches for a loader related to `blok.component` property. If there exists an additional prefix to the component name which is defined in the schema, it can be passed. If there is no prefix provided, it automatically searches for all possible components, with one of the existing prefixes used to load components through `@nuxt/components`.

## Props

### `blok`

- type: `Object|BlokSchema`,
- default: `() => ({})`

The `Blok` lazily loads a dynamic component based on the `blok.component` property.
Every property of the `blok` Object will be searched for possible child blok schema entries. If found, the component renders recursively into a `slot` with the name of respective property.

### `hydration`

- type: `String`,
- default: `'WhenIdle'`
- options: `'WhenIdle'`, `'WhenVisible'`, `'OnInteraction'`, `'SsrOnly'`

The `hydration` prop controls how to the component will be hydrated. The hydration will be done with `vue-lazy-hydration` thanks to Markus Oberlehner.
