<template>
  <NuxtDynamic
    v-if="hasEditableDirective"
    :is-component="blok.component"
    v-bind="allAttrs"
  >
    <!-- pass through blok slots -->
    <template
      v-for="(group, propName) in children"
      #[propName]="slotData"
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

    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template
      v-for="(_, scopedSlotName) in $slots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </NuxtDynamic>

  <NuxtDynamic
    v-else
    :is-component="blok.component"
    v-bind="allAttrs"
  >
    <!-- pass through blok slots -->
    <template
      v-for="(group, propName) in children"
      #[propName]="slotData"
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

    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template
      v-for="(_, scopedSlotName) in $slots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </NuxtDynamic>
</template>

<script setup>
import { computed, useAttrs } from '#imports'

// TODO: add v-editable
const props = defineProps({
  /*
   * representing a storyblok schema
   * */
  blok: {
    type: Object,
    default: () => ({})
  },

  /*
   * see https://dynamic.blokwise.io for further information about this property
   * */
  hydration: {
    type: Object,
    default: () => ({})
  },

  /*
   * use v-editable directive on elements for storyblok live editing
   * */
  isEditable: {
    type: Boolean,
    default: false
  },

  /*
   * spread properties of blok prop as props to component
   * */
  spreadProps: {
    type: Boolean,
    default: true
  }
})

/**
 * detect all properties of the blok which represent blok schemas as children
 */
const children = computed(() => {
  const isArray = value => Array.isArray(value) && value.length > 0
  const isObject = value => typeof value === 'object' && value !== null
  const isBlok = value => 'component' in value
  return Object.fromEntries(
    Object.entries(props.blok).filter(
      ([prop, value]) =>
        isArray(value) && isObject(value[0]) && isBlok(value[0])
    )
  )
})

/**
 * decide whether to use custom v-editable directive of storyblok-nuxt module or not
 * either enable through prop `isEditable` of the Blok component globally for all rendered Bloks down the tree
 * or as prop of the blok data `blok.isEditable` inside the blok data for single opt-ins.
 */
const hasEditableDirective = computed(() => {
  return props.isEditable ?? !!props.blok.isEditable
})

/**
 * spread the properties of the blok object onto the loaded component
 * instead of passing the blok object as is
 */
const attrs = useAttrs()

const allAttrs = computed(() => {
  const blok = { ...props.blok }
  delete blok._uid
  delete blok.component

  if (props.spreadProps) {
    return {
      ...attrs,
      ...blok
    }
  }
  return {
    ...attrs,
    blok
  }
})
</script>

<script>
export default {
  name: 'Blok',

  inheritAttrs: false
}
</script>
