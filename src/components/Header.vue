<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store';

import { IconHome, IconPencil, IconLogin, IconLogout, IconUser, IconUserCircle, IconBell } from '@tabler/icons-vue';

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
    <nav>
        <ul>
            <li>
                <router-link to="/" active-class="active"><IconHome color="purple" :size="24" stroke-width="1.25" /> Home</router-link>
            </li>
            <li v-if="user">
                <router-link to="/posts/create" active-class="active"><IconPencil color="blue" :size="24" stroke-width="1.25" /> Criar Post</router-link>
            </li>
        </ul>

        <ul v-if="!user">
            <li>
                <router-link to="/login" active-class="active"><IconLogin style="transform: rotateY(180deg);" color="blue" :size="24" stroke-width="1.25" /> Login</router-link>
            </li>
        </ul>

        <ul v-else class="button-container">
            <li>
                <section class="dropdown">
                    <button type="button">
                        <IconBell color="black" :size="24" stroke-width="1.25" />
                    </button>

                    <ul>
                        <li><a href="#">Nenhuma notificação.</a></li>
                    </ul>
                </section>
            </li>

            <li>
                <section class="dropdown">
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
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
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

nav > ul {
    display: flex;
    gap: 0.75rem;
    padding: 0;
    margin: 0;
    align-items: center;
}

nav > ul > li {
    list-style: none;
}

nav > ul > li > a {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    text-underline-offset: 0.25rem;
    color: #333;
}

nav > ul > li > a:hover,
nav > ul > li > a.active {
    text-decoration: underline;
}

nav > ul > li button {
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

nav > ul > li button:hover {
    background-color: #ddd;
}

nav > ul > li button:focus {
    box-shadow: 0 0 0 2px #ddd;
}

.dropdown {
    position: relative;
    display: inline-block;
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
    min-width: 100%;
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
