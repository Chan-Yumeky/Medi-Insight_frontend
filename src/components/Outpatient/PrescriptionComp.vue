<template>
    <div style="padding: 1em;">
        <Transition name="slide-fade">
            <div v-if="isshow">
        <el-button type="danger" @click="clearAllRows" style="margin-bottom: 0.5em;">
            清空所有诊断
        </el-button>

        <el-button type="primary" @click="addDiagnosisRow" style="margin-bottom: 0.5em;">添加诊断</el-button>

        <el-table :data="rows" border style="width: 100%" ref="table" :row-key="row => row.diagnosisName">
            <el-table-column label="诊断项" prop="diagnosisName" width="100"></el-table-column>

            <el-table-column label="诊断内容">
                <template #default="{ row }">
                    <el-autocomplete v-model="row.diagnosisContent" :fetch-suggestions="fetchSuggestions"
                        placeholder="请输入诊断内容" class="autocomplete-input" :style="{ width: '100%' }">
                    </el-autocomplete>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="{ row, $index }">
                    <el-button @click="removeDiagnosisRow($index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
let isshow = ref(false);
onMounted(()=>{
    isshow.value = true;
})
const columns = ref<string[]>(['诊断内容']);

const rows = ref<Array<{ [key: string]: string }>>([
    { diagnosisName: '诊断1', diagnosisContent: '', diagnosis1: '' }
]);

const diagnosisContentList = ref([
    '高血压', '糖尿病', '冠心病', '脑卒中', '胃溃疡', '肺炎', '肾衰竭', '甲状腺功能亢进', '心肌梗塞'
]);

const addDiagnosisRow = () => {
    const newRow = { diagnosisName: `诊断${rows.value.length + 1}`, diagnosisContent: '' };

    columns.value.forEach((col, index) => {
        newRow[`diagnosis${index + 1}`] = '';
    });

    rows.value.push(newRow);
};

const removeDiagnosisRow = (index: number) => {
    rows.value.splice(index, 1);
    resetDiagnosisNames();
};

const clearAllRows = () => {
    rows.value = [];
};

const resetDiagnosisNames = () => {
    rows.value.forEach((row, index) => {
        row.diagnosisName = `诊断${index + 1}`;
    });
};

const fetchSuggestions = (query: string, callback: Function) => {
    if (!query) {
        callback(diagnosisContentList.value.map(item => ({ value: item })));
        return;
    }

    const results = diagnosisContentList.value
        .filter((item) => item.includes(query))
        .map(item => ({ value: item }));

    callback(results);
};
</script>

<style scoped>
.el-table {
    margin-top: 20px;
}

.autocomplete-input input {
    height: 40px;
}
</style>