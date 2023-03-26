<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-02-28 21:49:41
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-27 01:00:01
 * @FilePath: \LCMIM\TIM-IM\timim\src\views\message\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <main-layout :idx="0">
      <template #container>
        <el-container class="full-height">
          <!-- 左侧侧边栏 -->
          <el-aside width="320px" class="aside-box">
            <el-container class="full-height" direction="vertical">
              <!-- 搜索栏 -->
              <el-header height="60px" class="header">
                <!-- 搜索框 -->
                <div class="from-search">
                  <el-input
                    v-model="input"
                    prefix-icon="el-icon-search"
                    placeholder="搜索聊天 / 好友 / 群组"
                    size="small"
                  />
                </div>
                <!-- 工具栏 + -->
                <div class="tools" v-outside="closeSubMenu">
                  <el-button
                    circle
                    plain
                    size="small"
                    icon="el-icon-plus"
                    @click="subMenu = !subMenu"
                  />
                  <transition>
                    <div class="tools-mennu" v-show="subMenu">
                      <div class="menu-item" @click="triggerSubMenu(1)">
                        创建数组
                      </div>
                      <div class="menu-item" @click="triggerSubMenu(2)">
                        添加好友
                      </div>
                    </div>
                  </transition>
                </div>
              </el-header>
              <!-- 置顶栏 -->
              <header class="subheader" v-show="loadStatusCom.value === 3 && topItemsCom.value.length > 0">
                <div
                  class="top-item"
                  v-for="(item, index) in topItemsCom.value"
                  :key="index"
                  @click="clickTab(item.index_name)"
                >
                  <el-tooltip
                    placement="top-start"
                    :content="item.remark_name ? item.remark_name : item.name"
                  >
                    <div class="avatar">
                      <span v-show="!item.avatar">
                        {{
                          (item.remark_name
                            ? item.remark_name
                            : item.name
                          ).substr(0, 1)
                        }}
                      </span>
                      <img v-show="item.avatar" :src="item.avatar" alt="" />
                    </div>
                  </el-tooltip>
                  <div class="name">
                    {{ item.remark_name ? item.remark_name : item.name }}
                  </div>
                </div>
              </header>
              <el-main class="main">
                <p class="main-menu">
                    <span class="title">消息记录({{ talkNumCom.value }})</span>
                    <span class="title">未读</span>
                </p>
                  <el-scrollbar ref="menusScrollbar" :native="false" height="100%" tag="setction">
                <el-main class="main">
                  
                  <!-- 对话列表 -->
                  <template v-if="loadStatusCom.value === 3">
                    <div
                    v-for="(item, index) in talkItemsCom.value"
                    :key="index"
                    class="talk-item pointer"
                  >
                    <div class="avatar-box">
                      <span v-show="!item.avatar">{{
                        (item.remark_name
                          ? item.remark_name
                          : item.name
                        ).substr(0, 1)
                      }}</span>
                      <img v-show="item.avatar" :src="item.avatar" alt="" />
                      <div class="top-mask"><i class="el-icon-top"></i></div>
                    </div>
                    <div class="card-box">
                      <div class="card-head">
                        <div class="title">
                          <span class="nickname">{{ item.remark_name }}</span>
                          <span class="larkc-tag">0条未读</span>
                          <span class="larkc-tag top">TOP</span>
                        </div>
                        <div class="card-time">
                          <u-time :value="1111"></u-time>
                        </div>
                      </div>
                      <div class="card-content">
                        <span class="online" :class="{'online-color': item.is_online === 1}">[{{item.is_online == 1 ? "在线" : "离线"}}]&nbsp;</span>
                        <span>[图片信息]</span>
                      </div>
                    </div>
                  </div>
                  </template>
                  <!-- 对话列表栏 -->
                </el-main>
              </el-scrollbar>
              </el-main>
              
              
            </el-container>
          </el-aside>
          <!-- 聊天面板容器 -->
          <el-main class="ov-hidden full-height no-padding" style="padding: 0;">
            <welcome-module v-if="false"></welcome-module>
            <talk-panel 
              :params="params"
              
            ></talk-panel>
          </el-main>
        </el-container>
      </template>
    </main-layout>

    <!-- 创建群聊组件 -->

    <!-- 用户查询组件 -->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, computed } from "vue";
