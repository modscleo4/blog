<script setup lang="ts">
import { ref } from 'vue';

import VerifyEmail from '../components/VerifyEmail.vue';

const token = ref<string>(new URLSearchParams(location.search).get('token') ?? '');
</script>

<template>
    <div class="content">
        <Suspense>
            <VerifyEmail :token="token" />

            <template #fallback>
                <p>Verificando email...</p>
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

p {
    text-align: center;
}
</style>
