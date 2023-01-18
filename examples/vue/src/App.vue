<script setup lang="ts">
import { ref } from 'vue'
import SelectableGrid from '@selectable-grid/vue'
import type { SelectableGridProps } from '@selectable-grid/vue'

const imgSrc =
  'https://avatars.mds.yandex.net/get-mpic/5219318/img_id3258925543469117996.jpeg/orig'

const options = ref<SelectableGridProps>({
  type: 'img',
  cellCount: 15,
  containerProps: {
    id: 'img',
    src: imgSrc,
    width: 500
  }
})
</script>

<template>
  <div class="image-container">
    <SelectableGrid :options="options" />
  </div>
</template>

<style scoped>
#img {
  height: 500px;
}
</style>
