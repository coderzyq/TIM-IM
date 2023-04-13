<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-04-11 20:17:00
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-04-14 00:07:38
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\chat\message\TextMessage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div
        class="text-message"
        :class="{
            left: float == 'left',
            right: float == 'right',
            'max-width': !fullWidth
        }"
    >
        <div class="arrow" v-if="arrow">111</div>
        <pre v-html="htmlData"></pre>
    </div>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue';
const props = defineEmits({
    content: {
        type: [String, Number],
        default: ''
    },
    float: {
        type: String,
        default: 'left'
    },
    fullWidth: {
        type: Boolean,
        default: true,
    },
    arrow: {
        type: Boolean,
        default: true
    }
})
const htmlData = ref("2222");
onBeforeMount(() => {
    const text = null;
    htmlData.value
})
</script>

<style lang="less" scoped>
@bg-left-color: #f5f5f5;
@bg-right-clor: #1ebafc;

.text-message {
    position: relative;
    min-width: 30px;
    min-height: 30px;
    border-radius: 5px;
    padding: 5px;
    .arrow {
        position: absolute;
        width: 10;
        height: 10;
        font-size: 0;
        border: 5px solid;
        top: 6px;
        left: -10px;
    }
    &.max-width {
        max-width: calc(100% - 50px);
    }
    &.left {
        color: #3a3a3a;
        background: @bg-left-color;
        .arrow {
            border-color: transparent @bg-left-color transparent transparent;
        }
    }
    &.left {
        color: #fff;
        background: @bg-right-clor;
        .arrow {
            right: -10px;
            left: unset;
            border-color: transparent transparent transparent @bg-right-clor;
        }
    }
    pre {
        white-space: pre-wrap;
        overflow: hidden;
        word-break: break-word;
        word-wrap: break-word;
        font-size: 15px;
        padding: 3px 10px;
        line-height: 25px;
    }
}
</style>