<template>
    <div class="wrapper">
        <header>
            <span style="margin-left: 1em; color: #555;font-weight: 700;">病人列表</span>
        </header>
        <el-table :data="patientList" border style="width: 100%">
            <el-table-column prop="id" label="登记号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="birthday" label="出生日期" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="source" label="来源" />
            <el-table-column prop="diagnostic" label="诊断" />
            <el-table-column prop="doctor" label="医生" />
            <el-table-column prop="department" label="科室" />
            <el-table-column prop="bookTime" label="预订时间" />
            <el-table-column prop="startTime" label="就诊时间" />
            <el-table-column fixed="right" label="操作" min-width="50">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row.id, scope.row.pid)">
                        接诊
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { useLocalStore } from '@/store/local';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let patientList = ref()
const router = useRouter()
const localStore = useLocalStore()
const handleClick = (sid: any, pid: any) => {
    console.log(sid, pid)
    router.push({ name: 'process', params: { sid: sid } });
    localStore.cur_pid = pid
}

onMounted(async () => {
    await getAllWaitingList()
})

const getAllWaitingList = async () => {
    await axios.get(`/auth/api/registrations/waiting`).then((resp) => {
        patientList.value = resp.data
        console.log(patientList.value)
        for (let i = 0; i < patientList.value.length; i++) {
            patientList.value[i].source = mapSource(patientList.value[i].source)
        }
    })
}

const mapSource = (source: number) => {
    return source === 0 ? '线上挂号' : '线下挂号';
};


</script>

<style lang="css" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft YaHei';
}

header {
    height: 3em;
    display: flex;
    justify-content: flex-start;
    align-items: center
}
</style>