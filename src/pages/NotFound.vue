<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    pathMatch?: string[];
}>();
</script>

<template>
    <section>
        <h1>404</h1>

        <p>Não foi possível encontrar a página <code>/{{ props.pathMatch?.join('/') }}</code>.</p>
    </section>
</template>

<style scoped>
section {
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
