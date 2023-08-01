<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { IconLogin } from '@tabler/icons-vue';

import Auth from '../util/Auth.js';
import OAuth from '../util/OAuth.js';

const router = useRouter();

const email = ref('');
const password = ref('');
const remember = ref(false);

async function login() {
    try {
        const user = await Auth.login(email.value, password.value, remember.value);
        router.replace('/');
    } catch (e) {
        alert(e);
    }
}

async function loginKeycloak() {
    const url = await OAuth.getAuthURL();
    location.href = url;
}
</script>

<template>
    <div class="content">
        <form action="#" @submit.prevent="login">
            <div class="row">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required v-model="email">
            </div>

            <div class="row">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" required v-model="password">
            </div>

            <div class="row">
                <div class="form-check col-md-6">
                    <input type="checkbox" class="form-check-input" id="remember" v-model="remember">
                    <label for="remember" class="form-check-label">Lembrar-me</label>
                </div>
            </div>

            <div class="row">
                <button type="button" class="btn btn-secondary" @click="loginKeycloak()">Entrar com Keycloak</button>
            </div>

            <div class="row">
                <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    justify-self: center;
    gap: 0.75rem;
    max-width: 350px;
    width: 100%;
}

.row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

input,
textarea {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    font-family: unset;
}

textarea {
    resize: none;
}

button[type="button"] {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #74797e;
    color: #fff;
    cursor: pointer;
}

button[type="button"]:hover {
    background-color: #5f6368;
}

button[type="submit"] {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #0069d9;
}
</style>
