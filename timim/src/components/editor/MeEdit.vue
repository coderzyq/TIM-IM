<template>
    <el-container class="editor-container">
        <el-header class="no-padding toolbar" height="35px">
            <ul>
                <li>
                    <i class="iconfont icon-icon_im_face" style="font-size: 15px;"></i>
                    <p class="tip-title">表情符号</p>
                </li>
                <li>
                    <el-icon><FolderAdd /></el-icon>
                    <!-- <p class="tip-title">文件</p> -->
                </li>
                <li>
                    <el-icon><Crop /></el-icon>
                    <!-- <p class="tip-title">截图</p> -->
                </li>
                <li>
                    <el-icon><ChatDotRound /></el-icon>
                    <!-- <p class="tip-title">消息记录</p> -->
                </li>
                <li>
                    <el-icon><Microphone /></el-icon>
                    <!-- <p class="tip-title">消息记录</p> -->
                </li>
                <li>
                    <i class="iconfont icon-daima" />
                    <p class="tip-title">代码片段</p>
                </li>
            </ul>
            <ul>
                <li>
                    <i class="iconfont icon-daima" />
                    <p class="tip-title">视频通话</p>
                </li>
                <li>
                    <i class="iconfont icon-daima" />
                    <p class="tip-title">语音通话</p>
                </li>
            </ul>
        </el-header>
    </el-container>    
</template>

<script setup>
import { ref, reactive} from "vue"
//当前编辑的内容
const editorText = ref("")
//图片查看器相关信息
const imageViewer = reactive({isShow: false, file: null})
const codeBlock = reactive({isShow: false, editMode: true})
const fileManager = reactive({isShow: false})
//录音器
const recorder = ref(false)
//上次发送消息的时间
const sendtime = ref(0)
//发送间隔时间（默认1秒）
const interval = ref(1000)
</script>

<style lang="scss" scoped>

</style>