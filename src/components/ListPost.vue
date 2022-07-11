<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import Post from '../util/Post.js';
import CardPost from './CardPost.vue';

const props = defineProps({
    username: {
        type: String,
        default: null,
    },
    postId: {
        type: Number,
        default: null,
    },
});

const store = useStore();

if (store.state.posts.length === 0) {
    store.commit('updatePosts', await Post.getAll());
}

/**
 * @type {import('vue').ComputedRef<Post[]>}
 */
const posts = computed(() => store.state.posts);
</script>

<template>
    <div v-if="posts && posts.length > 0" id="list-container">
        <CardPost v-for="post in username ? posts.filter(post => post.user.username === username) : posts" :key="post.id" :post="post" :open="post.id === postId" />
    </div>
    <div v-else>
        <p>Nenhum post encontrado :(</p>
    </div>
</template>

<style scoped>
#list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px 0;
}
</style>
