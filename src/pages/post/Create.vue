<script setup>
import { ref } from 'vue';

import FormPost from '../../components/post/FormPost.vue';

const post = ref({});
</script>

<template>
    <Suspense>
        <FormPost ref="post" />

        <template #fallback>
            <div>Carregando...</div>
        </template>
    </Suspense>
</template>

<style scoped>

</style>
