<template>
    <div style="width: 100%; height: 100%;">
        <header>
            <el-steps class="mb-4" style="width: 50%;" :space="200" :active=active simple finish-status="success">
                <el-step title="门诊病历" />
                <el-step title="医嘱录入" />
                <el-step title="完成接诊" />
            </el-steps>
            <div style="display: flex;justify-content: center;align-items: center;">
                <el-button style="height: 1.8em; width: 1.8em;" @click="back()" circle>
                    <el-icon :size="17">
                        <ArrowLeft />
                    </el-icon>
                </el-button>
                <el-button style="margin-right: 0.5em;height: 1.8em; width: 1.8em;" @click="next()" circle>
                    <el-icon :size="17">
                        <ArrowRight />
                    </el-icon>
                </el-button>
            </div>
        </header>
        <div>
            <div v-if="active == 0">
                <OutpatientMedicalRecords :sid="props.sid" :pid="pid.toString()"></OutpatientMedicalRecords>
            </div>
            <div v-if="active == 1">
                <DoctorAdvice></DoctorAdvice>
            </div>
            <div v-if="active == 2">
                <CompleteComp></CompleteComp>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    sid: { type: String, required: true },
});
import { ref } from 'vue';
import CompleteComp from '@/components/ProcessInfo/CompleteComp.vue';
import OutpatientMedicalRecords from '@/components/ProcessInfo/OutpatientMedicalRecords.vue';
import DoctorAdvice from '@/components/ProcessInfo/DoctorAdvice.vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
const activeName = ref('1')
const pid = sessionStorage.getItem('cur_pid')

const active = ref(0)

const next = () => {
    if (active.value++ > 3) active.value = 4
    activeName.value = (active.value + 1).toString()
}
const back = () => {
    if (active.value-- < 1) active.value = 0
    activeName.value = (active.value - 1).toString()
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
    background-color: #faf9ff;
}
</style>