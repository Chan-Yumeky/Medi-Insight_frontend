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
                        <el-table-column label="药物分类标签">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.drugType" :fetch-suggestions="fetchSuggestions1"
                                    placeholder="请输入医嘱内容" class="autocomplete-input" :style="{ width: '100%' }">
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
                        <el-table-column label="NDC码">
                            <template #default="{ row }">
                                <el-input v-model="row.ndcCode" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量强度">
                            <template #default="{ row }">
                                <el-input v-model="row.dosageStrength" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量值">
                            <template #default="{ row }">
                                <el-input v-model="row.dosage"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量单位">
                            <template #default="{ row }">
                                <el-input v-model="row.dosageUnit" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="形式">
                            <template #default="{ row }">
                                <el-input v-model="row.dosageForm" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="途径">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.route" :fetch-suggestions="fetchSuggestions2"
                                    placeholder="请输入医嘱内容" class="autocomplete-input" :style="{ width: '100%' }">
                                </el-autocomplete>
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
                    <el-table :data="procedureRows" border style="width: 100%" ref="table" :row-key="row => row.procedureName">
                        <el-table-column label="检查项" prop="procedureName" width="100"></el-table-column>
                        <el-table-column label="检查内容">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.procedure" :fetch-suggestions="fetchSuggestions1"
                                    @select="(selected) => onProcedureSelected(row, selected)" placeholder="请输入检查内容"
                                    class="autocomplete-input" :style="{ width: '100%' }">
                                </el-autocomplete>
                            </template>
                        </el-table-column>
                        <el-table-column label="检查类型">
                            <template #default="{ row }">
                                <el-autocomplete v-model="row.procedureType" :fetch-suggestions="fetchSuggestions1"
                                    placeholder="请输入检查类型" class="autocomplete-input" :style="{ width: '100%' }">
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
                        <el-table-column label="检查强度">
                            <template #default="{ row }">
                                <el-input v-model="row.intensity" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="检查结果">
                            <template #default="{ row }">
                                <el-input v-model="row.result"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="检查单位">
                            <template #default="{ row }">
                                <el-input v-model="row.unit" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="形式">
                            <template #default="{ row }">
                                <el-input v-model="row.procedureForm" disabled></el-input>
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

let isshow = ref(false);
let medicationList = ref([]);
let procedureList = ref([]);
onMounted(async() => {
    isshow.value = true;
    try {
        // 使用 fetch 加载 public 目录下的 medications.json 文件
        const response = await fetch('/ndc.json');
        if (!response.ok) {
            throw new Error('Failed to load medications.json');
        }
        // 解析 JSON 数据
        const data = await response.json();
        // 假设 medications.json 中包含药物名和 NDC 码
        medicationList.value = data.map((item) => ({
            value: `${item.chinese_name} ${item.ndc}`,
            drugName: item.drugName,
            cnName: item.chinese_name,
            ndcCode: item.ndcCode,
            dosage_form: item.dosage_form,
            dosage_unit: item.dosage_unit,
            dosage_strength: item.dosage_strength
        }));
    } catch (error) {
        console.error('Error loading medications.json:', error);
    }

    try {
        // 使用 fetch 加载 public 目录下的 medications.json 文件
        const response = await fetch('/icd9proc.json');
        if (!response.ok) {
            throw new Error('Failed to load medications.json');
        }
        // 解析 JSON 数据
        const data = await response.json();
        // 假设 medications.json 中包含药物名和 NDC 码
        procedureList.value = data.map((item) => ({
            value: `${item.CN_DETAILED} ${item.ICD9_CODE}`,
            cnName: item.CN_DETAILED,
            procName: item.SHORT_TITLE,
            icd9Code: item.ICD9_CODE,
            desc: item.LONG_TITLE,
        }));
    } catch (error) {
        console.error('Error loading medications.json:', error);
    }
});

// 药物部分 (Drug section)
const rows = ref([
    {
        adviceName: '1', adviceContent: '', startDate: '', endDate: '',
        drugType: '', drug: '', ndcCode: '', dosageStrength: '', dosage: '', dosageUnit: '', dosageForm: '', route: ''
    },
]);

const AdviceContentList = ref([
    '他克莫司 Tacrolimus 00469061711 1mg Capsule', '华法林 Warfarin 00056017275 5mg Tablet'
]);

const addAdviceRow = () => {
    const newRow = { adviceName: `${rows.value.length + 1}`, adviceContent: '' };
    rows.value.push(newRow);
};

const removeAdviceRow = (index: number) => {
    rows.value.splice(index, 1);
};

// 检查部分 (Procedure section)
const procedureRows = ref([
    {
        procedureName: '检查1', procedureContent: '', startDate: '', endDate: '',
        procedureType: '', procedure: '', procedureCode: '', intensity: '', result: '', unit: '', procedureForm: '', route: ''
    },
]);

const addProcedureRow = () => {
    const newRow = { procedureName: `${procedureRows.value.length + 1}`, procedureContent: '' };
    procedureRows.value.push(newRow);
};

const removeProcedureRow = (index: number) => {
    procedureRows.value.splice(index, 1);
};

// Fetch suggestions for both drug and procedure parts (Example: fetchSuggestions)
const fetchSuggestions = (query: string, callback: Function) => {
    if (!query) {
        return [];
    }
    const results = medicationList.value.filter(item =>
        item.cnName.toLowerCase().includes(query.toLowerCase())
    );
    callback(results);
};

const fetchSuggestions1 = (query: string, callback: Function) => {
    if (!query) {
        return [];
    }
    const results = procedureList.value.filter(item =>
        item.cnName.toLowerCase().includes(query.toLowerCase())
    );
    callback(results);
};

// Function when a drug or procedure is selected (You can adjust according to the data structure)
const onDrugSelected = (row: any, selected: any) => {
    const selectedDrug = selected.value.split(' ');
    row.drug = selectedDrug[0]; // 药物名
    row.ndcCode = selectedDrug[1]; // NDC 码
    // Handle drug selection logic here
};

const onProcedureSelected = (row: any, selected: any) => {
    // Handle procedure selection logic here
};
</script>

<style scoped>
.el-table {
    margin-top: 20px;
}

.autocomplete-input input {
    height: 40px;
}

.drug-frame, .procedure-frame {
    height: 45vh;
    overflow-y: scroll;
}

.drug-frame::-webkit-scrollbar, .procedure-frame::-webkit-scrollbar {
    display: none;
}
</style>
