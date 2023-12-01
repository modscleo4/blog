<script setup lang="ts">
import { ref } from 'vue';

import PostRender from '../../components/post/Render.vue';
import PostRenderSkeleton from '../../components/skeletons/post/Render.vue';
import Post from '../../util/Post.js';

const props = defineProps<{
    id: string;
    title: string;
}>();
</script>

<template>
    <Suspense>
        <PostRender :postId="props.id" />

        <template #fallback>
            <PostRenderSkeleton />
        </template>
    </Suspense>
</template>

<style scoped>
</style>
