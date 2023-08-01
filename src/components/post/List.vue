<script setup lang="ts">
import { computed, ref } from 'vue';

import Post from '../../util/Post.js';
import CardPost from './Card.vue';
import { AppError } from '../../util/error';

const props = defineProps<{
    username?: string,
    exclude?: string[];
    header?: boolean;
    grid?: boolean;
}>();

const posts = (await Post.getAll(props.username)).filter(post => !props.exclude?.includes(post.id));
</script>

<template>
    <header>
        <h1 v-if="header && posts && username">{{ posts.length }} posts de {{ username }}</h1>
    </header>

    <div v-if="posts && posts.length > 0" class="list-container" :class="{'grid': grid}">
        <CardPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else>
        <p>Nenhum post encontrado :(</p>
    </div>
</template>

<style scoped>
header {
    text-align: center;
}

.list-container {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
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
