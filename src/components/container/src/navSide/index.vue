<template>
  <div>
    <el-menu :collapse="collapse" :default-active="$route.path">
      <el-menu-item index="/" @click="clickItem('/')">
        <el-icon-homefilled />
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/chooseIcon" @click="clickItem('/chooseIcon')">
        <el-icon-check />
        <span>图标选择器</span>
      </el-menu-item>
      <el-menu-item index="/chooseArea" @click="clickItem('/chooseArea')">
        <el-icon-locationinformation />
        <span>省市区选择器</span>
      </el-menu-item>
      <el-menu-item index="/trend" @click="clickItem('/trend')">
        <el-icon-sort />
        <span>趋势标记</span>
      </el-menu-item>
      <el-menu-item index="/notification" @click="clickItem('/notification')">
        <el-icon-bell />
        <span>通知菜单</span>
      </el-menu-item>
      <el-menu-item index="/form" @click="clickItem('/form')">
        <el-icon-tickets />
        <span>表单</span>
      </el-menu-item>
      <el-menu-item index="/modalForm" @click="clickItem('/modalForm')">
        <el-icon-chatround />
        <span>弹出框表单</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

let props = defineProps<{
  collapse: Boolean
}>()
const $router = useRouter()
const $route = useRoute()

let clickItem = (index: string) => {
  console.log($route);
  switch(index) {
    case '/':
      $router.push({ path: '/' })
    break
    case '/chooseIcon':
      $router.push({ path: '/chooseIcon' })
    break
    case '/chooseArea':
      $router.push({ path: '/chooseArea' })
    break
    case '/trend':
      $router.push({ path: '/trend' })
    break
    case '/notification':
      $router.push({ path: '/notification' })
    break
    case '/form':
      $router.push({ path: '/form' })
    break
    case '/modalForm':
      $router.push({ path: '/modalForm' })
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
    padding: 0 0 0 7px;
  }
}
</style>
