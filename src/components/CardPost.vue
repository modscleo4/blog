<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Post from '../util/Post.js';
import PostModal from './PostModal.vue';

const props = defineProps({
    post: {
        type: Post,
        required: true
    },
    open: {
        type: Boolean,
        default: false
    },
});

const router = useRouter();

const modalRefs = ref({ show: false });

onMounted(() => {
    if (props.open) {
        modalRefs.value.show = true;
    }
});
</script>

<template>
    <div @click="modalRefs.show = true; router.push(`/posts/${post.user.username}/${post.id}/${post.title.toLowerCase().replace(/[ \.]+/g, '-')}`)">
        <div id="card-container">
            <img id="thumbnail" :src="post.image" alt="">
            <div id="card-content">
                <h1 id="title">{{ post.title }}</h1>

                <p id="resume">{{ post.resume }}</p>
            </div>
        </div>

        <Teleport to="body">
            <PostModal :post="post" ref="modalRefs" />
        </Teleport>
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
</style>
