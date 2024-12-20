<template>
    <div>
        <el-dialog v-model="dialogVisible" title="流程结束" width="500" :before-close="handleClose">
            <span>完成接诊？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="finishMeeting">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

let dialogVisible = ref(false)
const all_message = {'id':localStorage.getItem('cur_pid'),
    'prescription':localStorage.getItem(`diagnosis_${localStorage.cur_pid}`),
    'drug':localStorage.getItem(`drug_${localStorage.cur_pid}`),
    'procedure':localStorage.getItem(`procedure_${localStorage.cur_pid}`),
}
onMounted(()=>{
    dialogVisible.value=true;
    console.log(all_message)
})
const router = useRouter()
const finishMeeting = ()=>{
    axios.post('/api/registrations/record').then((resp)=>{
        if(resp.status==200){
            console.log(resp.data)
        }
    })
    router.push({
        name:'attendance'
    })
}
</script>

<style scoped></style>