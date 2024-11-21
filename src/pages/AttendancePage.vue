<template>
    <div class="wrapper">
        <header>
            <span style="margin-left: 1em; color: #555;font-weight: 700;">病人列表</span>
        </header>
        <el-table :data="patientList" border style="width: 100%">
            <el-table-column prop="serialize_id" label="登记号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="birth_date" label="出生日期" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="diagnostic" label="诊断" />
            <el-table-column prop="doctor" label="医生" />
            <el-table-column prop="department" label="科室" />
            <el-table-column prop="source" label="诊断" />
            <el-table-column prop="start_date" label="就诊日期" />
            <el-table-column prop="start_time" label="就诊时间" />
            <el-table-column fixed="right" label="操作" min-width="50">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row.serialize_id)">
                        接诊
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let patientList = ref([
    {
        serialize_id: '000001',
        name: 'lxy',
        gender: '男',
        birth_date: '2004-07-01',
        age: '18',
        status: '等待',
    },
    {
        serialize_id: '000002',
        name: 'Tom',
        gender: '男',
        birth_date: '2004-07-01',
        age: '20',
        status: '等待',
    }
])
const router = useRouter()

const handleClick = (sid:any)=>{
    router.push({ name: 'process', params: { sid:sid } });
}
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