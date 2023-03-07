<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-01 15:59:42
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-01 17:52:27
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\group\GroupLaunch.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template> 
    <div class="lum-dialog-mask">
        <el-container class="lum-dialog-box" v-outside="close">
            <el-header class="no padding header no-select" height="60px">
                <p>
                    {{  }}
                </p>
                <p class="tools">
                    <i class="el-icon-close" @click="close"></i>
                </p>
            </el-header>
            <el-main class="main no-padding">
                <el-container class="full-height">
                    <el-aisde width="250px" class="aside-border">
                        <el-container class="full-height no-select">
                            <el-header
                                class="no-padding search-header"
                                height="50px"
                                :class="{shadow: searchHeaderShadow}"
                            >
                                <el-input
                                    v-model="keywords"    
                                    placeholder="搜索 | 好友 or 群组"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                />
                            </el-header>
                            <el-main class="no-padding">
                                <el-scrollbar
                                    ref="scrollbar"
                                    class="full-height"
                                    tag="section"
                                    :native="false"
                                >
                                    <ul class="friend-items no-select">
                                        <li
                                            v-for="item in search"
                                            :key="item.id"
                                            @click="triggerContacts(item)"
                                        >
                                            <div class="avator">
                                                <el-avatar :size="25" :src="item.avatar" shape="square">
                                                    <img src="require()" alt="">
                                                </el-avatar>
                                            </div>
                                            <div class="content"><span class="lum-text-ellipis">{{ item.nickname }}</span></div>
                                            <div class="checkbox">
                                                <i class="el-icon-success" :class="{'item-active': item.checked}"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </el-scrollbar>
                            </el-main>
                        </el-container>
                    </el-aisde>
                    
                    <el-main class="no-padding">
                        <el-container class="full-height">
                            <el-header height="50px" v-show="!readonly">
                                <div class="group-from noselect">
                                    <label>群名称(必填)</label>
                                    <p>
                                        <el-input v-model="from.groupName" placeholder="请输入群名称(必填)" size="small" :maxlength="20"></el-input>
                                    </p>
                                </div>
                            </el-header>
                            <el-header height="40px" :class="{mt40: !readonly}">
                                <el-divider content-position="left" class="no-select">
                                    <span style="color: #c4c5c7">
                                        邀请成员({{ selected.length }})
                                    </span>
                                </el-divider>
                            </el-header>
                            <el-main>
                                <el-scrollbar :native="false" tag="section" class="full-height">
                                <ul class="friend-items no-select">
                                    <li
                                        v-for="item in selected"
                                        :key="item.id"
                                        @click="triggerContacts(item)"
                                        style="padding 0"
                                    >
                                    <div class="avator">
                                                <el-avatar :size="25" :src="item.avatar" shape="square">
                                                    <img src="require()" alt="">
                                                </el-avatar>
                                            </div>
                                            <div class="content"><span class="lum-text-ellipis">{{ item.nickname }}</span></div>
                                            <div class="checkbox">
                                                <i class="el-icon-success" :class="{'item-active': item.checked}"></i>
                                            </div>
                                    </li>
                                </ul>
                            </el-scrollbar>
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
            </el-main>
            <el-footer class="no-padding footer" height="50px">
                <el-button size="small" @click="close" plain>取消</el-button>
                <el-button
                    v-if="from.groupId === 0"
                    type="primary"
                    size="small"
                    @click="createSubmit"
                >
                    创建群组<span v-show="selected.length">{{ selected.length }}</span>
                </el-button>
                <el-button v-else type="primary" size="small" @click="inviteSubmit">
                    立即邀请{{ selected.length }}
                </el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
::v-deep.el-scrollbar__wrap {
    overflow-x: hidden;
}

.lum-dialog-box {
    width: 650px;
    max-width: 650px;
    height: 550px;
    .main {
        .aside-border {
            border-right: 1px solid #f5eeee;
        }
    }
    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        border-top: 1px solid #f5eeee;
    }
}
.search-header {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.shadow {
        box-shadow: 0 2px 6px 0 rgba(31, 35, 41, 0.05);
    }
}
</style>