<template>
  <el-button type="primary" @click="handleClick">
     <slot>选择图标</slot>
  </el-button>
  <div class="m-choose-icon-dialog-body">
    <el-dialog title="选择图标" v-model="dialogVisible" :close-on-click-modal="false" @close="beforeDialogClose">
      <div class="container">
        <div
          v-for="(item, index) in Object.keys(ElIcons)"
          :key="index"
          class="item"
          @click="clickItem(item)"
        >
          <div class="text">
            <component :is="`el-icon-${toElLine(item)}`" />
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>    
  </div>
</template>

<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { watch, ref } from 'vue'
import { userCopy } from '../../../hooks/useCopy'
import { toElLine } from '../../../utils'
let props = defineProps<{
  // 控制弹出框的显示与隐藏
  visible: boolean
}>()
let emits = defineEmits(['update:visible'])
// 直接改变父组件的visible不太好，拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)
// 点击按钮显示弹出框
let handleClick = () => {
  // 修改父组件的数据 visible
  emits('update:visible', !props.visible)
}

// 点击图标
let clickItem = (item: string) => {
  let text = `el-icon-${toElLine(item)}`
  userCopy(text)
  dialogVisible.value = false
}
// 监听visible变化，只能监听第一次的变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})

// 关闭弹窗后滚动条回到最顶
let beforeDialogClose = () => {
  document.getElementsByClassName('el-dialog__body')[0].scrollTop = 0
}
</script> 

<style lang="scss" scoped>
.m-choose-icon-dialog-body {
  :deep(.el-dialog__body) {
    height: 500px;
    overflow: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 7px;
      background: white;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      border-radius: 4px;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background-color: rgba(180, 160, 120, 0.1);
      box-shadow: inset 0 0 1px rgba(180, 160, 120, 0.5);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(144,147,153,.5);
    }
  }
}
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 20%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .icon {
    flex: 1;
  }
  svg {
    width: 2em;
    height: 2em;
  }
}
</style>
