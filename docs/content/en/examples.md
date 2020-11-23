---
title: Examples
description: ""
position: 4
category: Guide
---

## Default usage

Let's say you defined a schema for a grid in storyblok. Let's say you want to fill the grid with logos - so you define an additional storyblok schema for a logo. The blok object will look something like this:

```json
{
  "_uid": "10a9f451-4e30-47e1-ba7a-08d3ac8b3fbe",
  "component": "Grid",
  "logos": [
    {
      "_uid": "20a9f451-4e30-47e1-ba7a-08d3ac8b3fbe",
      "component": "Logo",
      "image": {
        "filename": "logo-1.svg"
      }
    },
    {
      "_uid": "30a9f451-4e30-47e1-ba7a-08d3ac8b3fbe",
      "component": "Logo",
      "image": {
        "filename": "logo-2.svg"
      }
    }
  ]
}
```

We will use the `Blok` component inside `Parent.vue` to load the `Grid` and its components according to the schema:

```vue[Parent.vue]
<template>
  <Blok :blok="blok">
</template>

<script>
export default {
  data() {
    return {
      // this is one blok schema
      blok: {
        _uid: '10a9f451-4e30-47e1-ba7a-08d3ac8b3fbe',
        component: 'Grid',
        logos: [{
          _uid: '20a9f451-4e30-47e1-ba7a-08d3ac8b3fbe',
          component: 'Logo',
          image: {
            filename: 'logo-1.svg'
          },
        }, {
          _uid: '30a9f451-4e30-47e1-ba7a-08d3ac8b3fbe',
          component: 'Logo',
          image: {
            filename: 'logo-2.svg'
          },
        }]
      }
    }
  }
}
</script>
```

Let's say the `Grid` component will look something like this:

```vue[Grid.vue]
<template>
  <div class="grid">
    <slot name="logos">
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```

...while the `Logo` component is used to display the images:

```vue[Logo.vue]
<template>
  <img :src="blok.filename" />
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({
        filename: null,
      }),
    },
  },
};
</script>
```

...whereas the rendered output will look like this:

```html
<div class="grid">
  <img src="logo-1.svg" />
  <img src="logo-2.svg" />
</div>
```

## Scoped slots

It's possible to use scoped slots in components which are loaded through `Blok`. We could easily pass additional stuff into the child `Blok`'s. Let's add some additional slot data in `Grid`:

```vue[Grid.vue]
<template>
  <div class="grid">
    <slot name="logos" width="320">
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```

...to use in the `Logo` component:

```vue[Logo.vue]
<template>
  <img :src="blok.filename" :width="width" />
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({
        filename: null,
      }),
    },
    width: {
      type: Number,
      default: 480
    }
  },
};
</script>
```

This will end up in the following output:

```html
<div class="grid">
  <img src="logo-1.svg" width="320" />
  <img src="logo-2.svg" width="320" />
</div>
```
