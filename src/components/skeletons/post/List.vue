<script setup lang="ts">
import { ref } from 'vue';

import CardPost from './Card.vue';

const props = defineProps<{
    header?: boolean;
    grid?: boolean;
}>();
</script>

<template>
    <header v-if="header">

    </header>

    <div class="list-container" :class="{ 'grid': grid }">
        <CardPost v-for="i in new Array(15)" />
    </div>
</template>

<style scoped>
header {
    text-align: center;
}

.list-container {
    display: flex;
    gap: 1rem;
    padding: 0 0.5rem;
    align-items: start;
    overflow: auto;
}

.list-container.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 320px);
    align-items: start;
    justify-content: center;
}
</style>
