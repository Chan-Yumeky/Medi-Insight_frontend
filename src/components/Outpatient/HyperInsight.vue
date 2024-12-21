<template>
    <div class="containera">
        <div v-if="maskVisible" class="mask"
            style="height: 100vh;width: 100vw; position: fixed; top: 0;left: 0;background-color: #0b143b;z-index: 999; display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <h1
                style="color: white; margin-bottom: 1em; font-size: 4em; text-shadow: 1px 1px 6px rgba(0, 255, 255, 0.7), 0 0 25px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.5);">
                HYPERINSIGHT</h1>

            <el-progress type="dashboard" :stroke-width="26" :percentage="progress" style="z-index: 999"
                :color="colors" />
            <h3 style="color: white;">Loading...</h3>
        </div>
        <header>
            <div
                style="z-index: 2; position: fixed; top: 0;left: 0; width: 100%; height: 5em; display: flex;justify-content: flex-start; align-items: center;margin: 0 2em;">
                <el-button plain size="small" @click="back" type="primary"
                    style="background-color: transparent; display: flex;justify-content: center;align-items: center;"><el-icon
                        class="el-icon--right" style="display: flex;justify-content: center;align-items: center;">
                        <ArrowLeftBold />
                    </el-icon></el-button>
            </div>
            <img src="../../assets/screen/3.png" alt=""
                style="width: 100%; position: fixed; top: 0; left: 0; z-index: 1;">
            <div style="height: 4em; display: flex; justify-content: center; align-items: center; width: 100%;">
                <h1 class="glow-text">HyperInsight</h1>
            </div>
        </header>
        <div class="main-content">
            <div class="left" style="width: 30%; box-sizing: border-box; padding-left: 1em; height: 86vh;">
                <div id="main" style="height: 50%;width: 100%;"></div>
                <div id="main1" style="height: 50%; width: 100%;"></div>
            </div>
            <div class="center">
                <div id="mainc"
                    style="height: 90vh;width: 100%;  display: flex;justify-content: center;align-items: center; position: absolute;">
                </div>
                <img src="../../assets/screen/医疗1.png" alt=""
                    style="height: 90vh; display: flex;justify-content: center;align-items: center;">
            </div>
            <div class="right" style="width: 30%;box-sizing: border-box; padding-right: 1em; height: 86vh;">
                <div class="heatmap">
                    <div id="main2" style="height: 100%;width: 100%;"></div>
                </div>
                <div class="bar">
                    <div id="main4" style="height: 100%;width: 100%;"></div>
                </div>
            </div>
        </div>
        <div style="position: fixed;bottom: 0;left: 0; display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/screen/1-1.png" alt="" style="width: 100%; ">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const props = defineProps({
    sid: { type: String, required: true }
})

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
]

let progress = ref(0)
let maskVisible = ref(true)
onMounted(async () => {
    progress.value = 0
    await getAllHistory();
    progress.value += 15
    await getMortality();
    progress.value += 15
    await getReadmission();
    progress.value += 15
    await getLenOfStay();
    progress.value += 15
    await fetchDrugNames()
    await getDrugRecommendation();
    progress.value += 15
    await initChart1();
    await initChart2();
    await initChart3();
    await initChart4();
    await initChart5();
    progress.value = 100
    await new Promise(resolve => setTimeout(resolve, 1000));
    maskVisible.value = false
})

const all_inform = {
    'patient_id': localStorage.getItem('cur_pid'),
    'visit_id': props.sid,
    'label': 1,
    'conditions': [],
    'procedures': [],
    'drugs': []
}

let mortality = 0.16;
let readmission = 0.39;
let lenofstay = [];
let drugrec = []
const getMortality = async () => {
    await axios.post('http://127.0.0.1:5002/api/predict/mortality', [all_inform])
        .then((resp) => {
            // 处理返回的数据
            console.log(resp.data.mortality[0])
            mortality = resp.data.mortality[0];
            console.log(mortality);
        })
        .catch((error) => {
            // 错误处理
            console.error("Error fetching data:", error);
        });
}

