<script setup lang="ts">
import { ref } from 'vue';

import ListPost from '../components/post/List.vue';

const props = defineProps<{
    username?: string;
}>();
</script>

<template>
    <div id="content">
        <Suspense>
            <ListPost :username="username" />

            <template #fallback>
                <div>Carregando...</div>
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
