/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-25 18:42:49
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-29 20:21:58
 * @FilePath: \LCMIM\TIM-IM\timim\src\store\module\dialogue.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
const useDialogueStore = defineStore("dialogueId", {
    state: () => ({
        //对话来源[1.私聊；2.群聊]
        talk_type: 0,
        //接收者id
        receiver_id: 0,
        //是否是机器人
        is_robot: 0,
        //昵称
        nickname: '',
        //聊天记录
        records: [],
        //对话索引（聊天对话的唯一索引）
        index_name: null
    }),
    actions: {
        UPDATE_DIALOGUE_MESSAGE(resource) {
            this.records = []
            this.talk_type = parseInt(resource.talk_type)
            this.receiver_id = parseInt(resource.receiver_id)
            this.nickname = resource.nickname
                // this.is_robot = parseInt(resource.is_robot)
            if (this.talk_type === 0 || this.receiver_id === 0) {
                this.index_name = null
            } else {
                this.index_name = resource.talk_type + '_' + resource.receiver_id
            }
        }
    }
})
export default useDialogueStore