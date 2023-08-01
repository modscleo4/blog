<script setup lang="ts">
import { HTMLAttributes, ref } from 'vue';

const props = defineProps<{
    highlight?: boolean;
}>();
</script>

<template>
    <span class="badge" :class="{'highlight': highlight}">
        <slot></slot>
    </span>
</template>

<style scoped>
span {
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
}

span:hover {
    background-color: #ddd;
}

span.highlight {
    background-color: #8080ff;
    color: white;
}
span.highlight:hover {
    background-color: #a0a0ff;
}

span:deep(a) {
    color: inherit;
    text-decoration: none;
    text-underline-offset: 2px;
}

span:deep(a:hover) {
    text-decoration: underline;
}
</style>
