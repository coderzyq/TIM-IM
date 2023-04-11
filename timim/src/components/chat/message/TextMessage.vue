<template>
    <div
        class="text-message"
        :class="{
            left: float == 'left',
            right: float == 'right',
            'max-width': !fullWidth
        }"
    >
        <div class="arrow" v-if="arrow"></div>
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
        default: false
    }
})
const htmlData = ref("");
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
        width: 0;
        height: 0;
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