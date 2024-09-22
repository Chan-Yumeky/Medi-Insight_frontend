<template>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <img src="../assets/logo-white.png" alt="logo" style="width: 5em;">
        <h3 style="font-size:1em;">Medi-Insight</h3>
      </div>
      <div class="header-right">
        <el-button type="default" style="width: 4em;" @click="test()">
          Sign in
        </el-button>
        <el-button type="primary" style="width: 4em; margin-right: 2em;">
          Sign up
        </el-button>
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
onMounted(() => {
  isshow.value = true;
})
const test = () => {
  alert('ok');
}
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
  50%{
    transform: scale(1);
  }
  
  100% {
    transform: scale(0.95);
  }
}
</style>