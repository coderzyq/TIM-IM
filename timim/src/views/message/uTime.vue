<template>
    <div>{{ time }}</div>    
</template>

<script setup>
import {ref} from 'vue'
const value = defineProps({
    type: String
})
//时间
const time = ref('15:18')
//时间暂停
const timeout = ref(null)
</script>

<style lang="scss" scoped>

</style>