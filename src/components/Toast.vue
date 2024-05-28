<script setup lang="ts">
import { ref } from 'vue';
import { IconAlertTriangle, IconAlertOctagon, IconCheck, IconInfoCircle } from '@tabler/icons-vue';

import { Toast } from '../util/toast.js';

const props = defineProps<{
    toast: Toast;
}>();
</script>

<template>
    <div :class="toast.type" :style="`--time: ${toast.timeout}ms`">
        <IconAlertTriangle v-if="toast.type === 'warning'" :size="32" stroke-width="1.25" />
        <IconAlertOctagon v-else-if="toast.type === 'error'" :size="32" stroke-width="1.25" />
        <IconCheck v-else-if="toast.type === 'success'" :size="32" stroke-width="1.25" />
        <IconInfoCircle v-else-if="toast.type === 'info'" :size="32" stroke-width="1.25" />

        <h1>{{ toast.title }}</h1>
        <p>{{ toast.message }}</p>
    </div>
</template>

<style scoped>
div {
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    position: relative;
    display: grid;
    grid-template-areas: 'icon title' 'icon message';
    grid-template-columns: min-content auto;
    grid-template-rows: min-content min-content;
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

svg {
    grid-area: icon;
    margin: 0.25rem;
}

h1 {
    grid-area: title;
    align-self: center;
    font-size: 1rem;
    margin: 0;
}

p {
    grid-area: message;
    align-self: center;
    font-size: 0.75rem;
    margin: 0;
}
</style>
