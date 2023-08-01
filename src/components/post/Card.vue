<script setup lang="ts">
import { ref } from 'vue';

import Post from '../../util/Post.js';
import { dateToRelative, formatDate } from '../../util/formatter.js';

const props = defineProps<{
    post: Post,
}>();
</script>

<template>
    <router-link class="card-container" :to="`/posts/${post.id}/${post.title.toLowerCase().replace(/[ \.]+/g, '-')}`">
        <img class="thumbnail" :src="post.imageUrl" alt="" />
        <div class="card-content">
            <h1 class="title">{{ post.title }}</h1>

            <p class="resume">{{ post.resume }}</p>
        </div>

        <footer>
            <span :title="formatDate(post.createdAt)">{{ dateToRelative(post.createdAt) }}</span>
        </footer>
    </router-link>
</template>

<style scoped>
.card-container {
    display: block;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 6px 0 hsl(0deg 0% 0% / 15%);
    background-color: #fafafa;
    min-width: 300px;
    max-width: 320px;
    transition: box-shadow 200ms ease-in-out;
    overflow: hidden; /* Prevent <img> from cutting off border-radius */
    cursor: pointer;
    min-height: 375px;
    text-decoration: none;
    color: inherit;
    flex: 0 0 100%;
}

.card-container:hover {
    box-shadow: 1px 1px 6px 0 hsl(0deg 0% 0% / 25%);
}

.card-content {
    padding: 8px;
}

.thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.title {
    font-size: 24px;
    text-align: center;
    font-weight: 500;
}

.resume {
    font-size: 16px;
    text-align: justify;
}

footer {
    display: flex;
    gap: 0.5em;
    padding: 0.5em;
}

footer span {
    padding: 0.25rem;
    border-radius: 0.25rem;
    background-color: #eee;
}

footer span:hover {
    background-color: #ddd;
}
</style>
