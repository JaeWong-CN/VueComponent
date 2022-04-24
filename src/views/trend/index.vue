<template>
  <div>
    <div class="flex-row">
      <div><m-trend text="销售额" up-icon="top" /></div>
      <div><m-trend text="营业额" type="down" /></div>
    </div>
  </div>
</template>

<script lang='ts' setup>

</script> 

<style lang="scss" scoped>
.flex-row {
  display: flex;
  div {
    margin-left: 10px;
  }
}
</style>
