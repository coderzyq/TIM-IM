<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-05 18:05:42
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-04-02 15:32:26
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\chat\panel\PanelHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-header id="panel-header">
    <div class="module left-module">
      <span
        class="icon-bage"
        :class="{ 'red-color': params.talk_type === 1 }"
        v-show="params.is_robot === 0"
      >
        {{ params.talk_type == 1 ? "好友" : "群组" }}
      </span>
      <span class="nickname">{{ params.nickname }}</span>
      <span class="num" v-show="isOnline">({{ groupNum }})</span>
    </div>
    <div
      v-show="(params.talk_type === 1) & (params.is_robot === 0)"
      class="module center-module"
    >
      <p class="online">
        <span class="online-status" v-show="isOnline"></span>
        <span>{{ isOnline ? "在线" : "离线" }}</span>
      </p>
      <p class="keyboard-status" v-show="isKeyboard">对方正在输入...</p>
    </div>
    <div class="module right-module">
        <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            content="历史消息"
        >
            <template #reference>
                <el-button class="m-2">Hover to activate</el-button>
            </template>
        </el-popover>
        <el-tooltip content="群公告" placement="bottom-end">
            <p v-show="params.talk_type == 2">
                <i class="iconfont icon-gonggao2" />
            </p>
        </el-tooltip>
        <el-tooltip content="群设置" placement="bottom-end">
            <p v-show="params.talk_type == 2">
                <i class="el-icon-setting" />
            </p>
        </el-tooltip>
    </div>
  </el-header>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
const props = defineProps({
  keyboard: {
    type: [Boolean, Number],
    default: false,
  },
  data: {
    type: Object,
    default: () => {
      return {
        talk_type: 1,
        receiver_id: 0,
        params: 0,
        nickname: 0,
      };
    },
  },
  online: {
    type: Boolean,
    default: false
  }
});
const params = reactive({
  is_robot: 0,
  talk_type: 1,
  receiver_id: 0,
  params: 0,
  nickname: "jisoo",
});
const isOnline = ref(false);
const isKeyboard = ref(false);
const groupNum = ref(1);
//设置配置数据
const setParamsData = (object) => {Object.assign(params, object)}
//监听用户是否在线？
const setOnlineStatus = (value) => isOnline.value = value
watch(
  () => props.data,
  (value) => {
    setParamsData(value)
    // console.log(dat);
  } 
)
watch(
  () => props.online,
  (value) => {
    setOnlineStatus(value)
  }
)
</script>

<style lang="scss" scoped>
#panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #f5eeee;
  .module {
    width: 100%/3;
    height: 100%;
    display: flex;
    align-items: center;
    &.left-module {
      padding-right: 5px;
      text-align: center;
      .icon-bage {
        background: rgb(81, 139, 254);
        height: 18px;
        line-height: 18px;
        padding: 1px 3px;
        font-size: 10px;
        color: #fff;
        border-radius: 3px;
        margin-right: 8px;
        flex-shrink: 0;
        &.red-color {
          background: #f97348 !important;
        }
      }
      .nickname {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 8px;
      }
    }
    &.center-module {
      flex-direction: column;
      justify-content: center;
      .online {
        color: #cccccc;
        font-weight: 300;
        font-size: 15px;
        .online-status {
          position: relative;
          top: -1px;
          display: inline-block;
          width: 6px;
          height: 6px;
          vertical-align: middle;
          border-radius: 50%;
          background-color: #1890ff;
          margin-right: 5px;
          &:after {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 100%;
            height: 100%;
            border: 1px solid #1890ff;
            border-radius: 50%;
            -webkit-animation: antStatusProcessing 1.2s ease-in-out infinite;
            animation: antStatusProcessing 1.2s ease-in-out infinite;
            content: "";
          }
        }
      }
      .keyboard-status {
        height: 20px;
        line-height: 18px;
        font-size: 10px;
        animation: inputfade 600ms infinite;
      }
    }
    &.right-module {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      p {
        cursor: pointer;
        margin: 0 8px;
        font-size: 20px;
        color: #828f95;
        &:active {
          font-size: 26px;
          transform: scale(1.3);
          transition: ease 0.5s;
          color: red;
        }
      }
    }
  }
}
/* css动画 */
@keyframes inputfade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes inputfade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@keyframes antStatusProcessing {
  0% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.5;
  }
  to {
    -webkit-transform: scale(2.4);
    transform: scale(2.4);
    opacity: 0x;
  }
}
</style>
