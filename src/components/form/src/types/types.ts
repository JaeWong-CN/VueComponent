// 可配置的表单

import { CSSProperties } from "vue"
import { RuleItem } from "./rule"

// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
  'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' |
  'rate' | 'select' | 'option' | 'slider' |'switch' | 'time-picker' | 'time-select' |
  'transfer' | 'upload',
  // 表单项的值
  value?: any, // 上传组件中是没有value属性的
  // 表单label
  label?: string,
  // 表单的标识
  prop?: string,
  // 表单项的验证规则
  rules?: RuleItem[],
  // 表单项的占位符
  placeholder?: string,
  // 表单元素特有的属性，比较多，比如input有maxLength、minLength等等，后续用到再慢慢补充
  attrs?: {
    // css样式
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean
    //......
  },
  // 表单项的子元素，比如el-select下的el-options
  children?: FormOptions[],
  // 上传组件的属性和方法
  uploadAttrs?: {
    action: string,
    headers?: object,
    method?: 'post' | 'put' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    withCredentials?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: boolean,
    thumbnailMode?: boolean,
    fileList?: any[],
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number
  }
}