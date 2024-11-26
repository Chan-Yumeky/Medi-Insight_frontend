<template>
    <div style="padding: 1em;">
        <Transition name="slide-fade">
            <div v-if="isshow">
        <el-button type="danger" @click="clearAllRows" style="margin-bottom: 0.5em;">
            清空所有医嘱
        </el-button>

        <el-button type="primary" @click="addAdviceRow" style="margin-bottom: 0.5em;">添加医嘱</el-button>

        <el-table :data="rows" border style="width: 100%" ref="table" :row-key="row => row.AdviceName">
            <el-table-column label="医嘱项" prop="AdviceName" width="100"></el-table-column>

            <el-table-column label="医嘱内容">
                <template #default="{ row }">
                    <el-autocomplete v-model="row.AdviceContent" :fetch-suggestions="fetchSuggestions"
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
    </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
let isshow = ref(false);
onMounted(()=>{
    isshow.value = true;
})
const columns = ref<string[]>(['医嘱内容']);

const rows = ref<Array<{ [key: string]: string }>>([
    { AdviceName: '医嘱1', AdviceContent: '', Advice1: '' }
]);

const AdviceContentList = ref([
    '高血压', '糖尿病', '冠心病', '脑卒中', '胃溃疡', '肺炎', '肾衰竭', '甲状腺功能亢进', '心肌梗塞'
]);

const addAdviceRow = () => {
    const newRow = { AdviceName: `医嘱${rows.value.length + 1}`, AdviceContent: '' };

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
        row.AdviceName = `医嘱${index + 1}`;
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
</script>

<style scoped>
.el-table {
    margin-top: 20px;
}

.autocomplete-input input {
    height: 40px;
}
</style>