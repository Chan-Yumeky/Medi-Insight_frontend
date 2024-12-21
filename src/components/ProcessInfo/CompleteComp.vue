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
import { getSessionId } from '@/utils/utils';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    sid: { type: String, required: true }
})
let dialogVisible = ref(false)
const all_message = {'id':props.sid,
    'did':getSessionId(),
    'diagnosis':JSON.parse(localStorage.getItem(`diagnosis_${localStorage.cur_pid}`)),
    'drug':JSON.parse(localStorage.getItem(`drug_${localStorage.cur_pid}`)),
    'procedure':JSON.parse(localStorage.getItem(`procedure_${localStorage.cur_pid}`)),
}
onMounted(()=>{
    dialogVisible.value=true;
    console.log(all_message)
})
const router = useRouter()
const finishMeeting = async()=>{
    await axios.post('/auth/api/medical/save',all_message).then((resp)=>{
        if(resp.status==200){
            console.log(resp.data)
            localStorage.removeItem(`diagnosis_${localStorage.cur_pid}`)
            localStorage.removeItem(`drug_${localStorage.cur_pid}`)
            localStorage.removeItem(`procedure_${localStorage.cur_pid}`)
            localStorage.removeItem('cur_pid')
        }
    })
    router.push({
        name:'attendance'
    })
}
</script>

<style scoped></style>