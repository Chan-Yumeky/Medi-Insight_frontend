<template>
    <div style="padding: 1em; background-color: white; height: calc(100vh - 7.2em); overflow-y: scroll;">
        <Transition name="slide-fade">
            <div v-if="isshow">
                <!-- 药物部分 -->
                <h3 style="padding: 1em 0;">药物部分</h3>
                <div class="drug-frame">
                    <el-button type="danger" @click="clearAllRows" style="margin-bottom: 0.5em;">
                        清空所有医嘱
                    </el-button>

                    <el-button type="primary" @click="addAdviceRow" style="margin-bottom: 0.5em;">添加医嘱</el-button>
                    <el-button @click="saveDrugData" style="margin-bottom: 0.5em;">保存</el-button>
                    <el-table :data="rows" border style="width: 100%" ref="table" :row-key="row => row.adviceName">
                        <el-table-column label="医嘱项" prop="adviceName" width="100"></el-table-column>
                        <el-table-column label="药物名">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.drug" :fetch-suggestions="fetchSuggestions"
                                    @select="(selected) => onDrugSelected(row, selected)" placeholder="请输入医嘱内容"
                                    class="autocomplete-input" :style="{ width: '100%' }">
                                </el-autocomplete>
                            </template>
                        </el-table-column>
                        <el-table-column label="开始日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.startDate" style="width: 100%;"> </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.endDate" style="width: 100%;"> </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="ATC码">
                            <template #default="{ row }">
                                <el-input v-model="row.ndcCode" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量值">
                            <template #default="{ row }">
                                <el-input v-model="row.dosage"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量单位">
                            <template #default="{ row }">
                                <el-input v-model="row.dosageUnit"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="形式">
                            <template #default="{ row }">
                                <el-input v-model="row.dosageForm"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row, $index }">
                                <el-button @click="removeAdviceRow($index)" type="danger" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!-- 检查部分 (Frame) -->
                <h3 style="padding: 1em 0;">检查部分</h3>
                <div class="procedure-frame">
                    <el-button type="danger" @click="clearAllRows" style="margin-bottom: 0.5em;">
                        清空所有检查项
                    </el-button>

                    <el-button type="primary" @click="addProcedureRow" style="margin-bottom: 0.5em;">添加检查项</el-button>
                    <el-button @click="saveProcedureData" style="margin-bottom: 0.5em;">保存</el-button>
                    <el-table :data="procedureRows" border style="width: 100%" ref="table"
                        :row-key="row => row.procedureName">
                        <el-table-column label="检查项" prop="procedureName" width="100"></el-table-column>
                        <el-table-column label="检查内容">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.procedure" :fetch-suggestions="fetchSuggestions1"
                                    @select="(selected) => onProcedureSelected(row, selected)" placeholder="请输入检查内容"
                                    class="autocomplete-input" :style="{ width: '100%' }">
                                </el-autocomplete>
                            </template>
                        </el-table-column>
                        <el-table-column label="开始日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.startDate" style="width: 100%;"> </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.endDate" style="width: 100%;"> </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="编码">
                            <template #default="{ row }">
                                <el-input v-model="row.procedureCode" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row, $index }">
                                <el-button @click="removeProcedureRow($index)" type="danger" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
    pid: { type: String, required: true }
});
let isshow = ref(false);
let medicationList = ref([]);
let procedureList = ref([]);
onMounted(async () => {
    isshow.value = true;
    const savedRows = localStorage.getItem(`drug_${props.pid}`);
    if (savedRows) {
        rows.value = JSON.parse(savedRows);
    }
    try {
        // 使用 fetch 加载 public 目录下的 medications.json 文件
        const response = await fetch('/ATC_cleaned.json');
        if (!response.ok) {
            throw new Error('Failed to load medications.json');
        }
        // 解析 JSON 数据
        const data = await response.json();
        // 假设 medications.json 中包含药物名和 NDC 码
        medicationList.value = data.map((item) => ({
            value: `${item.code} ${item.cn_name}`,
            drugName: item.name,
            cnName: item.cn_name,
            code: item.code,
        }));
    } catch (error) {
        console.error('Error loading medications.json:', error);
    }
    const savedProcRows = localStorage.getItem(`procedure_${props.pid}`);
    if (savedProcRows) {
        procedureRows.value = JSON.parse(savedProcRows);
    }
    try {
        // 使用 fetch 加载 public 目录下的 medications.json 文件
        const response = await fetch('/CCSPROC_cleaned.json');
        if (!response.ok) {
            throw new Error('Failed to load medications.json');
        }
        // 解析 JSON 数据
        const data = await response.json();
        // 假设 medications.json 中包含药物名和 NDC 码
        procedureList.value = data.map((item) => ({
            value: `${item.code} ${item.cn_name}`,
            cnName: item.cn_name,
            name: item.name,
            code: item.code,
        }));
    } catch (error) {
        console.error('Error loading medications.json:', error);
    }
});

