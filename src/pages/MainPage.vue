<template>
    <div style="width: 100%; height: 100%; display: flex;">
        <el-menu default-active="2" class="side-bar" style="height: 100%;">
            <el-menu-item @click='showStatistics'>
                <!-- <el-icon><icon-menu /></el-icon> -->
                <span>概览</span>
            </el-menu-item>
            <el-menu-item @click="showPatientsList">
                <!-- <el-icon><icon-menu /></el-icon> -->
                <span>接诊</span>
            </el-menu-item>
            <el-menu-item v-if="userInfo.role === 'admin' || (userInfo.role === 'doctor' && userInfo.isExpert === 1)" @click="showSchedule">
                <span>{{ userInfo.role === 'admin' ? '专家排班管理' : '我的排班' }}</span>
            </el-menu-item>
        </el-menu>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const userInfo = ref({});

// 获取用户信息
const getUserInfo = () => {
  const str = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (str) {
    try {
      userInfo.value = JSON.parse(str);
    } catch (e) {
      console.error('解析用户信息失败', e);
      // 解析失败，重定向到登录页
      router.push('/login');
    }
  } else {
    // 用户未登录，重定向到登录页
    router.push('/login');
  }
};

const showPatientsList = () => {
    router.push({
        name: 'attendance'
    });
};

const showStatistics = () => {
    router.push({
        name: 'explore'
    });
};

const showSchedule = () => {
    router.push({
        name: 'schedule'
    });
};

onMounted(() => {
    getUserInfo();
});
</script>

<style scoped>
.side-bar {
  min-width: 180px;
}
</style>