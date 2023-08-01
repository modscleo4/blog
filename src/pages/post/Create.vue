<script setup lang="ts">
import { ref } from 'vue';

import FormPost from '../../components/post/Form.vue';
import FormPostSkeleton from '../../components/skeletons/post/Form.vue';
</script>

<template>
    <Suspense>
        <FormPost />

        <template #fallback>
            <FormPostSkeleton />
        </template>
    </Suspense>
</template>

<style scoped>
</style>
