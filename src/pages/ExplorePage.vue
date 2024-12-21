<template>
  <div class="wrapper" style="overflow: hidden">
    <div class="container">
      <!-- 顶部区域，轮播图和图表区域各占1/2 -->
      <div class="top-row">
        <!-- 轮播图区域 -->
        <Transition name="slide-fade">
          <div v-if="isshow" class="carousel-container">
            <el-carousel trigger="click" height="330px" arrow="never" indicator-position="inside">
              <el-carousel-item v-for="(item, index) in images" :key="index">
                <img :src="item" alt="Carousel Image" class="carousel-image" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </Transition>

        <!-- 图表区域，使用 grid 布局 -->
        <div class="echarts">
          <!-- 图表容器 -->
          <div id="chart" class="chart-item chart1"></div>
          <div id="chart2" class="chart-item chart2"></div>
          <div id="chart3" class="chart-item chart3"></div>
          <div id="chart4" class="chart-item chart4"></div>
        </div>
      </div>

      <!-- 底部内容 -->
      <Transition name="slide-fade">
        <div v-if="isshow">
          <div class="main-title">
            <h1>功能列表</h1>
          </div>
          <div class="item-row">
            <div class="itemline">
              <div class="item" @click="changeToAttendancePage">
                <img src="../assets/医生.svg" alt="" style="width: 50%; height: 50%;">
                <h2>接诊</h2>
              </div>
              <div class="item">
                <img src="../assets/loading.svg" alt="" style="width: 40%; height: 40%;">
                <h2 style="font-size: 1.1em;margin-top: 1em;">更多功能正在开发中</h2>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
let isshow = ref(false);

const images = ref([
  'src/assets/VCG41N1480946605.webp',  // 替换为你的图片路径
  'src/assets/VCG41N1480946811.webp',
  'src/assets/VCG41N2149354382.webp',
  'src/assets/VCG211382243422.webp',
  'src/assets/VCG211450049310.webp',
]);
onMounted(async () => {
  isshow.value = true;
  const ubchart = document.getElementById("chart");
  if (ubchart) {
    ubchart.removeAttribute('_echarts_instance_');
  }
  await initChart1();
  console.log(document.getElementById("chart"));
});
const router = useRouter()
const changeToAttendancePage = ()=>{
  router.push({
    name:'attendance'
  })
}

import * as echarts from "echarts";
import axios from "axios";
import { useRouter } from 'vue-router';

