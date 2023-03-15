<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-06 22:43:07
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-15 10:41:51
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\editor\MeEdit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container class="editor-container">
    <el-header class="toolbar" height="35px">
      <ul>
        <li>
          <i class="iconfont icon-icon_im_face" style="font-size: 15px"></i>
          <p class="tip-title">表情符号</p>
        </li>
        <li>
          <el-icon><FolderAdd /></el-icon>
          <p class="tip-title">文件</p>
        </li>
        <li>
          <el-icon><Crop /></el-icon>
          <p class="tip-title">截图</p>
        </li>
        <li>
          <el-icon><ChatDotRound /></el-icon>
          <p class="tip-title">消息记录</p>
        </li>
        <li>
          <el-icon><Microphone /></el-icon>
          <p class="tip-title">消息记录</p>
        </li>
        <li>
          <i class="iconfont icon-daima" />
          <p class="tip-title">代码片段</p>
        </li>
      </ul>
      <ul>
        <li>
          <i class="iconfont icon-shipintonghua" />
          <p class="tip-title">视频通话</p>
        </li>
        <li>
          <i class="iconfont icon-voice_calls1" />
          <p class="tip-title">语音通话</p>
        </li>
        <p class="text-tips no-select">
          <span>按Enter发送 / Shift+Enter 换行</span>
          <!-- <el-popover placement="top-end" width="600" trigger="click">
            <template #reference>
              <div class="editor-books">
              <div class="books-title">编辑说明:</div>
              <p>
                1. 支持上传QQ及微信截图，在QQ或微信中截图后使用Ctrl+v上传图片。
              </p>
              <p>
                2.
                支持浏览器及Word文档中的图片复制上传、复制后使用Ctrl+v上传图片。
              </p>
              <p>3. 支持图片拖拽上传。</p>
              <p>4. 支持文件上传 ( 文件小于100M ) 。</p>
              <p>5. 按Enter发送 / Shift+Enter 换行。</p>
              <p>
                6.
                注意：当文件正在上传时，请勿关闭网页或离开当前对话框，否则将导致文件停止上传或上传失败。
              </p>
            </div>
            <i class="el-icon-info" slot="reference" />
            </template>
          </el-popover> -->
        </p>
      </ul>
    </el-header>
    <el-main class="textarea">
      <!-- <textarea ref="textarea" ></textarea> -->
      <!-- <div
        class="me-editor"
        spellcheck="true"
        contenteditable="plaintext-only"
        placeholder="你想说点什么呢"
      ></div> -->
      <textarea
        rows="6"
        placeholder="你想要聊点什么呢？"
        v-model.trim="editorText"
      ></textarea>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, reactive } from "vue";
//当前编辑的内容
const editorText = ref("");
//图片查看器相关信息
const imageViewer = reactive({ isShow: false, file: null });
const codeBlock = reactive({ isShow: false, editMode: true });
const fileManager = reactive({ isShow: false });
//录音器
const recorder = ref(false);
//上次发送消息的时间
const sendtime = ref(0);
//发送间隔时间（默认1秒）
const interval = ref(1000);
</script>

<style lang="scss" scoped>
.editor-container {
  height: 160px;
  width: 100%;
  background-color: white;
  .toolbar {
    line-height: 35px;
    border-bottom: 1px solid #f5f0f0;
    border-top: 1px solid #f5f0f0;

    ul {
      margin: auto;
      li {
        list-style: none;
        float: left;
        width: 35px;
        margin-left: 3px;
        cursor: pointer;
        text-align: center;
        line-height: 35px;
        position: relative;
        color: #8d8d8d;
        &:hover {
          background-color: #f7f5f5;
        }
        &:hover .tip-title {
          display: block;
        }
        .tip-title {
          display: none;
          position: absolute;
          top: 25px;
          left: 0px;
          height: 26px;
          line-height: 26px;
          background-color: rgba(31, 35, 41, 0.9);
          color: white;
          min-width: 30px;
          font-size: 10px;
          padding: 0 5px;
          border-radius: 2px;
          white-space: pre;
          text-align: center;
          user-select: none;
          z-index: 1;
        }
      }
      .text-tips {
        margin: auto 15px;
        float: right;
        margin-right: 15px;
        font-size: 12px;
        color: #ccc;
        i {
          font-size: 14px;
          cursor: pointer;
          margin-left: 5px;
          color: rgb(255, 181, 111);
        }
      }
    }
  }
  .textarea {
    // box-sizing: border-box;
    overflow: hidden;
    position: relative;
    padding: 0 !important;
    // .me-editor {
    //   width: 100%;
    //   height: inherit;
    //   border: none;
    //   resize: none;
    //   font-size: 15px;
    //   overflow-y: auto;
    //   color: #464545;
    //   padding: 8px;
    //   box-sizing: border-box;
    //   white-space: pre-wrap;
    //   word-break: break-word;
    //   word-wrap: break-word;
    //   -webkit-user-select: text;
    //   user-select: none;
    //   cursor: text;
    //   outline: none;
    //   &:empty:before {
    //     content: attr(placeholder);
    //     color: #464545;
    //     font-size: 12px;
    //     font-weight: 400;
    //   }
    // }
    textarea {
      width: calc(100%);
      width: -moz-calc(100% );
      width: -webkit-calc(100%);
      height: calc(100% - 10px);
      height: -moz-calc(100% - 10px);
      height: -webkit-calc(100% - 10px);
      border: 0 none;
      outline: none;
      resize: none;
      font-size: 15px;
      font-weight: 400;
      overflow-y: auto;
      color: #464545;
      padding: 5px;
      position: relative;
    }
  }
}
</style>
