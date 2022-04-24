<template>
  <div>
    <m-notification :value="12">
      <template #default>
        <m-list :list="list" :actions="actions" @clickItem="clickItem" @clickAction="clickAction" />
      </template>
    </m-notification>
  </div>
</template>

<script lang='ts' setup>
import { list, actions } from './data'

let clickItem = (val: Object) => {
  console.log(val)
}
let clickAction = (val: Object) => {
  console.log(val)
}
</script> 

<style scoped>

</style>
