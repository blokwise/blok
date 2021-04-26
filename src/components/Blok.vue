<template>
  <NuxtDynamic
    v-if="hasEditableDirective"
    v-editable="blok"
    :component="blok.component"
    v-bind="attrs"
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
        :is-editable="isEditable"
        :hydration="hydration"
        :spread-props="spreadProps"
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

  <NuxtDynamic
    v-else
    :component="blok.component"
    v-bind="attrs"
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
        :is-editable="isEditable"
        :hydration="hydration"
        :spread-props="spreadProps"
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
/**
 * Pass slots through from parent to child components:
 * https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2
 */
export default {
  name: "Blok",

  inheritAttrs: false,

  props: {
    // representing a storyblok schema
    blok: {
      type: Object,
      default: () => ({}),
    },
    // can be `OnInteraction`, `Never`, `WhenIdle`, `WhenVisible`
    hydration: {
      type: String,
      default: "WhenIdle",
    },
    // use v-editable directive on elements for storyblok live editing
    isEditable: {
      type: Boolean,
      default: false,
    },
    // spread blok properties as props to component
    spreadProps: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    /**
     * detect all properties of the blok which represent blok schemas as children
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

    /**
     * decide whether to use custom v-editable directive of storyblok-nuxt module or not
     * either enable through prop `isEditable` of the Blok component globally for all rendered Bloks down the tree
     * or as prop of the blok data `blok.isEditable` inside the blok data for single opt-ins.
     */
    hasEditableDirective() {
      return this.isEditable ?? !!this.blok.isEditable;
    },

    /**
     * spread the properties of the blok object onto the loaded component
     * instead of passing the blok object as is
     */
    attrs() {
      if (this.spreadProps) {
        return {
          ...this.$attrs,
          ...this.blok,
        };
      }
      return {
        ...this.$attrs,
        blok: this.blok,
      };
    },
  },
};
</script>
