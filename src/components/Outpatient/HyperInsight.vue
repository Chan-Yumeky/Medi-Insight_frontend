<template>
    <div>
        <Suspense>
            <template #default>
                <AsyncModelViewer />
            </template>
            <template #fallback>
                <div>加载中...</div>
            </template>
        </Suspense>
        <HeartModel></HeartModel>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import HeartModel from './HeartModel.vue';
const AsyncModelViewer = defineAsyncComponent(() =>
    import('@/components/Outpatient/HeartModel.vue')
);
</script>

<style>
</style>
