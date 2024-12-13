<template>
    <div style="width: 100%; height: 100%;">
        <el-row>
            <el-col :span="16">
                <EditorComp @load="onLoad" style="margin: 10px 0;"></EditorComp>
            </el-col>
            <el-col :span="8">
                <el-card style="margin: 10px;">
                    <el-form @change="bindData()" label-width="auto">
                        <el-form-item label="姓名">
                            <el-input v-model="patient.username"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="patient.gender"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="patient.age"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊科室">
                            <el-input v-model="patient.department"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊号">
                            <el-input v-model="patient.id"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊时间">
                            <el-date-picker v-model="patient.startTime" type="datetime"
                                value-format="YYYY-MM-DD hh:mm:ss"></el-date-picker>
                            <el-radio-group v-model="patient.firstcall" style="margin-left: 10px;">
                                <el-radio value="1">初诊</el-radio>
                                <el-radio value="2">复诊</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="patient.phone"></el-input>
                        </el-form-item>
                        <el-form-item label=" 家庭住址">
                            <el-input v-model="patient.address"></el-input>
                        </el-form-item>
                        <el-form-item label=" 主诉">
                            <el-input v-model="patient.pat_appeal"></el-input>
                        </el-form-item>
                        <el-form-item label=" 现病史">
                            <el-input v-model="patient.pat_now_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 既往史">
                            <el-input v-model="patient.pat_past_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 过敏史">
                            <el-input v-model="patient.pat_allergy_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 诊断">
                            <el-input v-model="patient.diagnostic"></el-input>
                        </el-form-item>
                        <el-form-item label=" 处方">
                            <el-input v-model="patient.presc" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label=" 建议">
                            <el-input v-model="patient.advice"></el-input>
                        </el-form-item>
                        <el-form-item label=" 医生签字">
                            <el-input v-model="patient.doctorName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import EditorComp from './EditorComp.vue';
import { getSessionId } from '@/utils/utils';
const patient = ref({})
let editor: any
const props = defineProps({
    pid: { type: String, required: true }
})
const getUserInfo = async () => {
    await axios.get(`/auth/api/patients/${props.pid}`).then((resp) => {
        patient.value = resp.data
        console.log(patient.value)
    })
}
const did = getSessionId()
const doctorInfo = ref({})
const getDoctorInfo = async () => {
    await axios.get(`/auth/api/doctors/${did}`).then((resp) => {
        patient.value = resp.data
    })
}
let serv = ref(1)
//加载编辑器
const onLoad = async (e: any) => {

    editor = e.target.contentWindow.editor

    setTimeout(() => {
        //异步加载文档
        editor.loadUrl('/mock/bind_data.html').then(() => {
            patient.value = editor.getBindObject()
        })
        //文档输入后表单值随着变化
        editor.document.addEventListener('input', () => {
            patient.value = editor.getBindObject()
        })
        serv.value = 0
    }, 0)
}


watch(serv,async (newValue, oldValue) => {
    if (newValue == 0) {
        await getUserInfo()
        await getDoctorInfo()
        editor.setBindObject(patient.value)
        editor.setBindObject(doctorInfo.value)
    }
})
//表单数据改变
const bindData = () => {
    editor.setBindObject(patient.value)
}
</script>

<style></style>
