<template>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <img src="../assets/logo-white.png" alt="logo" style="width: 5em;">
        <h3 style="font-size:1em;">Medi-Insight</h3>
      </div>
      <div class="header-right">
        <el-button plain @click="loginVisible = true" style="border-color: deepskyblue">登录</el-button>
        <el-dialog
            v-model="loginVisible"
            width="33em"
            style="background-color: whitesmoke"
        >
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <h1 style="color: black; font-size: 2em">登录</h1>
            <div style="font-size: 1em; color: #868484; margin-top: 10px">在进入系统之前，请先输入用户名和密码进行登录</div>
          </div>
          <div class="input-wrapper">
            <el-form :model="form" :rules="rules" ref="formRef">
              <el-form-item prop="username">
                <el-input v-model="form.username" maxlength="30" type="text" placeholder="用户名/邮箱">
                  <template #prefix>
                    <el-icon>
                      <User/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" type="password" maxlength="20" style="margin-top: 5px" placeholder="密码">
                  <template #prefix>
                    <el-icon>
                      <Lock/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-row style="margin-top: 5px">
                <el-col :span="12" style="text-align: left">
                  <el-form-item prop="remember">
                    <el-checkbox label="记住我"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <el-link @click="changeToReset">忘记密码？</el-link>
                </el-col>
              </el-row>
            </el-form>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <div style="margin-top: 1vw">
                <el-button style="width: 22vw" type="success" plain @click="userLogin()">立即登录</el-button>
              </div>
              <el-divider>
                <span style="color: grey; font-size: 0.9em;">没有账号</span>
              </el-divider>
              <div style="margin-bottom: 1vw">
                <el-button style="width: 22vw" type="warning" plain @click="changeToRegister">注册账号</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
        <el-dialog
            v-model="resetVisible"
            width="33em"
            style="background-color: whitesmoke"
        >
          <div style="text-align: center">
            <div style="margin-top: 1vw">
              <el-steps :active="active" finish-status="success" align-center>
                <el-step title="验证电子邮件"/>
                <el-step title="重新设定密码"/>
              </el-steps>
            </div>
            <div style="margin: 0 2vw" v-if="active === 0">
              <div style="margin-top: 1vw">
                <div style="font-size: 2em; font-weight: bold; color: black">重置密码</div>
                <div style="font-size: 1em; color: #868484; margin-top: 10px">请输入需要重置密码的电子邮件地址</div>
              </div>
              <div style="margin-top: 1.5vw">
                <el-form>
                  <el-form-item prop="email">
                    <el-input type="email" placeholder="电子邮件地址">
                      <template #prefix>
                        <el-icon>
                          <Message/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-row :gutter="10" style="width: 100%">
                      <el-col :span="18">
                        <el-input maxlength="6" type="text" placeholder="请输入验证码">
                          <template #prefix>
                            <el-icon>
                              <EditPen/>
                            </el-icon>
                          </template>
                        </el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="success">
                          获取验证码
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
              <div style="margin: 2.5vw 0">
                <el-button @click="confirmReset" style="width: 22vw" type="warning" plain>开始重置密码</el-button>
              </div>
            </div>
            <div style="margin: 0 2vw" v-if="active === 1">
              <div style="margin-top: 1vw">
                <div style="font-size: 2em; font-weight: bold; color: black">重置密码</div>
                <div style="font-size: 1em; color: #868484; margin-top: 10px">请填写你的新密码，并牢记防止丢失</div>
              </div>
              <div style="margin-top: 1.5vw">
                <el-form>
                  <el-form-item prop="password">
                    <el-input maxlength="20" type="password" placeholder="密码">
                      <template #prefix>
                        <el-icon>
                          <Lock/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password_repeat">
                    <el-input maxlength="20" type="password" placeholder="重复密码">
                      <template #prefix>
                        <el-icon>
                          <Lock/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div style="margin: 2.5vw 0">
                <el-button @click="doReset" style="width: 22vw" type="danger" plain>立即重置密码</el-button>
              </div>
            </div>
          </div>
        </el-dialog>

        <el-button type="primary" @click="registerVisible = true">注册</el-button>
        <el-dialog
            v-model="registerVisible"
            width="33em"
            style="background-color: whitesmoke"
        >
          <div
              style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <h1 style="color: black; font-size: 2em">注册</h1>
            <div style="font-size: 1em; color: #868484; margin-top: 10px">欢迎注册我们的学习平台，请在下方填写相关信息</div>
          </div>
          <div class="input-wrapper">
            <el-form>
              <el-form-item prop="username">
                <el-input maxlength="30" type="text" placeholder="用户名/邮箱">
                  <template #prefix>
                    <el-icon>
                      <User/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" maxlength="20" style="margin-top: 5px" placeholder="密码">
                  <template #prefix>
                    <el-icon>
                      <Lock/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password_repeat">
                <el-input type="password" maxlength="20" style="margin-top: 5px" placeholder="重复密码">
                  <template #prefix>
                    <el-icon>
                      <Lock/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input type="email" placeholder="电子邮件地址">
                  <template #prefix>
                    <el-icon>
                      <Message/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-row :gutter="10" style="width: 100%;">
                  <el-col :span="18">
                    <el-input maxlength="6" type="text" placeholder="请输入验证码">
                      <template #prefix>
                        <el-icon>
                          <EditPen/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-button type="success">
                      获取验证码
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <div style="margin-top: 1vw">
                <el-button style="width: 22vw" type="warning" plain @click="changeToLogin">立即注册</el-button>
              </div>
              <div style="margin: 1vw 0">
                <span style="font-size: 1em; line-height: 15px; color: grey">已有账号?&nbsp;&nbsp;&nbsp;</span>
                <el-link type="primary" style="translate: 0 -2.5px" @click="changeToLogin2">立即登录</el-link>
              </div>
            </div>
          </div>
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
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from "vue";
import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {login} from "@/net/index.js";

let isshow = ref(false);
let showLoginDialog = ref(false);
let username = ref('');
let pwd = ref('');
let router = useRouter()
onMounted(() => {
  isshow.value = true;
})

const formRef = ref()
const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const rules = {
  username: [
    {required: true, message: '请输入用户名'}
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
}

const userLogin = ()=> {
    formRef.value.validate((isValid) => {
    if (isValid) {
      login(form.username, form.password, form.remember, () => {
      })
    }
  });
}

const loginVisible = ref(false)
const registerVisible = ref(false)
const resetVisible = ref(false)
const changeToLogin = ()=> {
  registerVisible.value = false
  loginVisible.value = true
  ElMessage.success('注册成功，请登录进入系统')
}
const changeToLogin2 = ()=> {
  registerVisible.value = false
  loginVisible.value = true
}
const changeToRegister = ()=> {
  loginVisible.value = false
  registerVisible.value = true
}
const changeToReset = ()=> {
  loginVisible.value = false
  resetVisible.value = true
}

const active = ref(0)
const confirmReset = ()=> {
  active.value++
}
const doReset = ()=> {
  active.value--
  resetVisible.value = false
  loginVisible.value = true
  ElMessage.success('密码重置成功，请重新登录')
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
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

.header-right {
  width: 10vw;
  height: 3vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1em;
}

:deep(.el-divider__text) {
  background-color: whitesmoke;
}

.input-wrapper {
  margin-top: 1.5vw;
  padding: 0 3vw;
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