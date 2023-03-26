/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-16 23:52:43
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-26 23:11:01
 * @FilePath: \LCMIM\TIM-IM\timim\src\utils\talk.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 通过对话索引查找对话列表下表
 * 
 * @param {String} index_name 
 */
import useTalkSotre from '@/store/module/talk';
const talk = useTalkSotre()
export function findTalkIndex(index_name) {
    return talk.items.findIndex(item => item.index_name === index_name)
}