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
        <div class="container" style="display:flex; flex-direction: row; height: 100%">
            <div class="main-content">
                <RouterView></RouterView>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="isCollapse" class="sidebar">
                <div class="transition-box">
                    <!-- TODO:account functions -->
                    <el-menu>
                        <el-menu-item>
                            h1
                        </el-menu-item>
                        <el-menu-item>
                            h2
                        </el-menu-item>
                        <el-menu-item>
                            h3
                        </el-menu-item>
                        <el-menu-item>
                            h4
                        </el-menu-item>
                    </el-menu>
                    <el-button @click="userLogout()">退出登录</el-button>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import router from "@/router/index.ts";
import {logout} from "@/net/index.js";

let isCollapse = ref(false);

const userLogout = ()=> {
  logout(() => router.push('/login'))
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
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
    box-sizing: border-box;
    padding-top: 3.2em;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background-color: #faf9ff;
    position: relative;
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
    top: 3.2em;
    width: 0em;
}

.transition-box {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #e2e3f9;
    color: #fff;
    box-shadow: 1px 1px 8px #e2e3f9;
    box-sizing: border-box;
}

.sidebar:not(.el-menu--collapse) {
    width: 16em;
}
</style>