const initChart1 = async () => {
  const chart = echarts.init(document.getElementById("chart"), "light");
  const chart2 = echarts.init(document.getElementById("chart2"), "light");
  const chart3 = echarts.init(document.getElementById("chart3"), "light");
  const chart4 = echarts.init(document.getElementById("chart4"), "light");

  // 从后端获取数据
  const fetchData = async () => {
    try {
      const response = await axios.get("你的后端接口地址"); // 替换为实际的后端接口
      return response.data; // 假设后端返回的数据结构符合你图表的需要
    } catch (error) {
      console.error("获取数据失败", error);
      return null;
    }
  };

  const data = await fetchData(); // 获取后端数据

  // 获取的后端数据的格式示例：

  // {
  //   "patientFlow": [120, 200, 150, 80],
  //     "monthlyFlow": [
  //   { "value": 120, "name": "Jan" },
  //   { "value": 132, "name": "Feb" },
  //   { "value": 101, "name": "Mar" },
  //   { "value": 134, "name": "Apr" },
  //   { "value": 90, "name": "May" },
  //   { "value": 230, "name": "Jun" },
  //   { "value": 210, "name": "Jul" },
  //   { "value": 150, "name": "Aug" },
  //   { "value": 320, "name": "Sep" },
  //   { "value": 210, "name": "Oct" },
  //   { "value": 165, "name": "Nov" },
  //   { "value": 200, "name": "Dec" }
  // ],
  //     "weekFlow": [120, 200, 150, 80, 70, 110, 130],
  //     "totalPatients": 1000
  // }


  const chartOptions = {
    title: { text: "季度患者流量趋势", left: "center" },
    xAxis: {
      type: "category",
      data: ["第一季度", "第二季度", "第三季度", "第四季度"] // 4个季度
    },
    yAxis: { type: "value" },
    series: [
      {
        data: data ? data.patientFlow : [120, 200, 150, 80], // 后端数据替换静态数据
        type: "line",
        smooth: true
      }
    ]
  };

  const chartOptions2 = {
    title: { text: "患者月度流量占比", left: "center" },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)" // 显示每项的数值和百分比
    },
    series: [
      {
        type: "pie",
        radius: "70%", // 设置环形内外半径
        center: ["50%", "60%"], // 圆心位置居中
        data: data ? data.monthlyFlow : [
          { value: 120, name: "Jan" },
          { value: 132, name: "Feb" },
          { value: 101, name: "Mar" },
          { value: 134, name: "Apr" },
          { value: 90, name: "May" },
          { value: 230, name: "Jun" },
          { value: 210, name: "Jul" },
          { value: 150, name: "Aug" },
          { value: 320, name: "Sep" },
          { value: 210, name: "Oct" },
          { value: 165, name: "Nov" },
          { value: 200, name: "Dec" }
        ], // 后端数据替换静态数据
        labelLine: { show: true }, // 显示标签连接线
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)", // 显示标签的名称、数值和百分比
          fontSize: 10,
          fontWeight: "bold",
          color: "#333"
        },
        itemStyle: {
          borderRadius: 10, // 圆角效果
          borderColor: "#fff", // 边框颜色
          borderWidth: 2 // 边框宽度
        }
      }
    ]
  };

  const chartOptions3 = {
    title: { text: "周流量分布", left: "center" },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: { type: "value" },
    series: [
      { data: data ? data.weekFlow : [120, 200, 150, 80, 70, 110, 130], type: "bar" } // 后端数据替换静态数据
    ]
  };

  const chartOptions4 = {
    title: { text: "接待患者总人数", left: "center" },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'], // 环形内外半径
        center: ['50%', '50%'], // 圆心居中
        data: data ? [{ value: data.totalPatients, name: '患者人数', itemStyle: { color: '#ebeafc' }, }] : [{ value: 1000, name: '患者人数', itemStyle: { color: '#ebeafc' }, }],
        labelLine: { show: false }, // 隐藏连接线
        label: { show: false }, // 隐藏标签
      },
      {
        type: 'pie',
        radius: ['0%', '50%'], // 内半径为 0，外半径为 50%
        center: ['50%', '50%'],
        data: data ? [{ value: data.totalPatients, name: '患者人数', itemStyle: { color: '#e3e4f9' }, }] : [{ value: 1000, name: '患者人数', itemStyle: { color: '#e3e4f9' }, }],
        labelLine: { show: false }, // 隐藏连接线
        label: {
          show: true,
          position: 'center',
          fontSize: 25, // 设置数字字体大小
          fontWeight: 'bold',
          color: '#6A5ACD', // 数字的颜色：蓝紫色
          formatter: '{c}', // 显示数字
        }
      },
    ]
  };

  // 设置图表选项
  chart.setOption(chartOptions);
  chart2.setOption(chartOptions2);
  chart3.setOption(chartOptions3);
  chart4.setOption(chartOptions4);

  // 图表大小自适应
  window.addEventListener("resize", function () {
    chart.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
  });
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
  /* 去除滚动条 */
}

.container {
  height: 100vh;
  /* 总高度为100vh */
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.top-row {
  display: flex;
  width: 100%;
  height: 50vh;
  /* 顶部区域占1/3 */
}

.carousel-container {
  width: 50%;
  height: 50%;
  padding: 0.5em 1rem;
  box-sizing: border-box;
}

.echarts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 两列 */
  grid-template-rows: repeat(2, 1fr);
  /* 两行 */
  gap: 1rem;
  /* 图表之间的间隔 */
  width: 50%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.chart-item {
  width: 100%;
  height: 100%;
}


.main-title {
  width: 100%;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2em;
  box-sizing: border-box;
  margin-bottom: 2em;
  flex-direction: column;
}

.main-title h1,
p {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.main-title p {
  height: 1em;
  margin-top: -2em;
}

.item-row {
  height: 10em;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 2em;
  box-sizing: border-box;
}

.sub-title {
  height: 4em;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.itemline {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.item {
  border-radius: 5px;
  height: 100%;
  width: 14em;
  margin-right: 1.5em;
  background-color: white;
  box-shadow: 2px 2px 6px #ccc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #333
}

.item:hover {
  scale: 1.1;
  transition: 0.2s;
}
</style>