const getReadmission = async () => {
    await axios.post('http://127.0.0.1:5002/api/predict/readmission', [all_inform])
        .then((resp) => {
            // 处理返回的数据
            console.log(resp.data.readmission[0])
            readmission = resp.data.readmission[0];
            console.log(readmission);
        })
        .catch((error) => {
            // 错误处理
            console.error("Error fetching data:", error);
        });
}

const len_names = ['少于1天', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '1.5周', '超过两周']
const getLenOfStay = async () => {
    await axios.post('http://127.0.0.1:5002/api/predict/lenofstay', [all_inform])
        .then((resp) => {
            // 处理返回的数据
            console.log(resp.data.lenofstay)
            const temp = resp.data.lenofstay;
            for (let i = 0; i < temp.length; i++) {
                lenofstay.push({
                    value: temp[i].toFixed(3),
                    name: len_names[i]
                })
            }
            console.log(lenofstay);
        })
        .catch((error) => {
            // 错误处理
            console.error("Error fetching data:", error);
        });
}

let drugnames = []
const fetchDrugNames = async () => {
    const response = await fetch('/trans_father.json');  // 读取 JSON 文件
    const data = await response.json();  // 解析 JSON 数据

    drugnames = data.map(item => ({
        code: item.code,
        name: item.name,
        cn_name: item.cn_name
    }));

    console.log(drugnames);  // 打印提取的数据
};
const getDrugRecommendation = async () => {
    await axios.post('http://127.0.0.1:5002/api/predict/drugrec', [all_inform])
        .then((resp) => {
            console.log(resp.data.drugrec)
            const temp = resp.data.drugrec;
            const tempWithIndex = temp.map((value, index) => ({ value, index }));
            tempWithIndex.sort((a, b) => b.value - a.value);
            console.log('tempwithindex:', tempWithIndex)
            const matched = tempWithIndex.map((item) => {
                const matchingDrugName = drugnames[item.index];
                return {
                    drugRecValue: item.value,  // 排序后的浮点数值
                    ...matchingDrugName  // 配对的 drugnames 数据
                };
            });
            drugrec = matched.slice(0, 3).map(item => ({
                name: item.cn_name,
                value: item.drugRecValue.toFixed(3)
            }));
            console.log('drugrec:', drugrec);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

const initChart1 = async () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option = {
        backgroundColor: 'transparent',
        title: [{
            text: '死亡率',
            x: '22%',
            y: '70%',
            textStyle: {
                fontSize: 14,
                fontWeight: '100',
                color: '#5dc3ea',
                lineHeight: 16,
                textAlign: 'center',
            },
        },
        {
            text: '再住院率',
            x: '73%',
            y: '70%',
            textStyle: {
                fontSize: 14,
                fontWeight: '100',
                color: '#5dc3ea',
                lineHeight: 16,
                textAlign: 'center',
            },
        },
        ],
        series: [{
            type: 'liquidFill',
            radius: '47%',
            center: ['25%', '45%'],
            color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#446bf5',
                },
                {
                    offset: 1,
                    color: '#2ca3e2',
                },
                ],
                globalCoord: false,
            },],
            data: [mortality, mortality], // data个数代表波浪数
            backgroundStyle: {
                borderWidth: 1,
                color: 'RGBA(51, 66, 127, 0.7)',
            },
            label: {
                normal: {
                    textStyle: {
                        fontSize: 28,
                        color: '#fff',
                    },
                },
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: '#112165',
                },
            },
        },
        {
            type: 'liquidFill',
            radius: '47%',
            center: ['75%', '45%'],
            color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#2aa1e3',
                },
                {
                    offset: 1,
                    color: '#08bbc9',
                },
                ],
                globalCoord: false,
            },],
            data: [readmission, readmission], // data个数代表波浪数
            backgroundStyle: {
                borderWidth: 1,
                color: 'RGBA(51, 66, 127, 0.7)',
            },
            label: {
                normal: {
                    textStyle: {
                        fontSize: 28,
                        color: '#fff',
                    },
                },
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: '#112165',
                },
            },
        },
        ],
    };
    option && myChart.setOption(option);
}

