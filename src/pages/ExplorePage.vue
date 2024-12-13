<template>
    <div class="wrapper" style="width: 100%;">
        <div class="container">
            <Transition name="slide-fade">
                <div v-if="isshow">
                    <el-carousel trigger="click" height="150px" arrow="never" indicator-position="inside">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                    <div style="border: 1px solid black;height: 20em;">
                        <!-- TODO: -->
                        诊断量统计
                    </div>
                    <div class="main-title">
                        <h1>Explore</h1>
                        <p>do what you want</p>
                    </div>
                    <!-- TODO: func cards implement -->
                    <div class="item-row">
                        <div class="sub-title">
                            <h3>U1</h3>
                        </div>
                        <div class="itemline">
                            <div class="item">
                            </div>
                            <div class="item">
                            </div>
                            <div class="item">
                            </div>
                            <div class="item">
                            </div>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="sub-title">
                            <h3>U2</h3>
                        </div>
                        <div class="itemline">
                            <div class="item">
                            </div>
                            <div class="item">
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
onMounted(() => {
    isshow.value = true;
})
</script>

<style scoped>
.container {
    height: calc(100vh - 3.2em);
    width: 100%;
    display: flex;
    overflow-y: scroll;
    justify-content: space-between;
}

.main-title {
    width: 100%;
    height: 9em;
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
    /* background-color: black; */
    box-sizing: border-box;
    padding: 0 2em;
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
    width: 12em;
    margin-right: 1.5em;
    background-color: aquamarine;
}

.item:hover {
    scale: 1.1;
    transition: 0.2s;
}
</style>
