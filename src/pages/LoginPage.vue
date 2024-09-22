<template>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <img src="../assets/logo-white.png" alt="logo" style="width: 5em;">
        <h3 style="font-size:1em;">Medi-Insight</h3>
      </div>
      <div class="header-right">
        <el-button type="default" style="width: 4em;" @click="showLoginDialog = true">
          登录
        </el-button>
        <el-button type="primary" style="width: 4em; margin-right: 2em;">
          注册
        </el-button>
        <el-dialog v-model="showLoginDialog" width="22em"
          style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
          <div
            style="height: 5em;width: 100%; text-align: center; display: flex; align-items: center; justify-content: center;">
            <h1 style="color: black;">登录</h1>
          </div>
          <br>
          <el-form>
            <el-input placeholder="username" v-model="username" style="margin-bottom: 1em;"/>
            <el-input placeholder="password" type="password" v-model="pwd" style="margin-bottom: 1em;"/>
          </el-form>
          <div style="display: flex;align-items: center;justify-content: space-between; padding: 0 1em;">
            <el-checkbox>记住密码</el-checkbox>
            <a href="">忘记密码</a>
          </div>
          <el-button type="primary" @click="showLoginDialog = false" style="width: 100%;margin-top: 5em;">
            Confirm
          </el-button>
        </el-dialog>
      </div>
    </header>
    <div class="main-content">
      <Transition name="slide-fade">
        <div v-if=isshow class="title">
          <h1 style="font-size: 2.8em;">Medi-Insight</h1>
          <p style="font-size: 1.3em;">AI赋能，医疗预测系统</p>
        </div>
      </Transition>
      <div></div>
      <img src="../assets/glob.png" alt="" style="height: 100%;">
      <img src="../assets/net.png" alt="" style="position: absolute; right: -2%;top: 20%; scale: 1;" class="net">
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
let isshow = ref(false);
let showLoginDialog = ref(false);
let username = ref('');
let pwd = ref('');
onMounted(() => {
  isshow.value = true;
})
</script>

<style scoped>
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
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: #faf9ff;
  position: relative;
  overflow: hidden;
}

.header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  position: absolute;
  top: 30%;
  left: 4em;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.net {
  animation-name: scaleDraw;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}


@keyframes scaleDraw {

  0% {
    transform: scale(0.95);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}
</style>