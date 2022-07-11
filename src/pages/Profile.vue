<script setup>
import { defineProps, ref } from 'vue';

import ListPost from '../components/ListPost.vue';

const props = defineProps({
    username: {
        type: String,
        default: null,
    },
});
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
    max-width: 1200px;
    justify-self: center;
}
</style>
