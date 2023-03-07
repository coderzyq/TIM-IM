<template>
    <div>
        <main-layout :idx="1">
            <template #container>
                <el-container  class="full-height">
                <!-- 左侧侧边栏 -->
                <el-aside width="320px" class="headerbox">
                    这是笔记内容
                    <!-- <el-container class="full-height" direction="vertical">

                    </el-container> -->
                </el-aside>
                <!-- 聊天面板容器 -->
                <el-container class="ov-hidden full-height no-padding">
                    这是笔记具体内容
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