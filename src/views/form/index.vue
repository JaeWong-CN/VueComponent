<template>
  <div>
    <m-form
      ref="form"
      label-width="auto"
      :options="options"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc;font-size: 12px;">这个上传的随便你传~</div>
      </template>
      <template #action="scope">
        <div>
          <el-button type="primary" @click="submitForm(scope)">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </template>
    </m-form>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { FormInstance, FormOptions } from "../../components/form/src/types/types"
import { ElMessage, ElMessageBox } from 'element-plus'

interface Scope {
  form: FormInstance,
  model: any
}

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      style: {
        maxWidth: '300px'
      },
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      style: {
        maxWidth: '300px'
      },
      showPassword: true,
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    label: '职位',
    placeholder: '请选择职位',
    prop: 'role',
    attrs: {
      style: {
        width: '100%',
        maxWidth: '300px'
      },
      clearable: true
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'hobby',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '请选择至少一个爱好',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'unknowSex'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传头像',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      limit: 1
    },
    rules: [
      {
        required: true,
        message: '请上传头像',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '请填写描述',
        trigger: 'blur'
      }
    ]
  }
]

let form = ref<FormInstance | null>()

// 提交按钮点击事件
let submitForm = (scope: Scope) => {
  scope.form.validate(valid => {
    if (valid) {
      ElMessage.success('提交成功')
      console.log(JSON.parse(JSON.stringify(scope.model)))
      form.value?.resetFields()
    } else {
      ElMessage.error('提交失败')
    }
  })
}
// 重置按钮点击事件
let resetForm = () => {
  form.value?.resetFields()
}

let handleRemove = (params: any) => {
  console.log(params)
}
let handlePreview = (params: any) => {
  console.log(params)
}
let beforeRemove = (param: any) => {
  return ElMessageBox.confirm(`确定要删除 ${JSON.parse(JSON.stringify(param.uploadFile)).name} 吗 ?`)
}
let handleExceed = (params: any) => {
  ElMessage.warning('最多只可以上传一个文件！')
}
let handleSuccess = (params: any) => {
  console.log('success')
  console.log(params)
}
let handleChange = (params: any) => {
  console.log('change')
  console.log(params)
}
let handleBeforeUpload = (params: any) => {
  console.log('handleBeforeUpload')
  console.log(params)
}
</script> 

<style scoped>

</style>
