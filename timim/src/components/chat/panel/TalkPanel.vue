<template>
  <el-container class="ov-hidden full-height">
    <el-container>
      <!-- 聊天面板头部 -->
      <panel-header :data="{}" :online="true"></panel-header>
      <!-- 聊天信息内容面板 -->
      <el-main class="main-box no-padding">
        <div id="weChatPanel" class="talks-container wechatScrollbar">
          <!-- 数据加载状态栏 -->
          <div class="loading-toolbar">
            <span class="color-blue" v-if="loadRecord.status === 0">
              <el-icon><Loading /></el-icon>  正在加载数据中...
            </span>
            <span
              v-else-if="loadRecord.status === 1"
              class="pointer color-blue"
            >
              <i class="el-icon-bottom" /> 查看更多消息...
            </span>
            <span v-else>没有更多消息了...</span>
          </div>
          <!-- 消息主体 -->
          <div>

          </div>
        </div>
        <!-- 消息主体 -->
        <div>
          <!-- 群消息 -->
          <div class="message-box"></div>
          <!-- 撤回消息 -->
          <div class="message-box"></div>
          <!-- 系统文本消息 -->
          <div class="message-box"></div>
          <!-- 其它对话消息 -->
          <div class="message-box record-box">
            <el-aside v-show="multiSelect.isOpen" class="checkbox-column">
              <i class="el-icon-success" />
            </el-aside>
            <aside class="avatar-column">
              <el-avatar class="pointer" :size="30"></el-avatar>
            </aside>
            <main class="main-column">
              <div class="talk-title">
                <span class="time">
                  <i class="el-icon-time" />
                  时间
                </span>
                <!-- 文本消息 -->
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
              </div>
            </main>
          </div>
        </div>
      </el-main>
      <!-- 页脚信息 -->
      <el-footer class="footer-box" height="200">
        <template v-if="multiSelect.isOpen === false">
          <me-edit></me-edit>
        </template>
        <template v-else> </template>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import PanelHeader from "./PanelHeader.vue";
import MeEdit from "@/components/editor/MeEdit.vue";
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
