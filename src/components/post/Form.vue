<script setup lang="ts">
import { ref } from 'vue';
import { usePostsStore } from '../../store';
import { useRouter } from 'vue-router';

import Editor from '../../components/post/Editor.vue';
import Post from '../../util/Post.js';

const postsStore = usePostsStore();
const router = useRouter();

const props = defineProps<{
    post?: Post;
    postId?: string;
}>();

let post = props.post;

if (props.postId) {
    post = await Post.get(props.postId);
}

const title = ref(post ? post.title : '');
const resume = ref(post ? post.resume : '');
const content = ref(post ? post.content : {});
const imageUrl = ref(post ? post.imageUrl : '');

defineExpose({
    title,
    resume,
    content,
    imageUrl,
});

const editorRefs = ref({ input: { } });

async function save() {
    content.value = editorRefs.value.input;

    try {
        const _post = await (post ? Post.update(props.postId!, {
            title: title.value,
            resume: resume.value,
            content: content.value,
            imageUrl: imageUrl.value,
        }) : Post.create({
            title: title.value,
            resume: resume.value,
            content: content.value,
            imageUrl: imageUrl.value,
        }));

        postsStore.addOrUpdatePost(_post);

        router.push('/');
    } catch (e) {
        alert(e);
    }
}
</script>

<template>
    <form action="#" @submit.prevent="save()">
        <div class="row">
            <label for="title" class="form-label">Título</label>
            <input id="title" type="text" class="form-control" required v-model="title">
        </div>

        <div class="row">
            <label for="imageUrl" class="form-label">URL Imagem</label>
            <input id="imageUrl" type="text" class="form-control" v-model="imageUrl">
        </div>

        <div class="row">
            <label for="resume" class="form-label">Resumo</label>
            <textarea id="resume" class="form-control" required style="resize: none;" rows="5" v-model="resume"></textarea>
        </div>

        <div class="row">
            <label for="content" class="form-label">Texto</label>
            <Editor :required="true" inputId="content" :input="post?.content" ref="editorRefs" />
        </div>

        <div class="row">
            <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    height: 100%;
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

input,
textarea {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    font-family: unset;
}

textarea {
    resize: none;
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
