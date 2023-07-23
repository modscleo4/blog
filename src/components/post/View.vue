<script setup lang="ts">
import { ref } from 'vue';
// import { VueShowdown } from 'vue-showdown';

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
        <!-- <VueShowdown id="md" :markdown="post.content" /> -->
    </div>
</template>

<style scoped>
#post-container {
    display: grid;
    grid-template-rows: auto auto;
    overflow: auto;
    padding: 16px 48px;
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

#resume {
    text-align: justify;
    padding: 0 8px;
}

#md {
    text-align: justify;
    padding: 0 8px;
}
</style>
