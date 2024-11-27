<template>
    <div style="padding: 1em; background-color: white; height: calc(100vh - 7.2em); overflow-y: scroll;">
        <Transition name="slide-fade">
            <div v-if="isshow">
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
                                <el-date-picker v-model="row.startDate" style="width: 100%;">

                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.endDate" style="width: 100%;">

                                </el-date-picker>
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
                <h3 style="padding: 1em 0;">检查部分</h3>
                <div class="procedure-frame">
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
                                <el-date-picker v-model="row.startDate" style="width: 100%;">

                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template #default="{ row }">
                                <el-date-picker v-model="row.endDate" style="width: 100%;">

                                </el-date-picker>
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
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
let isshow = ref(false);
onMounted(() => {
    isshow.value = true;
})
const columns = ref<string[]>(['医嘱内容']);

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

    columns.value.forEach((col, index) => {
        newRow[`Advice${index + 1}`] = '';
    });

    rows.value.push(newRow);
};

const removeAdviceRow = (index: number) => {
    rows.value.splice(index, 1);
    resetAdviceNames();
};

const clearAllRows = () => {
    rows.value = [];
};

const resetAdviceNames = () => {
    rows.value.forEach((row, index) => {
        row.adviceName = `${index + 1}`;
    });
};

const fetchSuggestions = (query: string, callback: Function) => {
    if (!query) {
        callback(AdviceContentList.value.map(item => ({ value: item })));
        return;
    }

    const results = AdviceContentList.value
        .filter((item) => item.includes(query))
        .map(item => ({ value: item }));

    callback(results);
};

const drugTypeList = ref([
    'MAIN', 'BASE', 'ADDITIVE'
])

const routeList = ref([
    'IV（静脉注射）', 'PO（口服）', 'IM（肌肉注射）'
])

const fetchSuggestions1 = (query: string, callback: Function) => {
    if (!query) {
        callback(drugTypeList.value.map(item => ({ value: item })));
        return;
    }

    const results = drugTypeList.value
        .filter((item) => item.includes(query))
        .map(item => ({ value: item }));

    callback(results);
};

const fetchSuggestions2 = (query: string, callback: Function) => {
    if (!query) {
        callback(routeList.value.map(item => ({ value: item })));
        return;
    }

    const results = routeList.value
        .filter((item) => item.includes(query))
        .map(item => ({ value: item }));

    callback(results);
};

const onDrugSelected = (row: any, selected: any) => {
    console.log(`${row} is selected`);
    const vals = selected.value.split(' ');
    row.drug = vals[0];
    row.ndcCode = vals[2];
    row.dosageStrength = vals[3] + ' ' + vals[4];
    row.dosageUnit = vals[3].substring(1)
    const form: String = vals[4].substring(0, 3);
    row.dosageForm = form.toUpperCase();
};

// const columns1 = ref<string[]>(['医嘱内容']);

// const rows1 = ref([
//     {
//         adviceName: '1', adviceContent: '', startDate: '', endDate: '',
//         drugType: '', drug: '', ndcCode: '', dosageStrength: '', dosage: '', dosageUnit: '', dosageForm: '', route: ''
//     },
// ]);

// const AdviceContentList1 = ref([
//     '他克莫司 Tacrolimus 00469061711 1mg Capsule', '华法林 Warfarin 00056017275 5mg Tablet'
// ]);

// const addAdviceRow = () => {
//     const newRow = { adviceName: `${rows1.value.length + 1}`, adviceContent: '' };

//     columns.value.forEach((col, index) => {
//         newRow[`Advice${index + 1}`] = '';
//     });

//     rows1.value.push(newRow);
// };

// const removeAdviceRow = (index: number) => {
//     rows1.value.splice(index, 1);
//     resetAdviceNames();
// };

// const clearAllRows = () => {
//     rows1.value = [];
// };

// const resetAdviceNames = () => {
//     rows1.value.forEach((row, index) => {
//         row.adviceName = `${index + 1}`;
//     });
// };

// const fetchSuggestions = (query: string, callback: Function) => {
//     if (!query) {
//         callback(AdviceContentList1.value.map(item => ({ value: item })));
//         return;
//     }

//     const results = AdviceContentList1.value
//         .filter((item) => item.includes(query))
//         .map(item => ({ value: item }));

//     callback(results);
// };

// const drugTypeList = ref([
//     'MAIN', 'BASE', 'ADDITIVE'
// ])

// const routeList = ref([
//     'IV（静脉注射）', 'PO（口服）', 'IM（肌肉注射）'
// ])

// const fetchSuggestions1 = (query: string, callback: Function) => {
//     if (!query) {
//         callback(drugTypeList.value.map(item => ({ value: item })));
//         return;
//     }

//     const results = drugTypeList.value
//         .filter((item) => item.includes(query))
//         .map(item => ({ value: item }));

//     callback(results);
// };

// const fetchSuggestions2 = (query: string, callback: Function) => {
//     if (!query) {
//         callback(routeList.value.map(item => ({ value: item })));
//         return;
//     }

//     const results = routeList.value
//         .filter((item) => item.includes(query))
//         .map(item => ({ value: item }));

//     callback(results);
// };

// const onDrugSelected = (row: any, selected: any) => {
//     console.log(`${row} is selected`);
//     const vals = selected.value.split(' ');
//     row.drug = vals[0];
//     row.ndcCode = vals[2];
//     row.dosageStrength = vals[3] + ' ' + vals[4];
//     row.dosageUnit = vals[3].substring(1)
//     const form: String = vals[4].substring(0, 3);
//     row.dosageForm = form.toUpperCase();
// };
</script>

<style scoped>
.el-table {
    margin-top: 20px;
}

.autocomplete-input input {
    height: 40px;
}


.drug-frame {
    height:45vh;
    overflow-y: scroll;
}

.drug-frame::-webkit-scrollbar {
    display: none;
}

.procedure-frame {
    height:45vh;
    overflow-y: scroll;
}

.procedure-frame::-webkit-scrollbar{
    display: none;
}
</style>