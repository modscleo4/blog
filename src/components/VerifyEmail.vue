<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Auth from '../util/Auth.js';
import { showToast } from '../util/toast.js';

const props = defineProps<{
    token: string;
}>();

const router = useRouter();

const verified = await Auth.verifyEmail(props.token);
if (verified) {
    showToast('Sucesso', 'Email verificado com sucesso', 'success');
    router.push('/');
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="text-2xl font-bold">Verificando email...</div>
    </div>
</template>

<style scoped>
</style>
