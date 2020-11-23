<template>
  <div>
    <h1>{{ blok.description }}</h1>
    <slot name="bars" :category="blok.category" />
  </div>
</template>

<script>
export default {
  name: "Foo",

  props: {
    blok: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
