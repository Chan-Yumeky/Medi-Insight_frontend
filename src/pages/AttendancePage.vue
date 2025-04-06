<template>
    <div class="wrapper">
        <Transition name="slide-fade">
            <div v-if="isshow">
                <header>
                    <span style="margin-left: 1em; color: #555;font-weight: 700;">病人列表</span>
                    <div v-if="isExpert" class="header-actions">
                        <el-tag type="success">专家医生</el-tag>
                        <el-button type="primary" size="small" @click="goToSchedule">排班管理</el-button>
                    </div>
                </header>
                <el-table v-loading="loading" :data="patientList" border style="width: 100%">
                    <el-table-column prop="id" label="登记号" />
                    <el-table-column prop="patient.username" label="姓名" />
                    <el-table-column prop="patient.gender" label="性别" />
                    <el-table-column prop="patient.birthday" label="出生日期" />
                    <el-table-column prop="patient.age" label="年龄" />
                    <el-table-column prop="status" label="状态" />
                    <el-table-column prop="source" label="来源" />
                    <el-table-column prop="doctor.username" label="医生" />
                    <el-table-column prop="doctor.department" label="科室" />
                    <el-table-column prop="bookTime" label="预订时间" />
                    <el-table-column v-if="isExpert" label="预约时段">
                        <template #default="scope">
                            <el-tooltip 
                                v-if="getTimeSlot(scope.row.bookTime)" 
                                :content="`最大接诊人数: ${getTimeSlot(scope.row.bookTime).maxPatients}, 已预约: ${getTimeSlot(scope.row.bookTime).currentPatients}`"
                                placement="top"
                            >
                                <el-tag size="small">
                                    {{ formatTimeSlot(getTimeSlot(scope.row.bookTime)) }}
                                </el-tag>
                            </el-tooltip>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTime" label="就诊时间" />
                    <el-table-column fixed="right" label="操作" min-width="50">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="handleClick(scope.row.id, scope.row.patient.id)">
                                接诊
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

let isshow = ref(false);
let patientList = ref([]);
let scheduleList = ref([]);
const loading = ref(false);
const router = useRouter();

// 从localStorage/sessionStorage获取用户信息
const getUserInfo = () => {
  const str = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error('解析用户信息失败', e);
      return {};
    }
  }
  return {};
};

const userInfo = ref(getUserInfo());
const isExpert = computed(() => userInfo.value.role === 'doctor' && userInfo.value.isExpert === 1);

const handleClick = (sid, pid) => {
    console.log(sid, pid);
    localStorage.setItem('cur_pid', pid);
    router.push({ name: 'process', params: { sid: sid } });
};

const goToSchedule = () => {
    router.push({ name: 'schedule' });
};

onMounted(async () => {
    isshow.value = true;
    await getAllWaitingList();
    
    if (isExpert.value) {
        await loadSchedules();
    }
});

const getAllWaitingList = async () => {
    loading.value = true;
    try {
        const resp = await axios.get(`/auth/api/registrations/waiting`);
        patientList.value = resp.data;
        for (let i = 0; i < patientList.value.length; i++) {
            patientList.value[i].source = mapSource(patientList.value[i].source);
        }
    } catch (error) {
        console.error('获取待诊患者列表失败', error);
    } finally {
        loading.value = false;
    }
};

const loadSchedules = async () => {
    if (!userInfo.value.id) return;
    
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const response = await axios.get(`/auth/api/expert-schedule/doctor/${userInfo.value.id}`, {
            params: {
                startDate: today,
                endDate: today
            }
        });
        scheduleList.value = response.data;
    } catch (error) {
        console.error('获取排班信息失败', error);
    }
};

const mapSource = (source) => {
    return source === 0 ? '线上挂号' : '线下挂号';
};

// 根据预约时间获取对应的时间段
const getTimeSlot = (bookTime) => {
    if (!bookTime || scheduleList.value.length === 0) return null;
    
    const bookDateTime = dayjs(bookTime);
    return scheduleList.value.find(slot => {
        const slotDate = dayjs(slot.scheduleDate).format('YYYY-MM-DD');
        const bookDate = bookDateTime.format('YYYY-MM-DD');
        
        if (slotDate !== bookDate) return false;
        
        const bookTimeOnly = bookDateTime.format('HH:mm:ss');
        const startTime = dayjs(slot.startTime).format('HH:mm:ss');
        const endTime = dayjs(slot.endTime).format('HH:mm:ss');
        
        return bookTimeOnly >= startTime && bookTimeOnly <= endTime;
    });
};

// 格式化时间段显示
const formatTimeSlot = (slot) => {
    if (!slot) return '';
    return `${dayjs(slot.startTime).format('HH:mm')} - ${dayjs(slot.endTime).format('HH:mm')}`;
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
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>