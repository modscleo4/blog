<script setup lang="ts">
import { ref } from 'vue';

import ListPost from '../components/post/List.vue';
import ListPostSkeleton from '../components/skeletons/post/List.vue';
</script>

<template>
    <div id="content">
        <Suspense>
            <ListPost />

            <template #fallback>
                <ListPostSkeleton />
            </template>
        </Suspense>
    </div>
</template>


<style scoped>
#content {
    /* max-width: 1200px; */
    justify-self: center;
}
</style>
