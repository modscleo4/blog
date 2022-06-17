<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Auth from '../util/Auth.js';

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const remember = ref(false);

async function login() {
    try {
        const user = await Auth.login(email.value, password.value);
        router.push('/');
    } catch (e) {
        alert(e);
    }
}
</script>

<template>
    <div id="content">
        <form action="#" @submit.prevent="login">
            <div class="row mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>

            <div class="row mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>

            <div class="row mb-3">
                <div class="form-check col-md-6">
                    <input type="checkbox" class="form-check-input" id="remember" v-model="remember">
                    <label for="remember" class="form-check-label">Lembrar-me</label>
                </div>
            </div>

            <div class="row">
                <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
#content {
    max-width: 1200px;
    justify-self: center;
    align-self: center;
}

form {
    width: 300px;
}
</style>
