<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Editor from '../../components/post/Editor.vue';
import Post from '../../util/Post.js';

const store = useStore();
const router = useRouter();

const props = defineProps({
    post: {
        type: Post,
        default: null,
    },
    postId: {
        type: Number,
        default: null,
    }
});

let post = props.post;

if (props.postId) {
    post = await Post.get(props.postId);
}

const title = ref(post ? post.title : '');
const resume = ref(post ? post.resume : '');
const body = ref(post ? post.body : '');
const image = ref(post ? post.image : '');

defineExpose({
    title,
    resume,
    body,
    image,
});

const editorRefs = ref({input: ''});

async function save() {
    body.value = editorRefs.value.input;

    try {
        const _post = post ? await Post.update(new Post({
            id: props.postId,
            title: title.value,
            resume: resume.value,
            body: body.value,
            image: image.value,
        })) : await Post.create(new Post({
            title: title.value,
            resume: resume.value,
            body: body.value,
            image: image.value,
        }));

        store.commit('updatePost', _post);

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
            <input id="title" type="text" class="form-control" v-model="title">
        </div>

        <div class="row">
            <label for="image" class="form-label">URL Imagem</label>
            <input id="image" type="text" class="form-control" v-model="image">
        </div>

        <div class="row">
            <label for="resume" class="form-label">Resumo</label>
            <textarea id="resume" class="form-control" style="resize: none;" rows="5" v-model="resume"></textarea>
        </div>

        <div class="row">
            <label for="body" class="form-label">Texto</label>
            <Editor :required="true" inputId="body" :input="body" ref="editorRefs" />
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
    padding: 16px;
    max-width: 1200px;
    gap: 12px;
    justify-self: center;
    width: 100%;
}
</style>
