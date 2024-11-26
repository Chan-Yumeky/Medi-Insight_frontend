<template>
    <div class="wrapper-binfo">
        <h3 style="padding:1em 0em; font-weight:400;">基本信息</h3>
        <h2 style="padding:1em 3em;">{{ userInfo.username }}</h2>
        <el-form :data="userInfo" label-width="120px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="年龄">
                        {{ userInfo.age }}
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="生日">
                        {{ userInfo.birthday }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="性别">
                        {{ userInfo.gender }}
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="电话">
                        {{ userInfo.phone }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="邮箱">
                        {{ userInfo.email }}
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="地址">
                        {{ userInfo.address }}
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 其他表单字段 -->
        </el-form>
        <h3 style="padding:1em 0em;font-weight:400;">过往病史</h3>
        <el-table :data="userInfo.records" style="width: 100%">
            <el-table-column prop="date" label="日期" width="150" />
            <el-table-column prop="diagnosis" label="诊断" />
            <el-table-column prop="treatment" label="治疗" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const props = defineProps({
    pid: { type: String, required: true }
})

onMounted(async () => {
    await getUserInfo()
})

const userInfo = ref({
    username: '张三',
    gender: '男',
    age: '30',
    idNumber: '123456789012345678',
    phone: '13812345678',
    address: '北京市朝阳区',
    records: [
        { date: '2023-01-01', diagnosis: '感冒', treatment: '吃药' },
        { date: '2023-02-01', diagnosis: '发烧', treatment: '打针' },
        { date: '2023-03-01', diagnosis: '咳嗽', treatment: '输液' },
    ],
});

const getUserInfo = async () => {
    await axios.get(`/auth/api/patients/${props.pid}`).then((resp) => {
        userInfo.value = resp.data
        console.log(userInfo.value)
    })
}
</script>

<style lang="css" scoped>
.el-form-item {
    margin-bottom: 20px;
}

.el-table {
    margin-top: 20px;
}

.wrapper-binfo{
    width:100;
    height:calc(100vh - 5.2em);
    box-sizing: border-box;
    padding: 0 1em;
    background: linear-gradient(to bottom right, #ebeafc,#faf9ff,#faf9ff,#faf9ff); 
}
</style>