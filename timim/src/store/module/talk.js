/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-03-25 16:59:10
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-04-10 23:46:09
 * @FilePath: \LCMIM\TIM-IM\timim\src\store\module\talk.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia"
const useTalkSotre = defineStore("talkId", {
    state: () => ({
        loadStatus: 3, //加载状态[1:未加载；2:加载中；3:加载完成；4:加载失败]
        //会话列表
        items: [{
                remark_name: "jisoo",
                index_name: "1_0",
                avatar: require("@/assets/img-jisoo/th1.jpg"),
                is_online: 1
            },
            {
                remark_name: "金智秀",
                index_name: "1_1",
                avatar: require("@/assets/img-jisoo/th2.jpg"),
                is_online: 1
            },
            {
                remark_name: "粉墨",
                index_name: "1_2",
                avatar: require("@/assets/img-jisoo/th3.jpg"),
                is_online: 0
            },
            {
                remark_name: "式样",
                index_name: "1_3",
                avatar: require("@/assets/img-jisoo/th4.jpg"),
                is_online: 1
            },
            {
                remark_name: "kobe",
                index_name: "1_4",
                avatar: require("@/assets/img-jisoo/th5.jpg"),
                is_online: 0
            },
            {
                remark_name: "James",
                index_name: "1_5",
                avatar: require("@/assets/img-jisoo/th6.jpg"),
                is_online: 1
            },
            {
                remark_name: "curry",
                index_name: "1_6",
                avatar: require("@/assets/img-jisoo/th7.jpg"),
                is_online: 0
            },
            {
                remark_name: "Durant",
                index_name: "1_7",
                avatar: require("@/assets/img-jisoo/th8.jpg"),
                is_online: 1
            },
            {
                remark_name: "欧文",
                index_name: "1_8",
                avatar: require("@/assets/img-jisoo/th9.jpg"),
                is_online: 1
            },
            {
                remark_name: "勒布朗",
                index_name: "1_9",
                avatar: require("@/assets/img-jisoo/th1.jpg"),
                is_online: 0
            }
        ],
        //最后一条消息
        unreadMessage: {
            num: 0,
            nickname: '未知',
            content: '...'
        }
    }),
    //修改state中的值
    getters: {
        //过滤所有置顶对话列表
        topItems: (state) => {
            return state.items
        },
        talkItems: state => {
            return state.items.sort()
        },
        //消息未读数总计
        unreadNum: state => {
            return state.items.reduce()
        },
        talkNum: state => state.items.length
    },
    //关于异步同步的操作都放在actions中
    actions: {
        SET_LOAD_STATUS: (state, resource) => {
            state.loadStatus = resource
        },
        //设置对话列表
        SET_TALK_ITEMS: (state, resource) => {
            state.items = resource.items

        },
        //更新呢对话节点
        UPDATE_TALK_ITEM(resource) {
            console.log(this.items);
            console.log(resource);
            for (const iterator of this.items) {
                if (iterator.index_name === resource.index_name) {
                    Object.assign(iterator, resource)
                    console.log(resource);
                    console.log(iterator);
                    break
                }
            }
        },
        //新增对话节点
        PUSH_TALK_ITEM: (state, resource) => {
            state.items.push(resource)
        },
        //移除节点
        REMOVE_TALK_ITEM: (state, index_name) => {
            for (let i in state.items) {
                if (state.items[i].index_name === index_name) {
                    state.items.splice(i, 1)
                    break
                }
            }
        },
        //更新对话消息
        UPDATE_TALE_MESSAGE: (state, resource) => {
            for (const iterator of state.items) {
                if (iterator.index_name !== resource.index_name) {
                    continue
                }
                iterator.unread_num++
                    iterator.msg_text = resource.msg_text
                iterator.updated_at = resource.updated_at
                break
            }
        },
        //设置会话未读消息
        SET_TALK_UNREAD_MESSAGE: (state, resource) => {
            state.unreadMessage.num++
                state.unreadMessage.nickname = resource.nickname
            state.unreadMessage.content = resource.content
        },
        //清除最后一条未读消息
        CLEAR_TALK_UNREAD_MESSAGE: (state) => {
            state.unreadMessage = {
                num: 0,
                nickname: '未知',
                content: '...'
            }
        },
        //加载会话列表
        LOAD_TALK_ITEMS: async(context) => {
            try {
                context.commit('SET_LOAD_STATUS', 2)
                const res = await ServeGetTalkList()
                if (res.code !== 200) return
                context.commit('SET_TALK_ITEMS', {
                    items: res.data.map(item => formateTalkItem(item))
                })
                context.commit('SET_LOAD_STATUS', 3)
            } catch (err) {
                context.commit('SET_LOAD_STATUS', 4)
            }
        }
    }
})
export default useTalkSotre