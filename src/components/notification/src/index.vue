<template>
  <div>
    <el-popover
      placement="bottom"
      :width="300"
      trigger="click"
    >
      <template #default>
        <slot></slot>
      </template>
      <template #reference>
        <el-badge :value="value" :max="max" :is-dot="isDot" class="bell-item">
          <component :is='`el-icon-${toElLine(icon)}`' />
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script lang='ts' setup>
import { toElLine } from '../../../utils'
let props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: 'bell'
  },
  // 通知数量
  value: {
    type: Number,
    default: ''
  },
  // 最大值
  max: {
    type: Number
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false
  }
})
</script> 

<style lang="scss" scoped>
.bell-item {
  margin: 0 0 50px 0;
  cursor: pointer;
}
</style>
