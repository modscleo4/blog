<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, usePostsStore } from '../../store';

import Post from '../../util/Post.js';
import PostView from './View.vue';

const props = defineProps<{
    postId: string;
}>();

const authStore = useAuthStore();
const postsStore = usePostsStore();

const router = useRouter();

const post = await Post.get(props.postId);

const user = computed(() => authStore.user);

async function deletePost() {
    try {
        await Post.delete(post.id);
        postsStore.deletePost(post.id);
        router.push('/');
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <div id="header">
        <ul>
            <li v-if="user && post.userId === user.id">
                <router-link :to="`/posts/${post.id}/edit`">
                    <button class="btn btn-sm btn-outline-primary modal-default-button">Editar</button>
                </router-link>
            </li>
            <li v-if="user && post.userId === user.id">
                <button class="btn btn-sm btn-outline-danger modal-default-button" @click="deletePost();">Excluir</button>
            </li>
        </ul>
    </div>

    <div id="body">
        <PostView :post="post" />
    </div>
</template>

<style scoped>
#header ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 8px;
}

#thumbnail {
    width: 90%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    justify-self: center;
}

#title {
    text-align: center;
}

#body {
    display: flex;
    justify-content: center;
}
</style>
