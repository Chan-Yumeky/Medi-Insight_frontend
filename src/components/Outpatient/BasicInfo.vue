<template>
    <div class="wrapper-binfo">
        <Transition name="slide-fade">
            <div v-if="isshow">
                <h3 style="padding:1em 0em; font-weight:400;">基本信息</h3>
                <h1 style="padding:1em 2em; padding-top: 0.5em; font-size: 2em;">{{ userInfo.username }}</h1>
                <el-form :data="userInfo" label-width="120px"
                    style="border: 1px solid #ddd; border-radius: 10px; margin: 0 2em;padding: 1em 0;">
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
                <el-table :data="history" border style="width: 100%;">
                    <el-table-column prop="id" label="登记号" />
                    <el-table-column prop="doctor.username" label="医生" />
                    <el-table-column prop="source" label="来源" />
                    <el-table-column prop="doctor.department" label="科室" />
                    <el-table-column prop="bookTime" label="预订时间" />
                    <el-table-column prop="startTime" label="就诊时间" />
                    <el-table-column prop="endTime" label="结束时间" />
                    <el-table-column fixed="right" label="操作" min-width="50">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">
                                查看病历
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getSessionId, mapSource } from '@/utils/utils';
const props = defineProps({
    pid: { type: String, required: true }
})
let isshow = ref(false);
onMounted(async () => {
    isshow.value = true;
    const sid = getSessionId()
    console.log(sid)
    await getUserInfo()
    await getHistory()
    const ubchart = document.getElementById("chart-1")
    if (ubchart) {
        ubchart.removeAttribute('_echarts_instance_');
    }
})

const userInfo = ref({
    username: '',
    gender: '',
    age: '',
    idNumber: '',
    phone: '',
    address: '',
    records: [
    ],
});

const getUserInfo = async () => {
    await axios.get(`/auth/api/patients/${props.pid}`).then((resp) => {
        userInfo.value = resp.data
        console.log(userInfo.value)
    })
}

const history = ref([])
const getHistory = async () => {
    await axios.get(`/auth/api/registrations/history/${props.pid}`).then((resp) => {
        history.value = resp.data
        for (let i = 0; i < history.value.length; i++) {
            history.value[i].source = mapSource(history.value[i].source)
        }
        console.log('history:',history.value)
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

.wrapper-binfo {
    width: 100;
    box-sizing: border-box;
    padding: 0 1em;
    background: linear-gradient(to top, #faf9ff, #faf9ff, #faf9ff, white, white);
}

</style>