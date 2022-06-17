<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import { RouterView } from 'vue-router';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Header from './components/Header.vue';
import Auth from './util/Auth.js';

const store = useStore();

Auth.check().then(user => {
    if (user) {
        store.commit('login', user);
    }
}).catch(e => {
    //
});
</script>

<template>
    <Header />
    <router-view></router-view>
</template>

<style>
* {
    box-sizing: border-box;
}

body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
}

body.modal-open {
    overflow: hidden;
}

#app {
    display: grid;
    grid-template-rows: min-content auto;
    justify-content: center;
    min-height: 100vh;
}
</style>
