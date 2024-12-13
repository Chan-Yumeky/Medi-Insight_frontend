<template>
     <Source src="/code/BindData.vue"></Source>
     <el-row>
          <el-col :span="16">
               <Editor @load="onLoad" style="margin: 10px 0;"></Editor>
          </el-col>
          <el-col :span="8">
               <el-card style="margin: 10px;">
                    <el-form  @change="bindData()" label-width="auto">
                         <el-form-item label="姓名">
                              <el-input v-model="patient.pat_name" ></el-input>
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
                             <el-date-picker v-model="patient.visit_time"  type="datetime" value-format="YYYY-MM-DD hh:mm:ss"></el-date-picker>
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
</template>

<script setup>
import { ref } from 'vue'

const patient = ref({})

var editor

//加载编辑器
const onLoad = (e) => {

     editor =  e.target.contentWindow.editor

     setTimeout(()=>{
          //异步加载文档
          editor.loadUrl('/mock/bind_data.html').then(()=>{
               patient.value = editor.getBindObject()
          })
          //文档输入后表单值随着变化
          editor.document.addEventListener('input', ()=>{
            patient.value = editor.getBindObject()
          })
     }, 0)
}

//表单数据改变
const bindData = () => {
     editor.setBindObject(patient.value)
}
</script>