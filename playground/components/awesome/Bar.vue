<template>
  <div>
    <h2>{{ description }}</h2>
    <span>{{ category }}</span>
  </div>
</template>

<script>
export default {
  name: 'Bar',

  props: {
    description: {
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
