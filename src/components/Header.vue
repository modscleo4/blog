<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store';
import Auth from '../util/Auth.js';

const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => authStore.user);

async function logout() {
    await Auth.logout();
    router.push('/');
}
</script>

<template>
    <header class="navbar">
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li v-if="user">
                <router-link to="/posts/create">Criar Post</router-link>
            </li>
        </ul>

        <ul v-if="!user">
            <li>
                <router-link to="/login">Login</router-link>
            </li>
        </ul>

        <div class="dropdown" v-else>
            <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuUser"
                    data-bs-toggle="dropdown" aria-expanded="false">
                <span class="name">{{ user.name }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuUser">
                <li>
                    <router-link class="dropdown-item" :to="`/${user.username}`">Perfil</router-link>
                </li>
                <li><a href="#" class="dropdown-item" @click="logout()">Sair</a></li>
            </ul>
        </div>
    </header>
</template>

<style scoped>
header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    padding: 0.5em 1.25em;
    position: sticky;
    top: 0;
    background: #f7f7f7;
    border-bottom: 1px solid #ddd;
}

header > ul {
    display: flex;
    gap: 16px;
    padding: 0;
    margin: 0;
}

header > ul > li {
    list-style: none;
}
</style>