const initChart2 = async () => {
    var chartDom = document.getElementById('main1');
    var myChart = echarts.init(chartDom);
    var option = {
        // backgroundColor: '#05224d',
        title: {
            text: 'EVA',
            textStyle: {
                color: 'rgba(131, 162, 192, 1)',
                fontSize: 12,
            },
            top: '4%',
            left: '2%',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['预测', '实际'],
            icon: 'rich',
            show: true,
            itemWidth: 18,
            itemHeight: 2,
            textStyle: {
                color: '#AFBDD1',
                fontSize: '12px',
            },
            top: 8,
            right: 10,
            itemGap: 34,
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '10%',
            top: '16%',
            containLabel: true,
        },
        xAxis: {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            type: 'category',
            boundaryGap: false,
            axisLine: {
                symbol: 'none',
                lineStyle: {
                    color: '#50637A',
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                interval: 0,
                color: '#6071A9',
                fontSize: 12,
                padding: [10, 0, 0, 0],
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#6071A9',
                fontSize: 12,
                padding: [0, 10, 0, 0],
            },
            splitLine: {
                lineStyle: {
                    color: '#50637A',
                    type: 'dashed',
                },
            },
        },
        series: [{
            name: '预测',
            type: 'line',
            data: [1, 2, 3, 4, 5, 7, 7, 8, 9, 2],
            smooth: true,
            color: '#1D87F0',
            lineStyle: {
                width: 2,
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [{
                        offset: 0,
                        color: 'rgba(29, 135, 240, 0.6)',
                    },
                    {
                        offset: 0.8,
                        color: 'rgba(29, 135, 240, 0.2)',
                    },
                    ],
                    false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
            },
            symbol: 'circle',
            symbolSize: 6,
        },
        {
            name: '实际',
            data: [1, 2, 3, 4, 7, 6, 7, 8, 4, 10],
            type: 'line',
            smooth: true,
            color: '#00F7FF',
            lineStyle: {
                width: 2,
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [{
                        offset: 0,
                        color: 'rgba(0, 247, 255, .6)',
                    },
                    {
                        offset: 0.8,
                        color: 'rgba(0, 247, 255, .2)',
                    },
                    ],
                    false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
            },
            symbol: 'circle',
            symbolSize: 6,
        },
        ],
    }
    option && myChart.setOption(option);
}

const initChart3 = async () => {
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom, null, { width: 450, height: 300 });
    let bgColor = '#001037';
    let title = '总量';
    let color = ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];
    let echartData = lenofstay

    let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
    }
    let total = echartData.reduce((a, b) => {
        return a + b.value * 1
    }, 0);

    let option = {
        backgroundColor: '',
        color: color,
        title: [{
            top: 'center',
            left: 'center',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 12,  // 改小字体大小
                        fontWeight: 'normal',
                        color: '#fefefe',
                        padding: [10, 0]
                    },
                    val: {
                        fontSize: 28,  // 改小字体大小
                        fontWeight: 'bolder',
                        color: '#fefefe',
                    }
                }
            }
        }, {
            text: '',
            top: 20,
            left: 20,
            textStyle: {
                fontSize: 5,  // 改小字体大小
                color: '#666666',
                fontWeight: 400
            },
            show: false
        }],
        series: [{
            type: 'pie',
            roseType: 'radius',
            radius: ['25%', '60%'],
            center: ['50%', '50%'],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    borderColor: bgColor,
                    borderWidth: 2
                }
            },
            labelLine: {
                normal: {
                    length: 10,  // 缩短线条长度
                    length2: 60,  // 缩短线条长度
                    lineStyle: {
                        // color: '#e6e6e6'
                    }
                }
            },
            label: {
                normal: {
                    formatter: params => {
                        return (
                            '{icon|●}{name|' + params.name + '}\n{value|' +
                            formatNumber(params.value) + '}'
                        );
                    },
                    rich: {
                        icon: {
                            fontSize: 10,  // 改小字体大小
                            color: 'inherit'
                        },
                        name: {
                            fontSize: 12,  // 改小字体大小
                            padding: [0, 0, 0, 10],
                            color: '#fefefe'
                        },
                        value: {
                            fontSize: 10,  // 改小字体大小
                            fontWeight: 'bolder',
                            padding: [10, 0, 0, 20],
                            color: 'inherit'
                        }
                    }
                }
            },
        }]
    };



    option && myChart.setOption(option);
}

