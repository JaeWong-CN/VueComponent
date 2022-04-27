<!--省市区选择-->
<template>
  <div>
    <el-select v-model="province" placeholder="请选择省份" clearable>
      <el-option
        v-for="item in areas"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
    <el-select style="margin:0 10px;" v-model="city" placeholder="请选择城市" :disabled="!province" clearable>
      <el-option
        v-for="item in cityList"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
    <el-select v-model="area" placeholder="请选择区域" :disabled="!province || !city" clearable>
      <el-option
        v-for="item in areaList"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed,watch } from 'vue'
import allAreas from '../lib/pca-code.json'

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}
export interface Data {
  name: string,
  code: string
}

let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
let areas = ref(allAreas)

// // 城市选择下拉框的值, computed写法，需要配合select的change事件把两个数组清空重新赋值，不然会报计算属性只读不可改的错误
// let cityList = computed(() => {
//   if (!province.value) {
//     return []
//   } else {
//     return areas.value.find(v => v.code === province.value)?.children
//   }
// })
// // 区域选择下拉框的值, computed写法,需要配合select的change事件把两个数组清空重新赋值，不然会报计算属性只读不可改的错误
// let areaList = computed(() => {
//   if (!city.value) {
//     return []
//   } else {
//     return cityList.value.find(v => v.code === city.value)?.children
//   }
// })

// 使用watch来完成
let cityList = ref<AreaItem[]>([])
let areaList = ref<AreaItem[]>([])
watch(() => province.value, val => {
  if (val) {
    cityList.value = areas.value.find(v => v.code === province.value)!.children!
  }
  // 省份选择有变化，需要清空后面已选择的城市与区域的值
  city.value = ''
  area.value = ''
})
watch(() => city.value, val => {
  if (val) {
    areaList.value = cityList.value.find(v => v.code === city.value)!.children!
  }
  // 城市选择有变化，仅需清空后面区域的值
  area.value = ''
})

// 分发事件给父组件
let emits = defineEmits(['change'])

watch(() => area.value, val => {
  if (val) {
    let provinceData: Data = {
      name: areas.value && areas.value.find(v => v.code === province.value)!.name,
      code: province.value
    }
    let cityData: Data = {
      name: cityList.value && cityList.value.find(v => v.code === city.value)!.name,
      code: city.value
    }
    let areaData: Data = {
      name: areaList.value && areaList.value.find(v => v.code === val)!.name,
      code: val
    }
    emits('change', {
      provinceData,
      cityData,
      areaData
    })    
  }
})
// 如果使用computed来完成，这两个select事件一定要写，否则会报computed只读不可改错误
// let selectProvinceChange = () => {
//   if (city.value || area.value) {
//     city.value = ''
//     area.value = ''
//   }
// }
// let selectCityChange = () => {
//   if (area.value) {
//     area.value = ''
//   }
// }

// let selectAreaChange = () => {
//   const PROVINCE = areas.value.find(v => v.code === province.value).name
//   const CITY = cityList.value.find(v => v.code === city.value).name
//   const AREA = areaList.value.find(v => v.code === area.value).name
//   console.log(`${PROVINCE}${CITY}${AREA}`)
// }
</script> 

<style scoped>

</style>
