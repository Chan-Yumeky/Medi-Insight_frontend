<template>
     <Source src="/code/DocLang.vue"></Source>
     <el-tabs v-model="activeName">
          <el-tab-pane label="英文" name="en-us" >
            <Editor mode="design" lang="en-us" doc="/mock/en_us.html"></Editor>
          </el-tab-pane>
          <el-tab-pane label="简体中文" name="zh-cn">
            <Editor mode="design"  lang="zh-cn" doc="https://www.x-emr.cn/doc/999.html"></Editor>
          </el-tab-pane>
          <el-tab-pane label="繁体中文" name="zh-tw">
            <Editor mode="design" lang="zh-tw"  doc="/mock/zh-tw.html"></Editor>
          </el-tab-pane>
          <el-tab-pane label="藏文" name="zh-bo">
            <Editor mode="design" lang="zh-bo"  doc="/mock/zh-bo.html"></Editor>
          </el-tab-pane>
          <el-tab-pane label="维文" name="zh-ug">
            <Editor mode="design" lang="zh-ug"  doc="/mock/zh-ug.html"></Editor>
          </el-tab-pane>
     </el-tabs>
</template>
    
<script setup>
    import { ref } from 'vue'

    const activeName = ref('en-us')

</script>