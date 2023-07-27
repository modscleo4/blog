<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IconArrowUp, IconArrowDown, IconEdit, IconTrash } from '@tabler/icons-vue';
import { useAuthStore, usePostsStore } from '../../store';

import PostContent from './Content.vue';
import Post from '../../util/Post.js';
import Vote from '../../util/Vote.js';
import { dateToRelative, formatDate, formatThousands } from '../../util/formatter.js';

const props = defineProps<{
    postId: string;
}>();

const authStore = useAuthStore();
const postsStore = usePostsStore();

const router = useRouter();

const post = await Post.get(props.postId);

const user = computed(() => authStore.user);

const vote = ref<Vote | null>(await Vote.get(props.postId));

const upvotes = ref<number>(post.votes['UPVOTE'] ?? 0);
const downvotes = ref<number>(post.votes['DOWNVOTE'] ?? 0);
const votes = computed(() => upvotes.value - downvotes.value);

async function deletePost() {
    if (!confirm(('Tem certeza que deseja excluir este post?'))) {
        return;
    }

    try {
        await Post.delete(post.id);
        postsStore.deletePost(post.id);
        router.push('/');
    } catch (e) {
        console.error(e);
    }
}

async function doVote(kind: 'UPVOTE' | 'DOWNVOTE') {
    if (!user.value) {
        return;
    }

    try {
        const lastKind = vote.value?.kind;

        if (vote.value?.kind === kind) {
            await Vote.delete(post.id);
            vote.value = null;

            switch (kind) {
                case 'UPVOTE':
                    upvotes.value -= 1;
                    break;

                case 'DOWNVOTE':
                    downvotes.value -= 1;
                    break;
            }

            return;
        }

        vote.value = await Vote.update(post.id, { kind });

        switch (kind) {
            case 'UPVOTE':
                upvotes.value += 1;
                if (lastKind === 'DOWNVOTE') {
                    downvotes.value -= 1;
                }
                break;

            case 'DOWNVOTE':
                downvotes.value += 1;
                if (lastKind === 'UPVOTE') {
                    upvotes.value -= 1;
                }
                break;
        }
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <div id="container">
        <aside>
            <ul>
                <li>
                    <button type="button" title="Upvote" @click="doVote('UPVOTE')" :disabled="!user">
                        <IconArrowUp :color="vote?.kind === 'UPVOTE' ? 'purple' : 'black'" :size="24" stroke-width="1.25" />
                    </button>
                </li>
                <li>{{ formatThousands(votes) }}</li>
                <li>
                    <button type="button" title="Downvote" @click="doVote('DOWNVOTE')" :disabled="!user">
                        <IconArrowDown :color="vote?.kind === 'DOWNVOTE' ? 'purple' : 'black'" :size="24" stroke-width="1.25" />
                    </button>
                </li>
                <li v-if="user && post.userId === user.id">
                    <router-link :to="`/posts/${post.id}/edit`">
                        <button type="button" title="Editar">
                            <IconEdit color="blue" :size="24" stroke-width="1.25" />
                        </button>
                    </router-link>
                </li>
                <li v-if="user && post.userId === user.id">
                    <button type="button" title="Excluir" @click="deletePost();">
                        <IconTrash color="red" :size="24" stroke-width="1.25" />
                    </button>
                </li>
            </ul>
        </aside>

        <article>
            <h1 id="title">{{ post.title }}</h1>
            <p id="resume">{{ post.resume }}</p>
            <img id="thumbnail" :src="post.imageUrl" alt="" />
            <section id="author">
                <span>por <a :href="`/${post.user.username}`">{{ post.user.username }}</a></span>
                <span :title="formatDate(post.createdAt)">{{ dateToRelative(post.createdAt) }}</span>
                <span v-if="post.updatedAt" :title="formatDate(post.updatedAt)">atualizado
                    <b>{{ dateToRelative(post.updatedAt) }}</b></span>
            </section>

            <section id="content">
                <PostContent :content="post.content" />
            </section>
        </article>
    </div>
</template>

<style scoped>
#container {
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

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
}

article #title {
    text-align: center;
    font-size: 3.5em;
    padding: 0 2rem;
    margin: 0;
}

article #resume {
    text-align: center;
    font-size: 1.25em;
    padding: 0 2rem;
    margin: 0;
}

article #thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

article section#author {
    display: flex;
    gap: 0.5em;
    align-self: flex-start;
    padding: 0 2rem;
}

article section#author span {
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
}

article section#author span:hover {
    background-color: #ddd;
}

article #content {
    padding: 0 2rem;
    width: 100%;
    max-width: 100vw;
}

@media (max-width: 1300px) {
    #container {
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
