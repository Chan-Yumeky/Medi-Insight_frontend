<template>
     <Source src="/code/Calculate.vue"></Source>
     <el-row>
          <Editor doc="/mock/assess_table.html" @load="onLoad" style="margin: 10px 0;" mode="design"></Editor>
     </el-row>
</template>

<script setup>
import { ref } from 'vue'

var editor

//加载编辑器
const onLoad = (e) => {
     editor =  e.target.contentWindow.editor
}


</script>