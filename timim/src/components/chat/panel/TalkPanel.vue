<template>
  <el-container class="ov-hidden full-height">
    <el-container>
      <!-- 聊天面板头部 -->
      <panel-header :data="talkProps.params" :online="isOnline"></panel-header>
      <!-- 聊天信息内容面板 -->
      <el-main class="main-box no-padding">
        <div id="weChatPanel" class="talks-container wechatScrollbar">
          <!-- 数据加载状态栏 -->
          <div class="loading-toolbar">
            <span class="color-blue" v-if="loadRecord.status === 0">
              <el-icon><Loading /></el-icon> 正在加载数据中...
            </span>
            <span
              v-else-if="loadRecord.status === 1"
              class="pointer color-blue"
            >
              <i class="el-icon-bottom" /> 查看更多消息...
            </span>
            <span v-else>没有更多消息了...</span>
          </div>
          <text-message :arrow="true" :content="contentCom"></text-message>
          <!-- 消息主体 -->
          <!-- <div v-for="(item, idx) in records" :key="item.id"> -->
          <!-- 
            <div v-for="(item, idx) in records" :key="item.id">
             群消息 -->
          <!-- 撤回消息 -->
          <!-- 其它对话消息 -->
          <!-- <div
              class="message-box record-box"
              :class="{
                'direction-rt': item.float === 'right',
                'checkbox-border': multiSelect.isOpen === true,
              }"
            >
              <aside v-show="multiSelect.isOpen" class="checkbox-xolumn">
                <i
                  class="el-icon-success"
                  :class="{ selected: vertifyMultiSelect(item.id) }"
                  @click="triggerMultiSelect(item.id)"
                ></i>
              </aside>
              <aside class="avator-column"> -->
          <!-- <el-avator
                      class="pointer"
                      :size="30"
                      :src="item.avator"
                      @click.native="catFriendDetail(item.user_id)"
                    ></el-avator> -->
          <!-- </aside>
              <main class="main-column">
                <div class="talk-title">
                  <span
                    v-show="
                      params.talk_type === 1 ||
                      (params.talk_type === 2 && item.float === 'right')
                    "
                    class="time"
                  >
                    时间 -->
          <!-- <i class="el-icon-time"></i>
                      {{ parseTime(item.created_at, '{m}月{d}日{h}:{i}') }} -->
          <!-- </span>
                </div> -->
          <!-- <div class="talk-content">
                  <span
                    class="nickname"
                    v-show="params.talk_type === 2 && item.float === 'left'"
                    >时间 -->
          <!-- {{ item.friend_remarks || item.nickname }}
                      {{ parseTime(item.created_at, '{m}月{d}日{h}:{i}') }} -->
          <!-- </span> -->
          <!-- 文本消息 -->
          <!-- <text-message
                    v-if="true"
                    :content="item.content"
                    :float="item.float"
                    :full-width="false"
                    :arrow="true"
                    @contextmenu.native="onCopy(idx, item, $event)"
                  ></text-message> -->
          <!-- 图片消息 -->
          <!-- 音频文件预留 -->
          <!-- 视频文件预留 -->
          <!-- 文件消息 -->
          <!-- 会话记录消息 -->
          <!-- 代码块消息 -->
          <!-- 投票消息 -->
          <!-- 登录消息 -->
          <!-- 位置消息 -->
          <!-- 未知消息 -->
          <!-- 消息引用（预留） -->
          <!-- </div> -->
          <!-- </main> -->
          <!-- </div> -->
          <!-- 消息时间 -->
          <!-- <div></div> -->
          <!-- </div> -->
        </div>
      </el-main>
      <!-- 页脚信息 -->
      <el-footer class="footer-box" height="200">
        <template v-if="multiSelect.isOpen === false">
          <me-edit
            @send="submitSendMessage"
            @keyboard-event="onKeyboardEvent"
          ></me-edit>
        </template>
        <template v-else> </template>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive, watch, computed, watchEffect, onMounted } from "vue";
