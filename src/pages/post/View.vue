<script setup lang="ts">
import { ref } from 'vue';

import PostRender from '../../components/post/Render.vue';
import Post from '../../util/Post';

const props = defineProps<{
    id: string;
}>();
</script>

<template>
    <Suspense>
        <PostRender :postId="props.id" />

        <template #fallback>
            <div>Carregando...</div>
        </template>
    </Suspense>
</template>

<style scoped>
</style>
