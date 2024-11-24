<template>
    <div style="width: 100%; height: calc(100vh - 5.2em)">
        <el-container style="height: 100%">
            <el-aside style="height: 100%; width: 10%;">
                <el-menu v-model="activeName" style="width: 100%; height: 100%;">
                    <el-menu-item @click="activeName = '0'">基本信息</el-menu-item>
                    <el-menu-item @click="activeName = '1'">过往病史</el-menu-item>
                    <el-menu-item @click="activeName = '2'">诊断录入</el-menu-item>
                    <el-menu-item @click="activeName = '3'">病历录入</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="padding: 0;" class="wrapper">
                    <div v-if="activeName == '0'">
                        <BasicInfo></BasicInfo>
                    </div>
                    <div v-if="activeName == '1'">
                        <Suspense>
                            <template #default>
                                <AsyncModelViewer />
                            </template>
                            <template #fallback>
                                <div>加载中...</div>
                            </template>
                        </Suspense>
                        <HeartModel></HeartModel>
                    </div>
                    <div v-if="activeName == '2'">
                        <PrescriptionComp></PrescriptionComp>
                    </div>
                    <div v-if="activeName=='3'">
                        <el-row>
                            <el-col :span="16">
                                <EditorComp @load="onLoad" style="margin: 10px 0;"></EditorComp>
                            </el-col>
                            <el-col :span="8">
                                <el-card style="margin: 10px;">
                                    <el-form @change="bindData()" label-width="auto">
                                        <el-form-item label="姓名">
                                            <el-input v-model="patient.pat_name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="性别">
                                            <el-input v-model="patient.pat_sex"></el-input>
                                        </el-form-item>
                                        <el-form-item label="年龄">
                                            <el-input v-model="patient.pat_age"></el-input>
                                        </el-form-item>
                                        <el-form-item label="就诊科室">
                                            <el-input v-model="patient.visit_dept"></el-input>
                                        </el-form-item>
                                        <el-form-item label="就诊号">
                                            <el-input v-model="patient.pat_id"></el-input>
                                        </el-form-item>
                                        <el-form-item label="就诊时间">
                                            <el-date-picker v-model="patient.visit_time" type="datetime"
                                                value-format="YYYY-MM-DD hh:mm:ss"></el-date-picker>
                                            <el-radio-group v-model="patient.firstcall" style="margin-left: 10px;">
                                                <el-radio value="1">初诊</el-radio>
                                                <el-radio value="2">复诊</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="联系电话">
                                            <el-input v-model="patient.pat_phone"></el-input>
                                        </el-form-item>
                                        <el-form-item label=" 家庭住址">
                                            <el-input v-model="patient.pat_address"></el-input>
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
                                            <el-input v-model="patient.diagnosis"></el-input>
                                        </el-form-item>
                                        <el-form-item label=" 处方">
                                            <el-input v-model="patient.presc" type="textarea"></el-input>
                                        </el-form-item>
                                        <el-form-item label=" 建议">
                                            <el-input v-model="patient.advice"></el-input>
                                        </el-form-item>
                                        <el-form-item label=" 医生签字">
                                            <el-input v-model="patient.doctor_name"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import EditorComp from '../Outpatient/EditorComp.vue';
import PrescriptionComp from '../Outpatient/PrescriptionComp.vue';
import BasicInfo from '../Outpatient/BasicInfo.vue';
const AsyncModelViewer = defineAsyncComponent(() =>
    import('@/components/Outpatient/HeartModel.vue')
);
defineProps({
    sid: { type: String, required: true },
});
let activeName = ref('0')
const patient = ref({})

var editor: any

//加载编辑器
const onLoad = (e: any) => {

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
    }, 0)
}

//表单数据改变
const bindData = () => {
    editor.setBindObject(patient.value)
}

const handleClick = () => {

}
</script>
<style scoped>
.wrapper::-webkit-scrollbar {
    display: none;
}
</style>