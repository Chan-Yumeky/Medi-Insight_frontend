<template>
  <!-- 根据实际部署环境修改 editor.html 的路径 -->
  <iframe src="./editor.html" v-bind="objectOfAttrs"></iframe>
</template>

<script>
     export default {
          data() {
               return {
                    objectOfAttrs:{
                         width:'100%',
                         height:'800vh',
                         frameborder: 0
                    }
               }
          }
     }
</script>