<script setup lang="ts">
import { ref } from 'vue';

import FormPost from '../../components/post/Form.vue';
import FormPostSkeleton from '../../components/skeletons/post/Form.vue';

const props = defineProps<{
    id: string;
}>();
</script>

<template>
    <Suspense>
        <FormPost :postId="props.id" />

        <template #fallback>
            <FormPostSkeleton />
        </template>
    </Suspense>
</template>

<style scoped>
</style>
