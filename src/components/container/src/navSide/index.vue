<template>
  <div>
    <el-menu :collapse="collapse" default-active="1">
      <el-menu-item index="1" @click="clickItem(1)">
        <el-icon-homefilled />
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="clickItem(2)">
        <el-icon-check />
        <span>图标选择器</span>
      </el-menu-item>
      <el-menu-item index="3" @click="clickItem(3)">
        <el-icon-locationinformation />
        <span>城市选择器</span>
      </el-menu-item>
      <el-menu-item index="4" @click="clickItem(4)">
        <el-icon-sort />
        <span>趋势标记</span>
      </el-menu-item>
      <el-menu-item index="5" @click="clickItem(5)">
        <el-icon-bell />
        <span>通知菜单</span>
      </el-menu-item>
      <el-menu-item index="6" @click="clickItem(6)">
        <el-icon-tickets />
        <span>表单</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

let props = defineProps<{
  collapse: Boolean
}>()
const $router = useRouter()

let clickItem = (index: Number) => {
  switch(index) {
    case 1:
      $router.push({ path: '/' })
    break
    case 2:
      $router.push({ path: '/chooseIcon' })
    break
    case 3:
      $router.push({ path: '/chooseArea' })
    break
    case 4:
      $router.push({ path: '/trend' })
    break
    case 5:
      $router.push({ path: '/notification' })
    break
    case 6:
      $router.push({ path: '/form' })
    break
    default:
    break
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item {
  span {
    padding: 0 55px 0 7px;
  }
}
</style>
