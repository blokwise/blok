<template>
  <div>
    <h1>{{ description }}</h1>
    <span>{{ additional }}</span>
    <slot name="bars" :category="category" />
  </div>
</template>

<script>
export default {
  name: 'Foo',

  props: {
    description: {
      type: String,
      default: null
    },
    additional: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    }
  }
}
</script>
