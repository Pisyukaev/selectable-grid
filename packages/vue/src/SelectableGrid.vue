<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from 'vue'
import SelectableGrid from 'selectable-grid'
import type { Options } from 'selectable-grid'
import type { ImgHTMLAttributes, VideoHTMLAttributes } from 'vue'

export interface SelectableGridImgProps extends Omit<Options, 'container'> {
  type: 'img'
  containerProps: ImgHTMLAttributes
}

export interface SelectableGridVideoProps extends Omit<Options, 'container'> {
  type: 'video'
  containerProps: VideoHTMLAttributes
}

export type SelectableGridProps =
  | SelectableGridImgProps
  | SelectableGridVideoProps

const props = defineProps<{
  options: SelectableGridProps
}>()

const {
  options: {
    value: { type, containerProps, ...sgOptions }
  }
} = toRefs(props)

const selectableGrid = ref<SelectableGrid>()
const containerRef = ref<HTMLImageElement | HTMLVideoElement>()

onMounted(() => {
  if (!containerRef.value) {
    return
  }

  selectableGrid.value = new SelectableGrid({
    ...sgOptions,
    container: containerRef.value
  })
})

watch(props, () =>
  selectableGrid.value?.setOptions({
    ...sgOptions,
    container: containerRef.value
  })
)
</script>

<template>
  <component :is="type" v-bind="containerProps" ref="containerRef" />
</template>
