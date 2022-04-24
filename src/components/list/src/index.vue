<template>
  <div class="list-tabs-class">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar height="270px">
          <div
            class="container"
            v-for="(contentItem, contentIndex) in item.content"
            :key="contentIndex"
            @click="clickItem(contentItem, contentIndex)"
          >
            <div v-if="contentItem.avatar" class="avatar">
              <el-avatar :src="contentItem.avatar" />
            </div>
            <div class="content">
              <div class="title">
                <div v-if="contentItem.title">{{ contentItem.title }}</div>
                <el-tag v-if="contentItem.tag" size="small" :type="contentItem.tagType">{{ contentItem.tag }}</el-tag>
              </div>
              <div v-if="contentItem.desc" class="desc">{{ contentItem.desc }}</div>
              <div v-if="contentItem.time" class="time">{{ contentItem.time }}</div>
            </div>
          </div>
          <div class="actions" >
            <div
              class="a-item"
              :class="{'border': actionsIndex !== actions.length - 1}"
              v-for="(actionsItem, actionsIndex) in actions"
              :key="actionsIndex"
              @click="clickAction(actionsItem, actionsIndex)"
            >
              <div v-if="actionsItem.icon" class="a-icon">
                <component :is='`el-icon-${toElLine(actionsItem.icon)}`' />
              </div>
              <div class="a-text">{{ actionsItem.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts' setup>
import { toElLine } from '../../../utils/index'
import { PropType } from 'vue'
import { ActionOptions, ListOptions, ListItem } from './types'
let props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

let emits = defineEmits(['clickItem', 'clickAction'])

let clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}
let clickAction = (item: ActionOptions, index: number) => {
  emits('clickItem', { item, index })
}
</script> 

<style lang="scss">
.list-tabs-class {
  .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  .el-tabs__item {
    flex: 1;
    text-align: center;
  }
  .container {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
    &:hover {
      background-color: #e6f6ff;
    }
    .avatar {
      flex: 1;
    }
    .content {
      flex: 3;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .desc, .time {
        margin-top: 4px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .actions {
    height: 50px;
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    border-top: 2px solid #eee;
    background-color: #fff;
    .a-item {
      height: 50px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .a-icon {
        margin-right: 4px;
        position: relative;
        top: 2px;
      }
    }
    .border {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