const initChart4 = async () => {
    var chartDom = document.getElementById('mainc');
    var myChart = echarts.init(chartDom);

    // 图表的配置项
    var option = {
        backgroundColor: 'transparent',  // 背景设置为透明
        grid: {
            backgroundColor: 'transparent',  // 设置 grid 区域的背景为透明
        },
        tooltip: {
            trigger: 'item',  // 确保 tooltip 触发方式为 item
            show: true,
            formatter: function (params) {
                return 'Heart Position (' + params.data[0] + ', ' + params.data[1] + ')'; // 显示坐标位置
            }
        },
        xAxis: {
            type: 'value',
            min: 0,
            max: 1000, // 根据图像尺寸来调整
            axisLabel: { show: false }, // 隐藏 x 轴
            axisTick: { show: false }, // 隐藏x轴刻度线
            axisLine: {
                lineStyle: { color: 'transparent' } // 坐标轴线透明
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'transparent' // 网格线透明
                }
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1000, // 根据图像尺寸来调整
            axisLabel: { show: false }, // 隐藏 y 轴
            axisTick: { show: false }, // 隐藏y轴刻度线
            axisLine: {
                lineStyle: { color: 'transparent' } // 坐标轴线透明
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'transparent' // 网格线透明
                }
            },
        },
        series: [
            {
                name: 'Heart Location',
                type: 'scatter',
                data: [[520, 730]], // 心脏的位置 (根据实际图像坐标调整)
                symbolSize: 30, // 增大标记的大小，确保鼠标可以触发
                itemStyle: {
                    opacity: 0.5,  // 调整透明度，确保点仍然可见
                    color: 'red', // 设置标记的颜色为红色
                    shadowBlur: 20, // 模糊效果，增加阴影的模糊度
                    shadowColor: 'rgba(255, 0, 0, 0.7)', // 阴影的颜色，红色的扩散效果
                    shadowOffsetX: 0, // 阴影在 x 轴的偏移量
                    shadowOffsetY: 0  // 阴影在 y 轴的偏移量
                },
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表
    option && myChart.setOption(option);
};


const initChart5 = async () => {
    var chartDom = document.getElementById('main4');
    var myChart = echarts.init(chartDom);
    const dataSource = drugrec

    var option = {
        backgroundColor: '',
        tooltip: {
            trigger: "axis",
        },
        grid: {
            containLabel: true,
            left: "4%",
            right: "5%",
            bottom: "2%",
            top: '30',
        },
        dataZoom: [ //滚动条
            {
                show: dataSource.length > 4 ? true : false,
                type: 'slider',
                realtime: true,
                startValue: 0,
                endValue: 4,
                yAxisIndex: [0],
                top: '0%',
                left: '0',
                width: 0,
                // height: "70%",
                handleSize: 5,
                borderColor: 'rgba(0,0,0,0)',
                textStyle: {
                    color: 'transparent',
                    show: false
                },
                // filterMode: 'filter',
                // filterMode: "empty",
                showDetail: false,
                zoomLock: true
            },
        ],
        xAxis: {
            name: '',
            show: true,
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#61738C",
                    type: "dashed"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#b3c7c9",
                    fontSize: 12
                },
            },
            axisLine: {
                show: true, //不显示x轴
                lineStyle: {
                    color: "#15588b"
                }
            },
            axisTick: {
                show: false //不显示刻度
            }
        },
        yAxis: [{
            // name: "三方",
            type: 'category',
            inverse: true,
            axisLabel: {
                margin: 10,
                color: '#b3c7c9',
                fontWeight: 400,
                fontSize: 12,
                interval: 0,
                formatter: function (value) {
                    let str = "";
                    let num = 4; //每行显示字数
                    let valLength = value.length; //该项x轴字数
                    let rowNum = Math.ceil(valLength / num); // 行数
                    if (rowNum > 1) {
                        for (let i = 0; i < rowNum; i++) {
                            let temp = "";
                            let start = i * num;
                            let end = start + num;
                            temp = value.substring(start, end) + "";
                            str += temp;
                        }
                        return str;
                    } else {
                        return value;
                    }
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#61738C",
                    type: "dashed"
                }
            },
            axisLine: {
                show: true, //不显示x轴
                lineStyle: {
                    color: "#15588b"
                }
            },
            axisTick: {
                show: false //不显示刻度
            },
            data: dataSource.map((item) => item.name),
        }],
        series: [{
            type: 'bar',
            // showBackground: true,
            barMinWidth: '10',
            backgroundStyle: {
                opacity: 1,
                color: '#1f4365',
            },
            yAxisIndex: 0,
            data: dataSource.map((item) => item.value),
            barWidth: 20,
            // align: left,
            stack: "2",
            itemStyle: {
                normal: {
                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: "#00d5fc",
                    },
                    {
                        offset: 1,
                        color: "#1280eb",
                    },
                    ]),
                },
            },
            markLine: {
                symbol: 'none', //去掉箭头
                data: [{
                    type: 'average',
                    name: '平均数'
                }],
                label: {
                    position: 'start',
                    // formatter:'{c}%',
                    formatter: ({
                        name
                    }) => {
                        return `{a|${'平均数'}}`
                    },
                    align: 'center',
                    rich: {
                        a: {
                            // height: 30,
                            color: '#fff',
                            backgroundColor: "#00a8ff",
                            padding: [6, 8],
                            // margin: [0,0,'-10',0],
                            borderColor: '#7cd1e0',
                            borderWidth: 0,
                            borderRadius: 10
                        },
                    },
                },
                lineStyle: {
                    color: '#00a8ff'
                }
            },
        },
        // {
        //     z:1,
        //     type: 'pictorialBar',
        //     symbolPosition:'end',
        //     symbolRotate:'0',
        //     symbolSize: [10,20],
        //     // color:'rgb(4,128,224)',
        //     data: dataSource.map((item) => item.value),
        //     symbol: 'roundRect',
        //     symbolOffset: ['52%',0],
        //     itemStyle: {
        //         color: 'white',
        //         shadowColor: 'rgba(29,255,252, 0.8)',
        //         shadowBlur: 10,
        //     },
        // },
        {
            type: 'pictorialBar',
            data: dataSource.map((item) => item.value),
            xAxisIndex: 0,
            yAxisIndex: 0,
            zlevel: 99,
            symbol: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAOCAYAAADE84fzAAAAAXNSR0IArs4c6QAAA/ZJREFUOE9t1G2IVFUYB/DnvN6XmXvPvXNn5npnZ3Ze2HVdJKgQCSRsKQqVitqwggKVYCRKCiSiT/M1KgLFtRXaYAVNdkEzKKJIvwgWKNvuGpLprK7Ovrq6r7Mzd+bcGHVXU8/H58PveQ7n+R8Ejzkvd5einqPvbI2ra0x9uSu/wboMABjgOQxwug4Awd7eX0JRzlpk2a+E5+vFPXu2Vh6m0MOFts+njGQM3s4Jurc1qtgGKh8+duTQvtMn+yeBGxxqlUriqSfQjldfyZm6lq3XpWQ4+EcsFEfy+bz/oPd//JOLRsoVna2CftAaYe05i2hJm8+WZ0b79n9zsPevcwOTpmkFL23bbLel0hFFUylgoBiwjyS65CxbxXx+w2qD+3hhMkxQ9bWMwXa3WLh1bYQJzyA4HeEkKchi8dLwr190fXuiXKn669e1Us+x5oUQSyFdx0Sh6kqDqjYzUti+vdq4wV1810UDLGWravFdzybZZlenOKzgcsrASrPNeLNNUVSH5QsXhs/39P94tjR586objU01edFZx4r4hggRyrmCJNQkkH/rynSx0QDBx6MRAPkCYNRp22T9xgTPRnVCQwwvpQXW0jbjTYKghEVBcOmfPT944eCxk7+PT88WPTc+kfKcuZiI1bjKGSFUxRT7iMjL1QofQfDR1XchkNssk7ak47zZD2A2oVOetUk4K0goZVOeFAS5BoG4gYGimn/qj6GBr3r6f6pBUMwkvemE4y7ppoYoJZxQqoKEGiHkyh3c1OCtVIxvLC3LMY1hv82idkuEiYwg4bRNWWPyNSaBeBgDQfV7eN8qvsaOLSoalwqjhKhMpUCgHgTXUOizCTfrBG/emPO3zAXIztjEzBhMz9o0nBPEaLYpSwiCkhYFg0n/z4Hhoa6jP5wav3l7xHOdiaTn3hYiUuFYBgAEU4YlQWgMiHn9zoM++fUt6+/xuRepTt572uPPhAieT1mUZwUx0xZhSYchV0floaGhc91Hj58Zn7k9mog7M02ee8sSYllTaB1jjCQgH9OgNFWfLh3K5/37q/j+ZJjEq6/nBN3dbJJ0TjA1a2MjE1FokyCLVy4N//blge4Ts/NLC+3rctiLeQsR2yg3YCkxwhT5EtEb2lqjVOjoqN1fxZVY3QvRWot+2GLRdTmHqSlB55dmrvftO3igd/D84ISiG/WO5zeF2tNJwXWOKAA0JpaodkMbi5UKhbvwozgANOKfjqF32hz6acZWtRAsHv7+SO/+08d/ngKtyhrxz7S0BW90bvUUhXtSygBzfJ1dGxgrFAqr8GPxRnFLz1gsbWs7s47qWmS5K7/p0Y9rR+E7NelZTTUJddXxSyupfPBv+Q/AX2n/iUkotQAAAABJRU5ErkJggg==',
            symbolRotate: 0,
            symbolSize: [15, 20],
            symbolPosition: 'end',
            symbolOffset: [8, 0],
            itemStyle: {
                color: '#1dfffc',
                shadowColor: 'rgba(29,255,252, 0.8)',
                shadowBlur: 10,
            },
            tooltip: {
                show: false
            },
        },
        ],
    };
    option && myChart.setOption(option)
}

