<template>
    <div style="padding: 1em;">
        <Transition name="slide-fade">
            <div v-if="isshow">
                <el-button type="danger" @click="clearAllRows" style="margin-bottom: 0.5em;">
                    清空所有诊断
                </el-button>

                <el-button type="primary" @click="addDiagnosisRow" style="margin-bottom: 0.5em;">添加诊断</el-button>
                <el-button @click="saveDiagnosisData" style="margin-bottom: 0.5em;">保存</el-button>
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
import { defineProps, onMounted, ref, watch } from 'vue';

// 获取父组件传入的病人ID (pid)
const props = defineProps({
  pid: { type: String, required: true }
});

let isshow = ref(false);
const diagnosisContentList = ref([
  '高血压', '糖尿病', '冠心病', '脑卒中', '胃溃疡', '肺炎', '肾衰竭', '甲状腺功能亢进', '心肌梗塞'
]);

onMounted(async () => {
  isshow.value = true;
  // 恢复特定病人数据
  const savedRows = localStorage.getItem(`diagnosis_${props.pid}`);
  if (savedRows) {
    rows.value = JSON.parse(savedRows);
  }

  try {
    const file = '/CCSCM_cleaned.json';
    const response = await fetch(file); // 确保路径正确
    if (!response.ok) {
      throw new Error('Failed to load JSON file');
    }
    const data = await response.json();
    diagnosisContentList.value = data.map(item => `${item.code} - ${item.cn_name}`);
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
});

const columns = ref<string[]>(['诊断内容']);
const rows = ref<Array<{ [key: string]: string }>>([
  { diagnosisName: '诊断1', diagnosisContent: ''}
]);

const addDiagnosisRow = () => {
  const newRow = { diagnosisName: `诊断${rows.value.length + 1}`};
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

// 存储当前诊断数据到 localStorage，使用病人ID作为 key
const saveDiagnosisData = () => {
  localStorage.removeItem(`diagnosis_${props.pid}`)
  localStorage.setItem(`diagnosis_${props.pid}`, JSON.stringify(rows.value));
  console.log(localStorage.getItem(`diagnosis_${props.pid}`))
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
