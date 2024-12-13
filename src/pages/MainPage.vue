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
        </el-menu>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router';
const router = useRouter()
const showPatientsList = ()=>{
    router.push({
        name:'attendance'
    })
}
const showStatistics = ()=>{
    router.push({
        name:'explore'
    })
}
</script>
<style scoped></style>