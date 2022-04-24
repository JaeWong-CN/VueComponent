<!-- 趋势标记 -->
<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slot.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <!-- 动态组件 -->
      <component
        :is="`el-icon-${toElLine(upIcon)}`"
        :style="[{color: !reverseColor ? upIconColor : '#52c41a'}]"
        v-if="type === 'up'"
      />
      <component
        :is="`el-icon-${toElLine(downIcon)}`"
        :style="{color: !reverseColor ? downIconColor : 'f5222d'}"
        v-else
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { toElLine } from '../../../utils'
import { useSlots, computed } from 'vue'
let props = defineProps({
  // 标记当前趋势是上升up还是下降down
  type: {
    type: String,
    default: 'up'
  },
  // 上升趋势显示的图标
  upIcon: {
    type: String,
    default: 'arrowup'
  },
  // 下降趋势显示的图标
  downIcon: {
    type: String,
    default: 'arrowdown'
  },
  // 趋势显示的文字，父组件传递过来的数据或是插槽
  text: {
    type: String,
    default: '文字'
  },
  // 颜色反转只在默认的颜色下生效，如果使用了自定义颜色则属性不生效
  reverseColor: {
    type: Boolean,
    dafault: false
  },
  // 上升趋势图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  // 下降趋势图标颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 上升趋势文字颜色
  upTextColor: {
    type: String,
    default: 'rgb(0, 0, 0)'
  },
  // 下降趋势文字颜色
  downTextColor: {
    type: String,
    default: 'rgb(0, 0, 0)'
  }
})
// 获取插槽内容
let slot = useSlots()

// 文字颜色
let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})

</script> 

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  .icon {
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
