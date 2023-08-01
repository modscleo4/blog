<script setup lang="ts">
import { ref } from 'vue';

import Skeleton from '../../Skeleton.vue';
</script>

<template>
    <form action="#">
        <div class="row">
            <label for="title" class="form-label">Título</label>
            <Skeleton />
        </div>

        <div class="row">
            <label for="imageUrl" class="form-label">URL Imagem</label>
            <Skeleton />
        </div>

        <div class="row">
            <label for="resume" class="form-label">Resumo</label>
            <Skeleton />
        </div>

        <div class="row editor">
            <label for="content" class="form-label">Texto</label>
            <Skeleton />
        </div>

        <div class="row">
            <Skeleton />
        </div>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 0;
    max-width: 1200px;
    gap: 0.75rem;
    justify-self: center;
    width: 100%;
}

.row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-height: calc(3rem + 0.25rem);
}

.editor {
    height: calc(400px + 0.25rem);
}
</style>
