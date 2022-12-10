<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SelectableGrid from 'selectable-grid'
import type { Options } from 'selectable-grid'
import type { PropType } from 'vue'

const props = defineProps({
  options: {
    type: Object as PropType<Options>,
    required: true
  }
})

const selectableGrid = ref<SelectableGrid>()

onMounted(() => {
  selectableGrid.value = new SelectableGrid(props.options)
})

watch(props, () => selectableGrid.value?.setOptions(props.options))
</script>
