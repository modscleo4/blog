<script setup lang="ts">
import { ref } from 'vue';

import Editor from '../Editor.vue';
import Reply from '../../../util/Reply.js';
import { PostContent } from '../../../util/content';

const props = defineProps<{
    postId: string;
    replyId?: string;
}>();

const emit = defineEmits<{
    (e: 'submit', value: Reply): void;
}>();

let reply: Reply | null = null;
if (props.replyId) {
    reply = await Reply.get(props.replyId);
}

const content = ref<PostContent | null>(reply ? reply.content : {});

async function submit() {
    try {
        const _reply = await(reply ? Reply.update(props.replyId!, {
            content: content.value!,
        }) : Reply.create({
            postId: props.postId,
            content: content.value!,
        }));

        content.value = null;

        emit('submit', _reply);
    } catch (e) {
        alert(e);
    }
}
</script>

<template>
    <form action="#" @submit.prevent="submit()">
        <div class="row">
            <Editor v-model="content" />
        </div>

        <div class="row">
            <button type="submit" class="btn btn-primary">{{ reply ? 'Salvar' : 'Comentar' }}</button>
        </div>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    max-width: 1200px;
    gap: 0.75rem;
    justify-self: center;
    width: 100%;
}

.row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-height: calc(3rem + 0.25rem);
}

button[type="submit"] {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #0069d9;
}
</style>
