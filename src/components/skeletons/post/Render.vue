<script setup lang="ts">
import { ref } from 'vue';

import Skeleton from '../../Skeleton.vue';
</script>

<template>
    <div class="container">
        <aside>
            <ul>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
            </ul>
        </aside>

        <article>
            <span class="title"><Skeleton /></span>
            <span class="resume"><Skeleton /></span>
            <span class="thumbnail"><Skeleton /></span>
            <section class="author">
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </section>
            <span class="content"><Skeleton /></span>
        </article>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr minmax(400px, 1200px) 1fr;
    gap: 1rem;
    padding: 1rem 0;
}

aside {
    justify-self: right;
}

aside ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 8px;
    padding: 0;
    margin: 0;
    align-items: center;
}

aside ul li {
    width: 24px;
    height: 24px;
}

section {
    display: flex;
    justify-content: center;
}

article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
}

article .title {
    text-align: center;
    font-size: 3.5em;
    padding: 0 2rem;
    width: 100%;
    font-weight: 500;
}

article .resume {
    text-align: center;
    font-size: 1.25em;
    padding: 0 2rem;
    width: 100%;
}

article .thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    width: 100%;
}

article section.author {
    display: flex;
    gap: 0.5em;
    align-self: flex-start;
    padding: 0 2rem;
}

article section.author span {
    padding: 4px;
    border-radius: 4px;
    width: 100px;
}

article .content {
    padding: 0 2rem;
    width: 100%;
    max-width: 100vw;
    width: 100%;
    height: 400px;
}

@media (max-width: 1300px) {
    .container {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    aside {
        justify-self: left;
    }

    aside ul {
        flex-direction: row;
    }
}
</style>