import MainLayout from "@/views/layout/MainLayout";
import WelcomeModule from "@/components/layout/WelcomeModule"
import uTime from "./uTime.vue";
import TalkPanel from '@/components/chat/panel/TalkPanel.vue'
import useStore from "@/store"
import { storeToRefs } from "pinia";
import {findTalkIndex} from "@/utils/talk"
//查询关键词
const input = ref("");
//自定义指令
const vOutside = {
  mounted(el, binding) {
    function eventHandler(e) {
      //如果绑定的参数是函数，正常情况也应该是函数，执行
      if (binding.value && typeof binding.value === "function") {
        binding.value(e);
      }
    }
    //用于销毁前注销事件监听
    el._outside__ = eventHandler;
    //添加事件监听
    document.addEventListener("click", eventHandler);
  },
  beforeUnmount(el) {
    //移除事件监听
    document.removeEventListener("click", el._outside__);
    //移除无用属性
    delete el._outside__;
  },
};
//群聊卡片
const launchGroupShow = ref(false);
//工具栏 +
const subMenu = ref(false);
//工具栏隐藏功能
const closeSubMenu = () => {
  subMenu.value = false;
  console.log(subMenu.value);
};
//工具栏事件
const triggerSubMenu = (type) => {
  closeSubMenu();
  if (type === 1) {
    launchGroupShow.value = true;
  } else {
  }
};

//置顶栏
//聊天面板传递的参数
const params = reactive({
  talk_type: 0,
  receiver_id: 0,
  nickname: ""
})
//切换聊天面板
const clickTab = (index_name) => {
  let index = findTalkIndex(index_name)
  if (index === -1) return
  let item = topItems[index_name - 1]
  // let [talk_type, receiver_id] = index_name
  let nickname = item.remark_name ? item.remark_name : item.index_name
  params.value = {
    talk_type,
    receiver_id,
    nickname,
    // is_robot: item.is_robot
  }
  nextTick(() => {
    //提交事件，更新聊天面板
    // if (index_name === topItems.index_name) {
      
    // }
  })
}
//useStore
const store = useStore()
const {loadStatus, items, unreadNum, talkItems, topItems, talkNum} = storeToRefs(store.talk)
//加载类型
const loadStatusCom = computed(() => loadStatus)
//用户数量
const talksCom = computed(() => items)
//会话列表(改变state中的)
// const itemsCom = computed(() => items)
//消息未读数总计
const unreadNumCom = computed(() => unreadNum)
//消息总数(对话列表)
const talkItemsCom = computed(() => talkItems)
//过滤所有置顶对话列表(用户数量)
const topItemsCom = computed(() => topItems)
//消息记录数量
const talkNumCom = computed(() => talkNum)
//对话索引
const index_name = computed(() => store.dialogue.index_name)
//计算置顶栏目的高度
const subheaderPx = computed(() => {
  const n = 7 //一排能显示的用户数
  const num = topItems.length
  let len = 60
  if (num > n) {
    len = (Math.floor(num / n) + (num % n > 0 ? 1 : 0)) * len
  }
  return `${len}px`
})
//当前对话好友在线状态
const isFriendOnline = computed(() => {
  let index = findTalkIndex(index_name)
  return index >= 0 && talksCom.value[index].is_online === "在线"
})
</script>

