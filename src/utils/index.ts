// 把elementPlus中的icon驼峰形式转换成elementUI中的el-icon-xxx形式
export const toElLine = (value: string) => {
  return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}