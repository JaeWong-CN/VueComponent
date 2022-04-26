<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs" :close-on-click-modal="false">
    <template #default>
      <m-form label-width="100px" ref="form" :options="options" />
    </template>
    <template #footer>
      <slot name="footer" :form="form" />
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { computed, PropType, ref } from 'vue'
import { FormInstance, FormOptions } from '../../form/src/types/types'

let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})
let emits = defineEmits(['update:visible'])

let form = ref<FormInstance | null>()

let dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
</script> 

<style scoped>

</style>
