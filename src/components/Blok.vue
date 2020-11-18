<template>
  <NuxtDynamic
    :name="blok.component"
    v-bind="$attrs"
    class="blokwise__blok"
    v-on="$listeners"
  >
    <!-- pass through blok slots -->
    <template
      v-for="(group, propName) in children"
      v-slot:[propName]="slotData"
    >
      <Blok
        v-for="child in group"
        v-bind="slotData"
        :key="child._uid"
        :blok="child"
        :hydration="hydration"
      />
    </template>

    <!-- pass through normal slots -->
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]>
      <slot :name="slotName" />
    </template>

    <!-- pass through scoped slots -->
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      v-slot:[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </NuxtDynamic>
</template>

<script>
// inspiration for slot handling:
// https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2
export default {
  name: "Blok",

  props: {
    blok: {
      type: Object,
      default: () => ({}),
    },
    /**
     * options: [
     *   OnInteraction,
     *   SsrOnly,
     *   WhenIdle,
     *   WhenVisible
     * ]
     */
    hydration: {
      type: String,
      default: "WhenIdle",
    },
  },

  computed: {
    /**
     * detect all properties of the blok which represent blok schemes as children
     */
    children() {
      const isArray = (value) => Array.isArray(value) && value.length > 0;
      const isObject = (value) => typeof value === "object" && value !== null;
      const isBlok = (value) => "component" in value;
      return Object.fromEntries(
        Object.entries(this.blok).filter(
          ([prop, value]) =>
            isArray(value) && isObject(value[0]) && isBlok(value[0])
        )
      );
    },
  },
};
</script>
