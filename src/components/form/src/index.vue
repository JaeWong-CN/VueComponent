<template>
  <el-form 
    ref="form"
    v-if="model"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
    v-bind="$attrs"
    class="el-form-container"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor' && item.prop"
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
        <!-- S - wangeditor富文本编辑 -->
        <div v-if="item.type === 'editor'" id="editor"></div>
        <!-- E - wangeditor富文本编辑 -->
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"      
      >
        <component
          v-if="item.prop"
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
    <!-- 操作选项插槽 -->
    <el-form-item>
      <slot name="action" :form="form" :model="model" />
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import E from 'wangeditor'
import { onMounted, PropType, ref, watch, nextTick } from 'vue'
import { FormInstance, FormOptions } from './types/types'
import type { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from 'element-plus'

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
    required: false
  }
})
let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'on-exceed', 'before-upload', 'before-remove'])

let model = ref<any>({})
let rules = ref<any>({})
let form = ref<FormInstance | null>()
let edit = ref()

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    props.options.map((item: FormOptions) => {
      model.value[item.prop!] = item.value
      rules.value[item.prop!] = item.rules
      if (item.type === 'editor') {
        // 初始化富文本编辑器
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            if (item.placeholder) {
              editor.config.placeholder = item.placeholder
            }
            editor.create()
            // 初始化富文本内容
            editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
          }
        })
      }
    })    
  }  
}

// 重置表单
let resetFields = () => {
  // 重置elementPlus的表单
  form.value?.resetFields()
  // 重置富文本编辑器
  if (props.options && props.options.length) {
    let editorItem = props.options.find(item => item.type === 'editor')!
    edit.value.txt.html(editorItem.value)
  }
}

// 获取表单数据
let getFormData = () => {
  return model.value
}

// 表单验证
let validate = () => {
  return form.value?.validate
}

// 分发方法
defineExpose({
  resetFields,
  validate,
  getFormData
})


onMounted(() => {
  initForm()
})
// 监听父组件传递进来的options
watch(() => props.options, () => {
  initForm()
}, { deep: true })

// 上传组件的所有方法
const onPreview = (uploadFile: UploadFile) => {
  emits('on-preview', uploadFile)
}
const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-remove', { uploadFile, uploadFiles })
}
const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // 上传图片成功，给表单上传项赋值
  let uploadItem = props.options.find(item => item.type === 'upload')
  if (uploadItem) {
    model.value[uploadItem.prop!] = { response, uploadFile, uploadFiles }
  }
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
