<template>
    <div class="wrapper" style="width: 100%;">
        <div class="container">
            <Transition name="slide-fade">
                <div v-if="isshow">
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
                    <div class="item-row">
                        <div class="sub-title">
                            <h3>U3</h3>
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
                </div>
            </Transition>
            <div style="width: 30em;overflow-y: scroll;">
                <div style="height: 100em;width: 100%;">
                    doomy
                </div>
            </div>
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
    height: 100%;
    width: 100%;
    display: flex;
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

.slide-fade-enter-active {
    transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

</style>