import PanelHeader from "./PanelHeader.vue";
import MeEdit from "@/components/editor/MeEdit.vue";
import TextMessage from "@/components/chat/message/TextMessage.vue";
import useDialogueStore from "@/store/module/dialogue";
import useTalkSotre from "@/store/module/talk";
import useSettingStore from "@/store/module/setting";

const talkProps = defineProps({
  params: {
    type: Object,
    default: () => {
      return {
        //消息来源 1.好友私信，2.群聊
        talk_type: 1,
        //消息接收者ID
        receiver_id: 0,
        nickname: "",
      };
    },
  },
  //用户是否在线
  isOnline: {
    type: Boolean,
    default: true,
  },
});
//记录加载相关参数
const loadRecord = reactive({ status: 0, minRecord: 0 });
//多选相关操作
const multiSelect = reactive({ isOpen: false, items: [], mode: 0 });
//群组box
const group = reactive({ panel: false, notice: false });
//键盘输入事件
const keyboardEvent = reactive({ isShow: false, time: 0 });
//聊天记录管理器数据
const findChatRecord = ref(false);
//置顶按钮是否显示
const tipsBoard = ref(false);
const useDialog = useDialogueStore();
//消息类型
const recordCom = computed(() => useDialog.talk_type);
//消息记录
const records = computed(() => useDialog.records);
//对话索引
const indexNameCom = computed(() => useDialog.receiver_id);
//昵称
const nicknameCom = computed(() => useDialog.nickname);
const index_name = computed(() => useDialog.index_name);
//未读消息
//加载用户聊天详情信息
const loadChatRecords = () => ({
  receiver_id: indexNameCom.value,
  talk_type: recordCom.value,
  nickname: nicknameCom.value,
});
const talkStore = useTalkSotre();

//回车键发送消息回调事件
const content = ref("")
const conta = ref("")
const contentCom = computed({
  get: () => {
    return content.value
  },
  set: (cont) => {
    content.value  = cont   
    console.log(cont);
    console.log(content.value, "233");
  }
})
console.log(content.value);
const submitSendMessage = (content) => {
  console.log(content);
  console.log(2222);
  // console.log("发送的", content);
  // conta.value = content
  contentCom.value = content
  // console.log(conta.value, "content");
  // talkStore.UPDATE_TALK_ITEM({
  //   index_name: index_name.value,
  //   draft_text: content.value,
  // });
};

//推送编辑事件消息
const settingStore = useSettingStore();
const onKeyboardEvent = (content) => {
  talkStore.UPDATE_TALK_ITEM({
    index_name: index_name.value,
    draft_text: content,
  });
  //判断当前对话是否属于私聊信息
  if (talkProps.params.talk_type === 2 || !talkProps.isOnline) return;
  //判断是否推送键盘输入事件消息
  if (!settingStore.keyboardEventNotify) {
    return false;
  }
  let time = new Date().getTime();
  //判断在两秒内是否已推送事件
  if (keyboardEvent.time !== 0 && time - keyboardEvent.time < 2000) return;
  console.log(time);
  keyboardEvent.time = time;
};

onMounted(() => {
  loadChatRecords();
});
</script>

<style lang="scss" scoped>
.main-box {
  position: relative;
  overflow: hidden;
  display: block;
  flex-basis: 1;
  height: 100%;
  padding: 0;
  .talks-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px 30px;
    overflow: auto;
    &.wechatScrollbar::-webkit-scrollbar {
      background-color: #ffffff;
    }
    .loading-toolbar {
      height: 30px;
      line-height: 30px;
      margin: 5px 0;
      text-align: center;
      user-select: none;
      font-size: 13px;
      color: #cec4c4;
      .color-blue {
        color: #409eff;
      }
    }
  }
}

.footer-box {
  height: 200px !important;
  padding: 0;
  border-top: 1px solid #f5f5f5;
}
</style>