<style lang="scss" scoped>
::v-deep.el-scrollbar__wrap {
  overflow-x: hidden;
}
.full-height {
  height: 100%;
  overflow: hidden;
}
.aside-box {
  position: relative;
  border-right: 1px solid rgb(245, 245, 245);
  overflow: hidden;
  padding: 0;
  transition: width 0.3s;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    .from-search {
      flex: 1 1;
      flex-shrink: 0;
      ::v-deep .el-input__wrapper {
        border-radius: 20px;
      }
      ::v-deep .el-input__inner {
        height: 32px;
        flex-basis: 32px;
      }
    }

    .tools {
      flex-basis: 32px;
      flex-shrink: 0;
      height: 34px;
      margin-left: 15px;
      cursor: pointer;
      text-align: 15px;
      cursor: pointer;
      text-align: center;
      position: relative;
      user-select: none;

      ::v-deep .el-button--small {
        // height: 32px;
        // width: 32px;
        --el-button-size: 34px;
      }
    }
  }
  .subheader {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px 8px;
    overflow: hidden;
    flex-shrink: 0;
    justify-content: flex-start;
    background: aliceblue;
    // font-size: 13px;
    .top-item {
      flex-basis: 41px;
      flex-shrink: 0;
      height: 50px;
      margin: 3px 0 3px 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .avatar {
        flex-basis: 34px;
        width: 34px;
        height: 34px;
        background-color: #508afe;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        color: white;
        flex-shrink: 0;
        overflow: hidden;
        user-select: none;
        img {
          width: 100%;
          height: 100%;
          background-color: white;
        }
      }
      .name {
        font-size: 13px;
        text-align: center;
        color: #8f959e;
        transform: scale(0.6);
        text-align: center;
        line-height: 20px;
        word-break: break-all;
        overflow: hidden;
        &.active {
          color: #508afe;
        }
      }
    }
    &.shadow {
      box-shadow: 0 2px 6px 0 rgba(31, 35, 41, 0.05);
    }
  }
}

.aside-box .main {
  padding: 0;
  box-sizing: border-box;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: hidden;
  .empty-data {
    text-align: center;
    padding-top: 40px;
    color: #ccc;
  }
  .main-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 10px 6px 10px;
    align-items: center;
    user-select: none;
    .title {
      font-size: 12px;
      font-weight: 600;
      color: #1f2329;
    }
    .icon {
      cursor: pointer;
    }
  }
  .talk-item {
    padding: 8px 10px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px 2px 5px 5px;
    transition: 0.2s ease-in;
    border-radius: 5px;
    cursor: pointer;
    .avatar-box {
      height: 34px;
      width: 34px;
      flex-shrink: 0;
      background-color: #508afe;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;
      user-select: none;
      transition: ease 1s;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 3px;
      }
      .top-mask {
        width: 100%;
        height: 100%;
        background-color: rgba(22, 25, 29, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        color: white;
        display: none;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
      &:hover .top-mask {
        display: flex;
      }
    }
    .card-box {
      height: 40px;
      display: flex;
      align-content: center;
      flex-direction: column;
      flex: 1 1;
      margin-left: 10px;
      overflow: hidden;
      .card-head {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        .title {
          color: #1f2329;
          font-size: 14px;
          line-height: 20px;
          flex: 1 1;
          display: flex;
          align-items: center;
          overflow: hidden;
          .nickname {
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 3px;
          }
          .larkc-tag {
            font-size: 12px;
            font-weight: 400;
            padding: 0 6px;
            border-radius: 2px;
            cursor: default;
            user-select: none;
            background-color: #dee0e3;
            transform: scale(0.83);
            transform-origin: left;
            flex-shrink: 0;
            display: inline-flex;
            align-content: center;
            justify-content: center;
          }
          .top {
            color: #dc9b04 !important;
            background-color: #faf1d1 !important;
          }
          
        }
        .card-time {
            color: #8f959e;
            font-size: 12px;
            margin-left: 10px;
            user-select: none;
          }
      }
      .card-content {
        font-size: 13px;
        line-height: 18px;
        color: #8f959e;
        margin-top: 3px;
        font-weight: 300;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span:first-child {
          margin-right: 5px;
        }
        .online-color {
          color: #8bc34a;
          font-weight: 300;
        }
      }
    }
    &:hover {
      background-color: #ececec;
      border-radius: 3px;
    }
  }
}
</style>
