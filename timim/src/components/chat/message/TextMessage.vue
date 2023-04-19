<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-04-11 20:17:00
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-04-19 23:41:42
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\chat\message\TextMessage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div
        class="text-message"
        :class="{
            left: float == 'left',
            right: float == 'right',
            // 'max-width': !fullWidth
        }"
    >
        <div class="arrow" v-if="arrow"></div>
        <pre>{{ htmlData }}</pre>
    </div>
</template>

<script setup>
import {onBeforeMount, onMounted, onUpdated, ref, watch} from 'vue';
const props = defineProps({
    content: {
        type: String,
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
const float = ref('right')
const arrow = ref(false)
const htmlData = ref("111");
// onUpdated(() => {
//     console.log(props.content);
//     htmlData.value = props.content
// })
console.log(props.content);
watch(
    () => props.content,
    (value) => {
        console.log(value);
        htmlData.value = value
    }
)
console.log(htmlData.value);
// onBeforeMount(() => {
//     // const text = null;
//     console.log(props.content);
//     htmlData.value = props.content
//     console.log(htmlData.value);
// })
// onMounted(() => {
//     htmlData.value = props.content
// })
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
    background-color: green;
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