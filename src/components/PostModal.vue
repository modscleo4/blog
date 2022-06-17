<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import Post from '../util/Post.js';
import ModalPage from './ModalPage.vue';
import PostView from './PostView.vue';

const store = useStore();

const user = computed(() => store.state.user);

const props = defineProps({
    post: {
        type: Post,
        required: true,
    }
})

const show = ref(false);

async function deletePost() {
    try {
        await Post.delete(props.post);
        store.commit('deletePost', props.post.id);
    } catch (e) {
        console.error(e);
    }
}

function closePost() {
    show.value = false;
}

defineExpose({
    show
});
</script>

<template>
    <ModalPage :show="show" @close="closePost()">
        <template #header>
            <ul>
                <li>
                    <button class="btn btn-sm btn-outline-info modal-default-button" @click="closePost()">X Fechar</button>
                </li>
                <li v-if="user">
                    <router-link :to="`/posts/${post.id}/edit`"><button class="btn btn-sm btn-outline-primary modal-default-button" @click="closePost()">Editar</button></router-link>
                </li>
                <li v-if="user && post.user_id === user.id">
                    <button class="btn btn-sm btn-outline-danger modal-default-button" @click="deletePost(); closePost()">Excluir</button>
                </li>
            </ul>
        </template>

        <template #body>
            <PostView :post="post" />
        </template>
    </ModalPage>
</template>

<style scoped>
ul {
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
}

ul > li {
    list-style: none;
}
</style>
