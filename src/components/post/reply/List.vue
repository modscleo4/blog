<script setup lang="ts">
import { ref } from 'vue';

import ReplyRender from './Render.vue';
import ReplyRenderSkeleton from '../../skeletons/post/reply/Render.vue';
import Reply from '../../../util/Reply.js';

const props = defineProps<{
    class?: string;
    replies: {id: string}[];
}>();

const r = ref<{id: string}[]>(props.replies);

function deleteReply(id: string) {
    r.value = r.value.filter(reply => reply.id !== id);
}
</script>

<template>
    <ul :class="class">
        <li v-for="reply in r" :key="reply.id">
            <Suspense>
                <ReplyRender :replyId="reply.id" @delete="deleteReply" />

                <template #fallback>
                    <ReplyRenderSkeleton :replies="2" />
                </template>
            </Suspense>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

/*ul li {
    position: relative;
}

li::before {
    content: '';
    display: block;
    width: 2px;
    background-color: #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1.25rem;
    cursor: pointer;
}*/
</style>
