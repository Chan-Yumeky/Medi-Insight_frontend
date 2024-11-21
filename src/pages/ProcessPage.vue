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
        <div>
            <div v-if="active==0">
                <BasicInfo :sid="props.sid"></BasicInfo>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    sid: { type: String, required: true },
});
import { ref } from 'vue';
import BasicInfo from '@/components/ProcessInfo/BasicInfo.vue';
const activeName = ref('1')

const active = ref(0)

const next = () => {
    if (active.value++ > 2) active.value = 3
    activeName.value = (active.value + 1).toString()
}
</script>
<style lang="css" scoped>
header {
    width: 100%;
    height: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mb-4 {
    padding: 0.5em 0em;
    scale: 0.8;
}
</style>