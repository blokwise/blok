<template>
  <div>
    <h2>{{ blok.description }}</h2>
    <div>{{ category }}</div>
  </div>
</template>

<script>
export default {
  name: "Bar",

  props: {
    blok: {
      type: Object,
      default: () => ({}),
    },
    category: {
      type: String,
      default: null,
    },
  },
};
</script>
