<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './store';
import { RouterView } from 'vue-router';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Header from './components/Header.vue';
import Error from './components/Error.vue';
import Auth from './util/Auth.js';

Auth.check();
</script>

<template>
    <Header />
    <router-view></router-view>
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.ce-block__content,
.ce-toolbar__content {
    max-width: unset;
}

html,
body {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
    font-size: 16px;
    scroll-behavior: smooth;
}

body.modal-open {
    overflow: hidden;
}

p {
    margin: 0;
    margin-bottom: 0.5rem;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    margin: 0;
    margin-bottom: 1rem;
}

h1 {
    font-size: 2.5em;
}

h2 {
    font-size: 2em;
}

h3 {
    font-size: 1.75em;
}

h4 {
    font-size: 1.5em;
}

h5 {
    font-size: 1.25em;
}

h6 {
    font-size: 1em;
}

#app {
    display: grid;
    grid-template-rows: min-content auto;
    min-height: 100vh;
}
</style>
