<template>

<el-row>
    <el-button-group>
        <el-button plain type="primary" @click="appendHtml()">添加病程</el-button>
    </el-button-group>
</el-row>

<Source src="/code/AppendDoc.vue"></Source>
<Editor doc="https://www.x-emr.cn/doc/233.html" @load="onLoad" style="margin: 10px 0;"></Editor>

</template>


<script setup>
import axios from 'axios'//引入axios

let editor

//加载编辑器
const onLoad = (e) => {
     editor =  e.target.contentWindow.editor
}

//添加日常病程
const appendHtml = function() {
    axios.get('https://www.x-emr.cn/doc/233.html').then((result) => {
        editor.appendHtml(result.data)
    })
}

</script>