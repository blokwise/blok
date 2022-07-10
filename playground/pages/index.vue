<template>
  <div>
    <h1>index</h1>

    <!-- test story content with recoursively loaded components -->
    <Blok :blok="story.content" :hydration="{ type: 'whenIdle' }" />
  </div>
</template>

<script>
import { story } from './../__mocks__/story'

export default {
  data () {
    return {
      story
    }
  }
}
</script>
