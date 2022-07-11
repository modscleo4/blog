<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

import OAuth from '../util/OAuth.js';

const router = useRouter();

const params = new URL(location.href).searchParams;

async function getUser() {
    try {
        const user = await OAuth.getUserInfo(params.get('code'), params.get('session_state'));
    } catch (e) {
        alert(e);
    }

    router.push('/');
}

getUser();
</script>

<template>
<p style="justify-self: center;">Redirecionando. Aguarde...</p>
</template>

<style scoped>

</style>
