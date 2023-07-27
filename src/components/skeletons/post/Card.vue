<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Skeleton from '../../Skeleton.vue';

const router = useRouter();
</script>

<template>
    <div>
        <div id="card-container">
            <span id="thumbnail" alt=""><Skeleton /></span>
            <div id="card-content">
                <span id="title"><Skeleton /></span>

                <span id="resume"><Skeleton /></span>
            </div>

            <footer>
                <span><Skeleton /></span>
                <span><Skeleton /></span>
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
    width: 320px;
}

#card-content {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

#thumbnail {
    display: block;
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
    width: 75px;
}
</style>
