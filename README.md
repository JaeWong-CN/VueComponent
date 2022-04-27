# <font color="#42b983">Vue3 + Typescript + Vite + ElementPlus</font>

## 二次封装ElementPlus组件

### 已完成组件：
- 图标选择器
- 城市选择器
- 趋势标记
- 通知菜单
- 表单
- 弹窗表单

### 未完成：
- 进度条
- 时间选择器
- 表格


# 项目中总结出的 Vue3 与 Vue2 对比

## 一、el-icon
elementPlus改版，先注册成全局组件，像elementUI那样`el-icon-xxx`的形式，否则每次使用都要以组件形式引入，麻烦

## 二、完成折叠面板菜单功能，侧边栏和顶部抽离成组件。
1. 用到某个数据之前Vue2是写`this.XXX`，现在是写`XXX.value`
2. 注意点为组件注册，setup语法糖不用注册组件，直接imort引入，不用语法糖需要使用defineComponent，类似Vue2注册方法
3. props写法改为用defineProps，写法`const props = defineProps({});`
4. emits写法改为用`let emits = defineEmits(['update: XXXX']`
5. 父组件修改子组件的.sync用法Vue3为`v-model:属性名`

## 三、完成选择图标组件
1. watch需要引入，写法`watch(() => 需要监听的值, val => {});`val为改变后的值
2. Vue2中穿透修改elementUi样式的`/deep/`现在写法改为`:deep(类名)`，写`/deep/` vite会报错，`::v-deep` vite会提示已废除，建议用`:deep(类名)` 的形式；或者直接去掉`scoped`，在父元素类名下进行修改。
3. elementUI中的隐藏组件el-scrollbar在elementPlus中正式放出了，文档中有写，特别告知。本人一直用`-webkit-scrollbar`来自定义滚动条。
4. 复制功能使用vue3的hooks完成，类似于vue2的mixins，只不过hooks为函数。

## 四、省市区联动选择组件
1. computed需引入，写法Vue3中为`let XXX = computed(() => { ... })`，如果需要用到get与set，写法为`let XXX = computed({ get() {}, set(val) {} })`
2. 注意点，已选择的省或市需要修改时，后面的数据需要发生变化。这里需要注意computed绑定的值只读不可改，解决方法要么改用watch实现，要么给选择器多绑定个change事件进行清空赋值操作。
3. Vue2中emits多个参数到父组件后，可以用arguments下标的形式来接收多个参数，比如arguments[0]表示传递的第一个参数、arguments[1]表示传递的第二个参数，Vue3中不能利用arguments来接收。解决方法使用函数剩余参数来接收；也可以在子组件分发的时候直接用一个对象来传递，例如`emits('handleClick', { item, index })`
4. 使用app.use全局注册组件，疑难点为install函数的使用，让组件可以通过use的形式使用。别忘了在main.ts中需要引入。最后有注册的组件就不用import了，直接使用就可以

## 五、趋势标记
1. useSlot的用法，需要在组件内导入，`let slot = useSlot()`，从slot可以看到插槽的数据

## 六、通知面板
1. setup相当于Vue2的beforeCreate和created，其余的生命周期要使用需要按需引入，例如`import { onMounted } from 'vue'`，然后 `onMounted(() => {})`
2. Vue3中路由方法，例如push go等，需要引入: `import { useRouter } from 'vue-router';` `const $router = useRouter(); $router.back(); `
3. Vue3中查看路由参数，例如path等，需要引入: `import { useRoute } from 'vue-router';` `const $route = userRoute(); console.log($route.path);`
4. Vue3底层使用Proxy实现，会发现很多时候输出都是proxy类型的数据，可利用 `JSON.parse(JSON.stringify(XXX))` 或者引入 `toRaw` 方法转换

## 七、表单
1. elementPlus 表单验证是用 `async-validator` 实现二次封装的，rules 的ts配置需要用到该插件源码中的RuleItem，直接源码复制过来
2. 一个不算是Vue3的小知识，`<component :is="xxx" /> `的动态组件内部其实是有预留插槽的，可以在`<component :is="xxx" /> `里再用一个`<component :is="xxx" /> `
3. 作用域插槽取消了slot的写法？现在子组件一样用属性传值，例如 `<slot name="action" :item="item" />`，父组件接收：`<template #action="scope">...</template>`忘记是Vue2高版本是不是就取消了，反正Vue3是肯定无了
4. nextTick需要引入，总之Vue3现在并没有绑定实例对象，所以Vue2中 `this.`的语法都没了，基本都是需要import引入
5. Vue3无法像Vue2那样利用`this.$ref`获取子组件实例或方法。现在父组件想获取子组件的实例或者方法可以用`defineExpose`分发，不用额外引入；需要注意`defineExpose`中分发的是方法，如果有return值，需要先调用这个方法才能拿到

## 感想：
1. Vue3的学习成本不会太高，多写项目就熟练各种api的用法了。反而觉得TS的学习成本会更高一点，在编写组件之前定义类型需要写很多，花更多时间，而且容易由于项目紧急或者一些个人原因不提前编写类型的定义。但是带来的好处也显而易见，很多语法错误在编译的时候就会提示。
2. Vue3包括一些配套UI库刚出不久，遇到问题和bug时网上搜寻答案没有使用Vue2时候容易，开发成本会比较高一点。
