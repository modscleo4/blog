<script setup lang="ts">
import { ref } from 'vue';

import PostContent from './Content.vue';
import Post from '../../util/Post.js';
import { dateToRelative, dateFormatted } from '../../util/date.js';

const props = defineProps<{
    post: Post;
}>();
</script>

<template>
    <article>
        <h1 id="title">{{ post.title }}</h1>
        <p id="resume">{{ post.resume }}</p>
        <img id="thumbnail" :src="post.imageUrl" alt="">
        <section id="author">
            <span>{{ post.user.username }}</span>
            <span :title="dateFormatted(post.createdAt)">{{ dateToRelative(post.createdAt) }}</span>
            <span v-if="post.updatedAt" :title="dateFormatted(post.updatedAt)">atualizado {{ dateToRelative(post.updatedAt) }}</span>
        </section>
        <PostContent :content="post.content" />
    </article>
</template>

<style scoped>
article {
    min-width: 500px;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
}

#title {
    text-align: center;
    font-size: 3.5em;
    padding: 0 3rem;
}

#resume {
    text-align: center;
    font-size: 1.25em;
    padding: 0 3rem;
}

#thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    justify-self: center;
    margin: auto;
}

section#author {
    display: flex;
    gap: 0.5em;
    align-self: flex-start;
}

section#author span {
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
}

section#author span:hover {
    background-color: #ddd;
}

#content {
    padding: 0 3rem;
    width: 100%;
    max-width: 100vw;
}
</style>
