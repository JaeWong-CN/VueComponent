<template>
  <div>
    <el-button type="primary" @click="handleClick">选择图标</el-button>
    <m-choose-icon v-model:visible="visible"></m-choose-icon>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

let visible = ref<boolean>(false)

let handleClick = () => {
  visible.value = true
}
</script> 

<style lang="scss" scoped>
.btn {
  margin-top: 10px;
}
</style>