// 药物部分 (Drug section)
const rows = ref([
    {
        adviceName: '1', startDate: '', endDate: '', drug: '', ndcCode: '', dosage: '', dosageUnit: '', dosageForm: ''
    },
]);

const AdviceContentList = ref([
    '他克莫司 Tacrolimus 00469061711 1mg Capsule', '华法林 Warfarin 00056017275 5mg Tablet'
]);

const addAdviceRow = () => {
    const newRow = { adviceName: `${rows.value.length + 1}`};
    rows.value.push(newRow);
};

const removeAdviceRow = (index: number) => {
    rows.value.splice(index, 1);
};

// 检查部分 (Procedure section)
const procedureRows = ref([
    {
        procedureName: '1', startDate: '', endDate: '',
        procedure: '', procedureCode: ''
    },
]);

const addProcedureRow = () => {
    const newRow = { procedureName: `${procedureRows.value.length + 1}`};
    procedureRows.value.push(newRow);
};

const removeProcedureRow = (index: number) => {
    procedureRows.value.splice(index, 1);
};

// Fetch suggestions for both drug and procedure parts (Example: fetchSuggestions)
const fetchSuggestions = (query: string, callback: Function) => {
    if (!query) {
        return callback(medicationList.value.map(item => ({ value: item.value })))
    }
    const results = medicationList.value.filter(item =>
        item.cnName.toLowerCase().includes(query.toLowerCase())
    );
    callback(results);
};

const fetchSuggestions1 = (query: string, callback: Function) => {
    if (!query) {
        return callback(procedureList.value.map(item => ({ value: item.value })))
    }
    const results = procedureList.value.filter(item =>
        item.cnName.toLowerCase().includes(query.toLowerCase())
    );
    callback(results);
};

// Function when a drug or procedure is selected (You can adjust according to the data structure)
const onDrugSelected = (row: any, selected: any) => {
    const selectedDrug = selected.value.split(' ');
    row.drug = selectedDrug[1]; // 药物名
    row.ndcCode = selectedDrug[0]; // NDC 码
    // Handle drug selection logic here
};

const onProcedureSelected = (row: any, selected: any) => {
    // Handle procedure selection logic here
    const selectedProcedure = selected.value.split(' ');
    row.procedure = selectedProcedure[1]; // 药物名
    row.procedureCode = selectedProcedure[0]; // NDC 码
};

const saveDrugData = () => {
    localStorage.removeItem(`drug_${props.pid}`)
    localStorage.setItem(`drug_${props.pid}`, JSON.stringify(rows.value));
    console.log(localStorage.getItem(`drug_${props.pid}`))
};

const saveProcedureData = () => {
    localStorage.removeItem(`procedure_${props.pid}`)
    localStorage.setItem(`procedure_${props.pid}`, JSON.stringify(procedureRows.value));
    console.log(localStorage.getItem(`procedure_${props.pid}`))
};
</script>

<style scoped>
.el-table {
    margin-top: 20px;
}

.autocomplete-input input {
    height: 40px;
}

.drug-frame,
.procedure-frame {
    height: 45vh;
    overflow-y: scroll;
}

.drug-frame::-webkit-scrollbar,
.procedure-frame::-webkit-scrollbar {
    display: none;
}
</style>
