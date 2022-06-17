<script setup>
import {ref} from 'vue';
import Post from '../util/Post.js';
import {VueShowdown} from 'vue-showdown';

defineProps({
    post: {
        type: Post,
        required: true
    }
});
</script>

<template>
    <div id="post-container">
        <img id="thumbnail" :src="post.image" alt="">
        <h1 id="title">{{ post.title }}</h1>
        <VueShowdown id="md" :markdown="post.body" />
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

#md {
    text-align: justify;
    padding: 0 8px;
}
</style>