let router = useRouter()
const back = () => {
    router.back();
}
const all_history = ref([])
const getAllHistory = async () => {
    await axios.get(`http://127.0.0.1:8080/auth/api/registrations/history/${localStorage.getItem('cur_pid')}`).then((resp) => {
        console.log('all-history:', resp.data)
        all_history.value = resp.data
        for (let i = 0; i < all_history.value.length; i++) {
            let drugs = []
            for (let j = 0; j < all_history.value[i].drugs.length; j++) {
                drugs.push(all_history.value[i].drugs[j].atc.substring(0, 4))
            }
            let procedures = []
            for (let j = 0; j < all_history.value[i].procedures.length; j++) {
                procedures.push(all_history.value[i].procedures[j].code)
            }
            let conditions = []
            for (let j = 0; j < all_history.value[i].diagnosis.length; j++) {
                conditions.push(all_history.value[i].diagnosis[j].code)
            }
            all_inform.conditions.push(conditions)
            all_inform.drugs.push(drugs)
            all_inform.procedures.push(procedures)
        }
        console.log(all_inform)
    })
}
</script>

<style scoped>
.containera {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #0b143b;
    background-image: url('../../assets/screen/42.gif');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

/* 给文字增加白色发光效果 */
.glow-text {
    user-select: none;
    color: white;
    text-align: center;
    text-shadow: 0 0 4px #87cefa;
    /* 蓝色发光阴影 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.main-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}

.left {
    width: 30%;
    box-sizing: border-box;
    margin-left: 1em;
    height: 86vh;
    background-color: rgba(255, 255, 255, 0.1);
    /* 半透明背景 */
    backdrop-filter: blur(8px);
    /* 毛玻璃效果 */
    border-radius: 5px;
    padding: 1em;
    background-image: url('../../assets/screen/(263).png');
    background-size: 100% 100%;
    /* 背景图填充整个盒子尺寸 */
    background-position: center;
    /* 确保背景图居中 */
    background-repeat: no-repeat;
    /* 避免重复背景 */
}

.right {
    width: 30%;
    box-sizing: border-box;
    margin-right: 1em;
    height: 86vh;
    background-color: rgba(255, 255, 255, 0.1);
    /* 半透明背景 */
    backdrop-filter: blur(8px);
    /* 毛玻璃效果 */
    border-radius: 5px;
    /* padding: 1em; */
}

.heatmap {
    /* margin-left: 0.5em; */

    box-sizing: border-box;
    padding: 0.5em;
    height: 50%;
    width: 100%;
}

.bar {
    background-image: url('../../assets/screen/(100).png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 0.5em;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding: 1em;
    height: 50%;
    width: 100%;
}

.center {
    width: 40%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
