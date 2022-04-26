<!--弹出框表单-->
<template>
  <div>
    <el-button type="primary" @click="open">新增</el-button>
    <m-modal-form title="新增" v-model:visible="visible" :options="options">
      <template #footer="{ form }">
        <el-button @click="cancle(form)">取消</el-button>
        <el-button type="primary" @click="submit(form)">提交</el-button>
      </template>
    </m-modal-form>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { FormInstance, FormOptions } from '../../components/form/src/types/types'
import { ElMessage } from 'element-plus'

let visible = ref<boolean>(false)
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
        trigger: 'blur'
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
        trigger: 'blur'
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
        trigger: 'blur'
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
  // {
  //   type: 'upload',
  //   label: '上传头像',
  //   prop: 'pic',
  //   uploadAttrs: {
  //     action: 'https://jsonplaceholder.typicode.com/posts/',
  //     limit: 1
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: '请上传头像',
  //       trigger: 'blur'
  //     }
  //   ]
  // },
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

let open = () => {
  visible.value = true
}

// 点击取消按钮
let cancle = (form: FormInstance) => {
  visible.value = false
  form.resetFields()
}

// 点击提交按钮
let submit = (form: any) => {
  const validate = form.validate()
  validate((valid: any) => {
    if (valid) {
      ElMessage.success('提交成功')
      console.log(JSON.parse(JSON.stringify(form.getFormData())))
      visible.value = false
      form.resetFields()
    } else {
      ElMessage.error('失败！')
    }
  })
}
</script> 

<style scoped>

</style>
