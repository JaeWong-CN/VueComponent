// 列表的每一项
export interface ListItem {
  avatar?: string,
  title?: string,
  desc?: string,
  time?: string,
  // 标签内容
  tag?: string,
  // 标签类型，继承自ElementPlus
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

// 列表
export interface ListOptions {
  title: string,
  content: ListItem[]
}

// 操作选项
export interface ActionOptions {
  text: string,
  icon?: string
}