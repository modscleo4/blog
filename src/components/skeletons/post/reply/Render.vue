<script setup lang="ts">
import { ref } from 'vue';

import ReplyRenderSkeleton from './Render.vue';

const props = defineProps<{
    replies?: number;
}>();

import Skeleton from '../../../Skeleton.vue';
</script>

<template>
    <div class="reply">
        <aside>
            <ul>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
            </ul>

            <div class="divisor"></div>
        </aside>

        <header>
            <p><Skeleton /></p>
        </header>

        <article>
            <Skeleton />
        </article>

        <ul v-if="replies">
            <li v-for="n in replies"><ReplyRenderSkeleton /></li>
        </ul>
    </div>
</template>

<style scoped>
.reply {
    border-radius: 0.5rem;
    display: grid;
    grid-template-areas: "aside header" "aside article" "aside replies";
    grid-template-columns: min-content auto;
    row-gap: 0.75rem;
    width: 100%;
}

.reply.collapsed {
    max-height: 10rem;
    grid-template-areas: "aside header";
    overflow: hidden;
}

aside {
    grid-area: aside;
    justify-self: center;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
}

aside ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0.25rem;
    padding: 0;
    margin: 0;
    align-items: center;
}

aside ul button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 50% 50%;
    aspect-ratio: 1 / 1;
}

aside ul button:hover {
    background-color: #ddd;
}

.reply.collapsed aside ul {
    display: none;
}

aside .divisor {
    width: 2px;
    height: 100%;
    cursor: pointer;
    padding: 0 0.25rem;
}

aside .divisor::after {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    background-color: #ccc;
}

aside .divisor:hover::after {
    background-color: #aaa;
}

header {
    grid-area: header;
    display: flex;
    gap: 0.5em;
    padding: 0 0.75rem;
}

header span {
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
}

header span:hover {
    background-color: #ddd;
}

header span.highlight {
    background-color: #8080ff;
    color: white;
}

header span.highlight:hover {
    background-color: #a0a0ff;
}

header span a {
    color: inherit;
    text-decoration: none;
    text-underline-offset: 2px;
}

header span a:hover {
    text-decoration: underline;
}

article {
    grid-area: article;
    padding: 0 0.75rem;
}

.reply.collapsed article {
    display: none;
}

.replies {
    grid-area: replies;
}

.reply.collapsed .replies {
    display: none;
}
</style>
