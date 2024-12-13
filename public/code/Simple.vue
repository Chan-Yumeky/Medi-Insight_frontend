<template>
     <el-button plain type="primary" @click="execCommand('print')">打印</el-button>
     <Editor doc="https://www.x-emr.cn/doc/999.html" @load="onLoad" style="margin: 10px 0;" mode="design"></Editor>
</template>

<script setup>

     var editor = null

     //加载编辑器
     const onLoad = (e) => {
          editor =  e.target.contentWindow.editor
     }

     //处理文档命令
     const execCommand = (cmd) => {
          editor.execCommand(cmd)
     }

</script>