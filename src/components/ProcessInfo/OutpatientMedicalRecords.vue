<template>
    <div style="width: 100%; height: calc(100vh - 5.2em)">
        <el-container style="height: 100%">
            <el-aside style="height: 100%; width: 10%;">
                <el-menu v-model="activeName" style="width: 100%; height: 100%;">
                    <el-menu-item @click="activeName = '0'">基本信息</el-menu-item>
                    <el-menu-item @click="activeName = '1'">诊断录入</el-menu-item>
                    <el-menu-item @click="activeName = '2'">病历录入</el-menu-item>
                    <el-menu-item @click="changeToHyperInsight">
                        <div class="hyper-title">HyperInsight</div>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="padding: 0;" class="wrapper">
                    <div v-if="activeName === '0'">
                        <BasicInfo :pid=props.pid></BasicInfo>
                    </div>
                    <div v-if="activeName === '1'">
                        <PrescriptionComp :pid=props.pid></PrescriptionComp>
                    </div>
                    <div v-if="activeName === '2'">
                        <MedicalRecordComp :pid="props.pid" :vid="props.sid"></MedicalRecordComp>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PrescriptionComp from '../Outpatient/PrescriptionComp.vue';
import BasicInfo from '../Outpatient/BasicInfo.vue';
import MedicalRecordComp from '../Outpatient/MedicalRecordComp.vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    sid: { type: String, required: true },
    pid: { type: String, required: true }
});
console.log('ppid:',props.pid)
let activeName = ref('0')
let router =  useRouter();
const changeToHyperInsight = ()=>{
    router.push({
        name: 'hyperinsight',
        params: { sid: props.sid }
    })
}
</script>
<style scoped>
.wrapper::-webkit-scrollbar {
    display: none;
}

.wrapper {
    height: 100%;
    width: 100%;
}


.hyper-title {
    background-image: linear-gradient(to right, blue, #FF3E00, #6A00FF);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 400% 400%;
    font-weight: 800;
    animation: gradientAnimation 5s linear infinite;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>