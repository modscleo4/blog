<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Post from '../../util/Post.js';
import { dateToRelative, dateFormatted } from '../../util/date.js';

const props = defineProps<{
    post: Post,
}>();

const router = useRouter();
</script>

<template>
    <div @click="router.push(`/posts/${post.title.toLowerCase().replace(/[ \.]+/g, '-')}/${post.id}`)">
        <div id="card-container">
            <img id="thumbnail" :src="post.imageUrl" alt="">
            <div id="card-content">
                <h1 id="title">{{ post.title }}</h1>

                <p id="resume">{{ post.resume }}</p>
            </div>

            <footer>
                <span>{{ post.user.username }}</span>
                <span :title="dateFormatted(post.createdAt)">{{ dateToRelative(post.createdAt) }}</span>
            </footer>
        </div>
    </div>
</template>

<style scoped>
#card-container {
    display: block;
    border-radius: 4px;
    box-shadow: 1px 1px 6px 0 hsl(0deg 0% 0% / 15%);
    background-color: #fafafa;
    max-width: 320px;
    transition: box-shadow 200ms ease-in-out;
    overflow: hidden; /* Prevent <img> from cutting off border-radius */
    cursor: pointer;
    min-height: 375px;
}

#card-container:hover {
    box-shadow: 1px 1px 6px 0 hsl(0deg 0% 0% / 25%);
}

#card-content {
    padding: 8px;
}

#thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

#title {
    text-align: center;
    font-size: 24px;
}

#resume {
    font-size: 16px;
    text-align: justify;
}

footer {
    display: flex;
    gap: 0.5em;
    padding: 0.5em;
}

footer span {
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
}

footer span:hover {
    background-color: #ddd;
}
</style>
