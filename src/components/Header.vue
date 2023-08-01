<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store';

import { IconHome, IconPencil, IconLogin, IconLogout, IconUser, IconUserCircle } from '@tabler/icons-vue';

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
                <router-link to="/"><IconHome color="purple" :size="24" stroke-width="1.25" /> Home</router-link>
            </li>
            <li v-if="user">
                <router-link to="/posts/create"><IconPencil color="blue" :size="24" stroke-width="1.25" /> Criar Post</router-link>
            </li>
        </ul>

        <ul v-if="!user">
            <li>
                <router-link to="/login"><IconLogin style="transform: rotateY(180deg);" color="blue" :size="24" stroke-width="1.25" /> Login</router-link>
            </li>
        </ul>

        <section v-else class="dropdown">
            <button type="button">
                <IconUserCircle color="black" :size="24" stroke-width="1.25" /> <span class="name">{{ user.name }}</span>
            </button>

            <ul>
                <li>
                    <router-link :to="`/${user.username}`">Perfil <IconUser color="black" :size="24" stroke-width="1.25" /></router-link>
                </li>
                <li><a href="#" @click="logout()">Sair <IconLogout color="red" :size="24" stroke-width="1.25" /></a></li>
            </ul>
        </section>
    </header>
</template>

<style scoped>
header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em;
    position: sticky;
    top: 0;
    background: #f7f7f7;
    border-bottom: 1px solid #ddd;
    z-index: 100;
    min-height: 3rem;
}

header > ul {
    display: flex;
    gap: 16px;
    padding: 0;
    margin: 0;
    align-items: center;
}

header > ul > li {
    list-style: none;
}

header > ul > li > a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    text-underline-offset: 0.25rem;
    color: #333;
}

header > ul > li > a:hover {
    text-decoration: underline;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    padding: 0.375rem;
    border-radius: 2rem;
}

.dropdown > button:hover {
    background-color: #ddd;
}

.dropdown > button:focus {
    box-shadow: 0 0 0 2px #ddd;
}

.dropdown > ul {
    display: none;
    list-style: none;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    width: 100%;
}

.dropdown > ul > li {
    padding: 0.5rem 0;
}

.dropdown > ul > li:not(:last-child) {
    border-bottom: 1px solid #ddd;
}

.dropdown > ul > li > a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: right;
    text-decoration: none;
    text-underline-offset: 0.25rem;
    color: #333;
}

.dropdown > ul > li > a:hover {
    text-decoration: underline;
}

.dropdown:focus-within > ul {
    display: block;
}
</style>
