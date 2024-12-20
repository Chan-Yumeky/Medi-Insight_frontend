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
                            <el-input v-model="info.username"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="info.gender"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="info.age"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊科室">
                            <el-input v-model="info.department"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊号">
                            <el-input v-model="info.id"></el-input>
                        </el-form-item>
                        <el-form-item label="就诊时间">
                            <el-date-picker v-model="info.startTime" type="datetime"
                                value-format="YYYY-MM-DD hh:mm:ss"></el-date-picker>
                            <el-radio-group v-model="info.firstcall" style="margin-left: 10px;">
                                <el-radio value="1">初诊</el-radio>
                                <el-radio value="2">复诊</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="info.phone"></el-input>
                        </el-form-item>
                        <el-form-item label=" 家庭住址">
                            <el-input v-model="info.address"></el-input>
                        </el-form-item>
                        <el-form-item label=" 主诉">
                            <el-input v-model="info.pat_appeal"></el-input>
                        </el-form-item>
                        <el-form-item label=" 现病史">
                            <el-input v-model="info.pat_now_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 既往史">
                            <el-input v-model="info.pat_past_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 过敏史">
                            <el-input v-model="info.pat_allergy_history"></el-input>
                        </el-form-item>
                        <el-form-item label=" 诊断">
                            <el-input v-model="info.diagnostic"></el-input>
                        </el-form-item>
                        <el-form-item label=" 处方">
                            <el-input v-model="info.presc" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label=" 建议">
                            <el-input v-model="info.advice"></el-input>
                        </el-form-item>
                        <el-form-item label=" 医生签字">
                            <el-input v-model="info.doctorName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import EditorComp from './EditorComp.vue';
import { getSessionId } from '@/utils/utils';
const props = defineProps({
    pid: { type: String, required: true },
    vid: { type: String, required: true }
})
const info = ref({
    'username': '',
    'gender': '',
    'age': '',
    'department': '',
    'id': props.vid,
    'startTime': '',
    'phone': '',
    'address': '',
    'pat_appeal': '',
    'pat_now_history': '',
    'pat_past_history': '',
    'pat_allergy_history': '',
    'diagnostic': '',
    'presc': '',
    'advice': '',
    'doctorName': ''
})
let editor: any
const did = getSessionId()
onMounted(() => {
    console.log('doctor_id:', did)
})
const getUserInfo = async () => {
    if(!(JSON.parse(localStorage.getItem(`medical_record_${props.vid}`)).username=='')){
        return
    }
    await axios.get(`/auth/api/patients/${props.pid}`).then((resp) => {
        info.value.address = resp.data.address
        info.value.username = resp.data.username
        info.value.age = resp.data.age
        info.value.gender = resp.data.gender
        info.value.phone = resp.data.phone
        info.value.id = props.vid,
        // patient.value = resp.data
        console.log(info.value)
    })
}
const doctorInfo = ref({})
const getDoctorInfo = async () => {
    if(!(JSON.parse(localStorage.getItem(`medical_record_${props.vid}`)).username=='')){
        return
    }
    await axios.get(`/auth/api/doctors/${did}`).then((resp) => {
        info.value.doctorName = resp.data.username
        info.value.department = resp.data.department
    })
}
let serv = ref(1)
//加载编辑器
const onLoad = async (e: any) => {

    editor = e.target.contentWindow.editor

    setTimeout(() => {
        //异步加载文档
        editor.loadUrl('/mock/bind_data.html').then(() => {
            info.value = editor.getBindObject()
        })
        //文档输入后表单值随着变化
        editor.document.addEventListener('input', () => {
            info.value = editor.getBindObject()
        })
        serv.value = 0
    }, 0)
}


watch(serv, async (newValue, oldValue) => {
    if (newValue == 0) {
        if(JSON.parse(localStorage.getItem(`medical_record_${props.vid}`)).username==''){
            console.log('ok')
            await getUserInfo()
            await getDoctorInfo()
            localStorage.setItem(`medical_record_${props.vid}`,JSON.stringify(info.value))
            console.log(localStorage.getItem(`medical_record_${props.vid}`))
        }else{
            console.log(localStorage.getItem(`medical_record_${props.vid}`))
            const res = JSON.parse(localStorage.getItem(`medical_record_${props.vid}`))
            console.log('res:',res)
            info.value = res
            console.log(info.value)
        }
        editor.setBindObject(info.value)
    }
})
//表单数据改变
const bindData = () => {
    editor.setBindObject(info.value)
    localStorage.setItem(`medical_record_${props.vid}`,JSON.stringify(info.value))
    console.log(localStorage.getItem(`medical_record_${props.vid}`))
}
</script>

<style></style>
