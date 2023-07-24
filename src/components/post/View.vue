<script setup lang="ts">
import { ref } from 'vue';

import PostContent from './Content.vue';
import Post from '../../util/Post.js';

const props = defineProps<{
    post: Post;
}>();
</script>

<template>
    <div id="post-container">
        <img id="thumbnail" :src="post.imageUrl" alt="">
        <h1 id="title">{{ post.title }}</h1>
        <h4 id="resume">{{ post.resume }}</h4>
        <PostContent :content="post.content" />
    </div>
</template>

<style scoped>
#post-container {
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
    padding: 16px 48px;
}

#thumbnail {
    width: 90%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    justify-self: center;
    margin: auto;
}

#title {
    text-align: center;
    font-size: 3.5em;
}

#resume {
    text-align: justify;
    font-size: 1.75em;
}
</style>
