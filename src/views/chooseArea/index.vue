<template>
  <m-choose-area @change="change" />
</template>

<script lang='ts' setup>
// 输出子组件派发过来的
let change = (item) => {
  console.log(item)
}
</script> 

<style scoped>

</style>
