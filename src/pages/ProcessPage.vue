<template>
    <div style="width: 100%; height: 100%;">
        <header>
            <el-steps class="mb-4" style="width: 30%;" :space="200" :active=active simple finish-status="success">
                <el-step title="门诊病历" />
                <el-step title="Step 2" />
                <el-step title="Step 3" />
            </el-steps>
            <el-button style="margin-right: 0.5em; height: 100%;" type="primary" @click="next()">
                next
            </el-button>
        </header>
        <el-tabs v-model="activeName" type="card" class="tabs">
            <el-tab-pane name="1">
                User
            </el-tab-pane>
            <el-tab-pane name="2">Config</el-tab-pane>
            <el-tab-pane name="3">Role</el-tab-pane>
            <el-tab-pane name="4">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    sid: { type: String, required: true },
});
import { onMounted, ref } from 'vue';
const activeName = ref('1')

const active = ref(0)

const next = () => {
    if (active.value++ > 2) active.value = 3
    activeName.value = (active.value+1).toString()
}
</script>
<style lang="css" scoped>
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mb-4 {
    padding: 0.5em 0em;
    scale: 0.8;
}
:deep(.el-tabs__header) {
  display: none; /* 隐藏表头 */
}
</style>