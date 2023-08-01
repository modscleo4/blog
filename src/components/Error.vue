<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    error: Error;
}>();
</script>

<template>
    <div>
        <h1>Erro</h1>
        <p>{{ error.message }}</p>
    </div>
</template>

<style scoped>

</style>
