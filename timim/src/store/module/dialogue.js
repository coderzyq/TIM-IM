import { defineStore } from "pinia";
const useDialogueStore = defineStore("dialogueId", {
    state: () => ({
        //对话来源[1.私聊；2.群聊]
        talk_type: 0,
        //接收者id
        receiver_id: 0,
        //是否是机器人
        is_robot: 0,
        //聊天记录
        records: [],
        //对话索引（聊天对话的唯一索引）
        index_name: null
    })
})
export default useDialogueStore