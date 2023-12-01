<script setup lang="ts">
import { ref } from 'vue';

import ListPost from '../components/post/List.vue';
import ListPostSkeleton from '../components/skeletons/post/List.vue';

const props = defineProps<{
    username?: string;
}>();
</script>

<template>
    <div class="content">
        <Suspense>
            <ListPost :username="username" :header="true" :grid="true" />

            <template #fallback>
                <ListPostSkeleton :header="true" :author="true" :grid="true" />
            </template>
        </Suspense>
    </div>
</template>


<style scoped>
.content {
    justify-self: center;
    width: 100%;
    padding: 1rem 0;
}
</style>
