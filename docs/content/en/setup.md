---
title: Setup
description: ""
position: 2
category: Guide
---

## Installation

<alert type="warning">

Make sure to enable `@nuxt/components` in your project.

</alert>

Add `@blokwise/blok` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @blokwise/blok
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @blokwise/blok
```

  </code-block>
</code-group>

Then, add `@blokwise/blok` to the `modules` section of `nuxt.config.js`:

```js[nuxt.config.js]
{
  modules: [
    [
      "@blokwise/blok",
      { prefix: "blokwise" }
    ]
  ];
}
```

## Options

### `prefix`

- Type: `String`
- Default: `''`

The `prefix` can be used to define prefix for the component name. e.g. if prefixed with `'awesome'` the component can be used as `AwesomeBlok`.

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.
