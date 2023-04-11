/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-25 18:43:29
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-04-10 23:50:05
 * @FilePath: \LCMIM\TIM-IM\timim\src\store\module\setting.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';

const useSettingStore = defineStore("settingID", {
    state: () => ({
        //主题模式true：全屏模式 false：居中模式
        themeMode: false,
        //主题模式位居中模式下，body的背景图片
        themeBagImg: "",
        //主题颜色
        themeColor: '',
        //消息提示音
        notifyCueTone: true,
        //键盘输入事件消息推送开关
        keyboardEventNotify: true
    })
})

export default useSettingStore