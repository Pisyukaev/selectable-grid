<script setup lang="ts">
import { ref } from "vue";
import SelectableGrid from "@selectable-grid/vue";

const imgRef = ref<HTMLImageElement>();
</script>

<template>
  <div class="image-container">
    <img
      ref="imgRef"
      id="img"
      src="https://avatars.mds.yandex.net/get-mpic/5219318/img_id3258925543469117996.jpeg/orig"
      alt=""
    />
  </div>
  <SelectableGrid
    v-if="imgRef"
    :image-container="imgRef"
    :cell-count="15"
    :options="{
      imageContainer: imgRef,
      cellCount: 15,
    }"
  />
</template>

<style scoped>
#img {
  height: 500px;
}
</style>
