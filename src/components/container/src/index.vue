<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <nav-side v-model:collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header v-model:collapse="isCollapse" />
        </el-header>
        <el-main>
          <router-link to="/chooseArea"></router-link>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'

let isCollapse = ref(false)
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>