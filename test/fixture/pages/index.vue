<template>
  <div>
    <Blok :blok="story.content" />
  </div>
</template>

<script>
import { story } from "./../../__mocks__/story";

export default {
  data() {
    return {
      story,
    };
  },
};
</script>
