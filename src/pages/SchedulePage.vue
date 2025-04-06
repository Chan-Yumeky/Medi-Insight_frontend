<template>
  <div class="schedule-container">
    <header>
      <span style="margin-left: 1em; color: #555;font-weight: 700;">
        {{ isAdmin ? '专家门诊排班管理' : '我的出诊排班' }}
      </span>
      
      <!-- 管理员才显示添加按钮 -->
      <el-button v-if="isAdmin" type="primary" @click="showAddDialog">添加排班</el-button>
    </header>
    
    <!-- 管理员显示医生选择 -->
    <div v-if="isAdmin" class="doctor-selector">
      <el-select v-model="selectedDoctor" placeholder="选择专家医生" @change="loadSchedules">
        <el-option
          v-for="doctor in expertDoctors"
          :key="doctor.id"
          :label="doctor.username"
          :value="doctor.id"
        />
      </el-select>
    </div>
    
    <!-- 日期筛选 -->
    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD"
        @change="loadSchedules"
      />
    </div>
    
    <!-- 排班表格 -->
    <el-table v-loading="loading" :data="scheduleList" border style="width: 100%">
      <el-table-column prop="scheduleDate" label="日期" :formatter="formatDate" />
      <el-table-column label="时间段">
        <template #default="scope">
          {{ formatTime(scope.row.startTime) }} - {{ formatTime(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="maxPatients" label="最大就诊人数" />
      <el-table-column prop="currentPatients" label="已预约人数" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="isAdmin" fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button 
            v-if="scope.row.currentPatients === 0" 
            link type="primary" 
            size="small" 
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button 
            v-if="scope.row.currentPatients === 0" 
            link type="danger" 
            size="small" 
            @click="handleCancel(scope.row)"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 添加/编辑排班对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑排班' : '添加排班'"
      width="500px"
    >
      <el-form :model="scheduleForm" label-width="100px">
        <el-form-item label="出诊日期">
          <el-date-picker
            v-model="scheduleForm.scheduleDate"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            v-model="scheduleForm.startTime"
            placeholder="选择时间"
            format="HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker
            v-model="scheduleForm.endTime"
            placeholder="选择时间"
            format="HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="最大就诊人数">
          <el-input-number v-model="scheduleForm.maxPatients" :min="1" :max="50" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSchedule">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import dayjs from 'dayjs';

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
const isAdmin = computed(() => userInfo.value.role === 'admin');
const isExpert = computed(() => userInfo.value.role === 'doctor' && userInfo.value.isExpert === 1);

// 专家医生列表（管理员使用）
const expertDoctors = ref([]);
const selectedDoctor = ref(null);
const loading = ref(false);

// 加载专家医生列表（仅管理员）
const loadExpertDoctors = async () => {
  if (!isAdmin.value) return;
  
  loading.value = true;
  try {
    const response = await axios.get('/auth/api/doctors/experts');
    expertDoctors.value = response.data;
    if (expertDoctors.value.length > 0) {
      selectedDoctor.value = expertDoctors.value[0].id;
      await loadSchedules();
    }
  } catch (error) {
    console.error('获取专家医生列表失败', error);
    ElMessage.error('获取专家医生列表失败');
  } finally {
    loading.value = false;
  }
};

// 日期范围
const dateRange = ref([
  dayjs().startOf('week').toDate(),
  dayjs().endOf('week').toDate()
]);

// 排班列表
const scheduleList = ref([]);

// 添加/编辑对话框
const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref(null);
const scheduleForm = reactive({
  scheduleDate: null,
  startTime: null,
  endTime: null,
  maxPatients: 10
});

// 修改加载排班信息的逻辑
const loadSchedules = async () => {
  let doctorId;
  
  if (isAdmin.value) {
    if (!selectedDoctor.value) return;
    doctorId = selectedDoctor.value;
  } else {
    if (!userInfo.value.id) return;
    doctorId = userInfo.value.id;
  }
  
  loading.value = true;
  try {
    // 将日期的开始时间设为当天 00:00:00，结束时间设为当天 23:59:59
    const response = await axios.get(`/auth/api/expert-schedule/doctor/${doctorId}`, {
      params: {
        startDate: dayjs(dateRange.value[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endDate: dayjs(dateRange.value[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    });
    scheduleList.value = response.data;
  } catch (error) {
    console.error('获取排班信息失败', error.response || error);
    ElMessage.error('获取排班信息失败');
  } finally {
    loading.value = false;
  }
};

// 格式化函数
const formatDate = (row) => dayjs(row.scheduleDate).format('YYYY-MM-DD');
const formatTime = (time) => dayjs(time).format('HH:mm');

// 状态相关函数
const getStatusText = (status) => {
  switch (status) {
    case 0: return '可预约';
    case 1: return '已满';
    case 2: return '已取消';
    default: return '未知';
  }
};

const getStatusType = (status) => {
  switch (status) {
    case 0: return 'success';
    case 1: return 'warning';
    case 2: return 'danger';
    default: return 'info';
  }
};

// 打开添加对话框
const showAddDialog = () => {
  if (!selectedDoctor.value) {
    ElMessage.warning('请先选择专家医生');
    return;
  }
  
  isEdit.value = false;
  editingId.value = null;
  scheduleForm.scheduleDate = null;
  scheduleForm.startTime = null;
  scheduleForm.endTime = null;
  scheduleForm.maxPatients = 10;
  dialogVisible.value = true;
};

// 打开编辑对话框 - 优化为处理完整的日期时间格式
const handleEdit = (row) => {
  isEdit.value = true;
  editingId.value = row.id;
  
  // 提取日期部分用于日期选择器
  scheduleForm.scheduleDate = dayjs(row.scheduleDate).toDate();
  
  // 提取时间部分用于时间选择器
  scheduleForm.startTime = dayjs(row.startTime).toDate();
  scheduleForm.endTime = dayjs(row.endTime).toDate();
  
  scheduleForm.maxPatients = row.maxPatients;
  dialogVisible.value = true;
};

// 取消排班
const handleCancel = (row) => {
  ElMessageBox.confirm('确定要取消这个排班吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    loading.value = true;
    try {
      await axios.delete(`/auth/api/expert-schedule/${row.id}`);
      ElMessage.success('排班已取消');
      await loadSchedules();
    } catch (error) {
      console.error('取消排班失败', error);
      ElMessage.error('取消排班失败');
    } finally {
      loading.value = false;
    }
  }).catch(() => {});
};

// 保存排班 - 修改为使用完整的日期时间格式
const saveSchedule = async () => {
  // 表单验证
  if (!scheduleForm.scheduleDate || !scheduleForm.startTime || !scheduleForm.endTime) {
    ElMessage.warning('请填写完整的排班信息');
    return;
  }
  
  // 时间顺序验证
  const startDateTime = dayjs(scheduleForm.startTime);
  const endDateTime = dayjs(scheduleForm.endTime);
  if (startDateTime.isAfter(endDateTime)) {
    ElMessage.warning('开始时间不能晚于结束时间');
    return;
  }
  
  // 将选择的日期和时间合并，并格式化为后端需要的格式
  const scheduleData = {
    doctorId: isAdmin.value ? selectedDoctor.value : userInfo.value.id,
    
    // 日期加上时间 00:00:00
    scheduleDate: dayjs(scheduleForm.scheduleDate).format('YYYY-MM-DD HH:mm:ss'),
    
    // 将选择的时间与日期合并
    startTime: dayjs(scheduleForm.scheduleDate)
      .hour(dayjs(scheduleForm.startTime).hour())
      .minute(dayjs(scheduleForm.startTime).minute())
      .second(0)
      .format('YYYY-MM-DD HH:mm:ss'),
      
    endTime: dayjs(scheduleForm.scheduleDate)
      .hour(dayjs(scheduleForm.endTime).hour())
      .minute(dayjs(scheduleForm.endTime).minute())
      .second(0)
      .format('YYYY-MM-DD HH:mm:ss'),
      
    maxPatients: scheduleForm.maxPatients
  };
  
  loading.value = true;
  try {
    if (isEdit.value) {
      await axios.put(`/auth/api/expert-schedule/${editingId.value}`, scheduleData);
      ElMessage.success('排班已更新');
    } else {
      await axios.post('/auth/api/expert-schedule/add', scheduleData);
      ElMessage.success('排班已添加');
    }
    dialogVisible.value = false;
    await loadSchedules();
  } catch (error) {
    console.error('保存排班失败', error);
    ElMessage.error(error.response?.data?.message || '保存排班失败');
  } finally {
    loading.value = false;
  }
};

// 初始化时根据角色加载不同数据
onMounted(() => {
  if (isAdmin.value) {
    loadExpertDoctors();
  } else {
    loadSchedules();
  }
});
</script>

<style scoped>
.schedule-container {
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

.filter-container {
  margin: 10px 0;
  padding: 0 1em;
}

.doctor-selector {
  margin-bottom: 10px;
  padding: 0 1em;
}
</style> 