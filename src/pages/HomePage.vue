<template>
    <div class="wrapper">
        <header>
            <div class="header-left">
                <img src="../assets/logo-white.png" alt="logo" style="width: 5em;">
                <h3 style="font-size:1em;">Medi-Insight</h3>
            </div>
            <div class="header-right">
                <div class="avatar">
                    <img src="../assets/girl-8880144_640.png" alt=""
                        style="width: 2.4em; height: 2.4em; border-radius: 10em;" @click="isCollapse = !isCollapse">
                </div>
            </div>
        </header>
        <div class="main-content">
            <RouterView></RouterView>
            <el-menu default-active="1" class="sidebar" :collapse="isCollapse">
                <el-menu-item index="1">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <document />
                    </el-icon>
                    <template #title>Navigator Three</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <template #title>Navigator Four</template>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
let isCollapse = ref(true);

</script>

<style scoped>
.wrapper {
    overflow: hidden;
}

header {
    height: 3.2em;
    width: 100%;
    z-index: 100;
    background-color: #faf9ff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e3e4f9;
}

.main-content {
    margin-top: 3.2em;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background-color: #faf9ff;
    position: relative;
    margin-bottom: -3.2em;
}

.header-left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-right {
    width: 5em;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.avatar {
    background-color: transparent;
    height: 2.4em;
    width: 8em;
}

.sidebar {
    position: absolute;
    right: 0;
    top: 0;
    width: 0em;
    height: 100%;
}

.transition-box {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}

.sidebar:not(.el-menu--collapse) {
  width: 16em;
}
</style>