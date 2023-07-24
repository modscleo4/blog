<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePostsStore } from '../../store';

import Post from '../../util/Post.js';
import CardPost from './Card.vue';

const props = defineProps<{
    username?: string,
    postId?: string;
}>();

const postsStore = usePostsStore();

if (postsStore.posts.length === 0) {
    postsStore.updatePosts(await Post.getAll());
}

const posts = computed(() => postsStore.posts);
const filteredPosts = computed(() => props.username ? posts.value.filter(post => post.user.username === props.username) : posts.value);
</script>

<template>
    <header>
        <h1 v-if="username">{{ filteredPosts.length }} posts from {{ username }}</h1>
    </header>

    <div v-if="posts && posts.length > 0" id="list-container">
        <CardPost v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>
    <div v-else>
        <p>Nenhum post encontrado :(</p>
    </div>
</template>

<style scoped>
header {
    text-align: center;
}

#list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px 0;
}
</style>
