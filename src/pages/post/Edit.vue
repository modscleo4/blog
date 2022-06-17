<script setup>
import { ref } from 'vue';

import FormPost from '../../components/post/FormPost.vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
});

const post = ref({});
</script>

<template>
    <Suspense>
        <FormPost :postId="parseInt(props.id)" ref="post" />

        <template #fallback>
            <div>Carregando...</div>
        </template>
    </Suspense>
</template>

<style scoped>

</style>
