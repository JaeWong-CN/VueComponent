<template>
  <el-form v-if="model" :model="model" :rules="rules" :validate-on-rule-change="false" v-bind="$attrs" class="el-form-container">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload'"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop]"
          :placeholder="item.placeholder"
        />
        <!-- S - el-upload 组件 -->
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-exceed="onExceed"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
        >
          <!-- 留下两个插槽位，一个是触发上传的载体，一个是字体提示 -->
          <slot name="uploadArea"></slot> 
          <slot name="uploadTip"></slot> 
        </el-upload>
        <!-- E - el-upload 组件 -->
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"      
      >
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop]"
          :placeholder="item.placeholder"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          >

          </component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang='ts' setup>
import { onMounted, PropType, ref, watch } from 'vue'
import { FormOptions } from './types/types'
import type { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile, UploadRequestOptions } from 'element-plus'

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})
let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'on-exceed', 'before-upload', 'before-remove', 'http-request'])

let model = ref<any>({})
let rules = ref<any>({})

// 初始化表单
const ininForm = () => {
  if (props.options && props.options.length) {
    props.options.map((item: FormOptions) => {
      model.value[item.prop!] = item.value
      rules.value[item.prop!] = item.rules
    })    
  }  
}

onMounted(() => {
  ininForm()
})
// 监听父组件传递进来的options
watch(() => props.options, () => {
  ininForm()
}, { deep: true })

// 上传组件的所有方法
const onPreview = (uploadFile: UploadFile) => {
  emits('on-preview', uploadFile)
}
const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-remove', { uploadFile, uploadFiles })
}
const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-success', { response, uploadFile, uploadFiles })
}
const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-error', { error, uploadFile, uploadFiles })
}
const onExceed = (files: File[], uploadFiles: UploadFiles) => {
  emits('on-exceed', { files, uploadFiles })
}
const onProgress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-progress', { evt, uploadFile, uploadFiles })
}
const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-change', { uploadFile, uploadFiles })
}
const beforeUpload = (rawFile: UploadRawFile) => {
  emits('before-upload', rawFile)
}
const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('before-remove', { uploadFile, uploadFiles })
}
const httpRequest = (options: UploadRequestOptions)  => {
  emits('http-request', options)
}
</script> 
<style lang="scss">
.el-form-container {
  .el-upload {
    display: inline;
  }
  .el-upload-list {
    min-width: 270px;
  }
}
</style>
