/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-23 23:19:53
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-26 23:51:29
 * @FilePath: \LCMIM\TIM-IM\timim\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description: 
 * @return {*}
 */
import useTalkSotre from "./module/talk";
import useDialogueStore from "./module/dialogue";
export default function useStore() {
    return {
        talk: useTalkSotre(),
        dialogue: useDialogueStore()
    }
}