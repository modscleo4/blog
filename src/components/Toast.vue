<script setup lang="ts">
import { ref } from 'vue';

import { Toast } from '../util/toast.js';

const props = defineProps<{
    toast: Toast;
}>();
</script>

<template>
    <div :class="toast.type" :style="`--time: ${toast.timeout}ms`">
        <h1>{{ toast.title }}</h1>
        <p>{{ toast.message }}</p>
    </div>
</template>

<style scoped>
div {
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
    animation: fade var(--time, 0s) linear;
}

div::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0.25rem;
    background: rgba(0, 0, 0, 0.25);
    animation: progress var(--time, 0s) linear;
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    95% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes progress {
    0% {
        width: 0;
    }

    95% {
        width: 95%;
        background: rgba(0, 0, 0, 0.25);
    }

    100% {
        width: 100%;
        background: rgba(0, 0, 0, 0);
    }
}

div.success {
    background-color: #4caf50;
    color: #fff;
}

div.error {
    background-color: #f44336;
    color: #fff;
}

div.info {
    background-color: #2196f3;
    color: #fff;
}

div.warning {
    background-color: #ff9800;
    color: #fff;
}

div:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
}

h1 {
    font-size: 1rem;
    margin: 0;
}

p {
    font-size: 0.75rem;
    margin: 0;
}
</style>
