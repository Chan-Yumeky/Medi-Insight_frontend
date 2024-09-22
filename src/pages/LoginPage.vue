<template>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <img src="../assets/logo-white.png" alt="logo" style="width: 5em;">
        <h3 style="font-size:1em;">Medi-Insight</h3>
      </div>
      <div class="header-right">
        <el-button type="default" style="width: 4em;" @click="loginFormShow">
          Sign in
        </el-button>
        <el-button type="primary" style="width: 4em; margin-right: 2em;">
          Sign up
        </el-button>
      </div>
    </header>
    <div class="main-content">
      <div class="title">
        <h1 style="font-size: 2.8em;">Medi-Insight</h1>
        <p style="font-size: 1.3em;">AI赋能，医疗预测系统</p>
      </div>
      <img src="../assets/Medi-Insight.svg" alt="" style="width: 100%;">
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow-y: hidden;
}

header {
  height: 3.2em;
  width: 100%;
  background-color: #faf9ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e4f9;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100%;
  background-color: #faf9ff;
  position: relative;
}

.header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title{
  position: absolute;
  top: 25%;
  left: 4em;
}
</style>