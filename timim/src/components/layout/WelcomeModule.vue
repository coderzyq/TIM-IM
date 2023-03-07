<!--
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-03 11:39:05
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-04 23:06:51
 * @FilePath: \LCMIM\TIM-IM\timim\src\components\layout\WelcomeModule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="welcome-box">
        <div class="famous-box">
            <img :src="require('@/assets/img/WeChat.jpg')" alt=""/>
            <p>
                不是井里没有水，而是你挖的不够深<br/>
                不是成功来得慢，而是你努力的不够多<br/>
                加油吧！...
            </p>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.welcome-box {
    height: 100%;
    width: 100%;
    .famous-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        font-size: 24px;
        user-select: none;
        img {
            width: 100%;
            height: 100%;
            text-align: center;
            position: relative;
            top: -30px;
        }
        p {
            width: 100%;
            font-weight: 300;
            text-align: center;
            font-size: 15px;
            color: #b9b4b4;
            margin-top: -30px;
        }
    }
}
</style>