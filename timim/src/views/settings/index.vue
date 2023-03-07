<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-02-28 22:54:35
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-01 14:34:31
 * @FilePath: \LCMIM\TIM-IM\timim\src\views\settings\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <main-layout :idx="1">
            <template #container>
                <el-container  class="full-height">
                <!-- 左侧侧边栏 -->
                <el-aside width="320px" class="headerbox">
                    这是默认设置
                    <!-- <el-container class="full-height" direction="vertical">

                    </el-container> -->
                </el-aside>
                <!-- 聊天面板容器 -->
                <el-container class="ov-hidden full-height no-padding">
                    这是设置具体内容
                </el-container>
            </el-container>
            </template>
            
        </main-layout>
    </div>
</template>

<script setup>
import MainLayout from '@/views/layout/MainLayout'
</script>

<style lang="postcss" scoped>

</style>