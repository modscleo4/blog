<script setup lang="ts">
import { computed, ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { IconArrowUp, IconArrowDown, IconEdit, IconTrash, IconMessage2, IconUser } from '@tabler/icons-vue';
import { useAuthStore } from '../../store';

import Badge from '../Badge.vue';
import PostContent from './Content.vue';
import ReplyList from './reply/List.vue';
import ReplyForm from './reply/Form.vue';
import Post from '../../util/Post.js';
import Reply from '../../util/Reply.js';
import User from '../../util/User.js';
import PostVote from '../../util/PostVote.js';
import PostList from './List.vue';
import { dateToRelative, formatDate, formatThousands } from '../../util/formatter.js';
import { showToast, showErrorToast } from '../../util/toast.js';
import { clamp } from '../../util/math.js';

const props = defineProps<{
    postId: string;
}>();

const authStore = useAuthStore();

const router = useRouter();

const post = await Post.get(props.postId);
const author = await User.get(post.userId);
const replies = ref<{id: string}[]>(post.replies);

const user = computed(() => authStore.user);

const vote = ref<PostVote | null>(await PostVote.get(props.postId));

const upvotes = ref<number>(post.votes['UPVOTE'] ?? 0);
const downvotes = ref<number>(post.votes['DOWNVOTE'] ?? 0);
const votes = computed(() => upvotes.value - downvotes.value);

async function deletePost() {
    if (!confirm(('Tem certeza que deseja excluir este post?'))) {
        return;
    }

    if (await Post.delete(post.id)) {
        router.push('/');
        showToast('Sucesso', 'Post excluído com sucesso.', 'success');
    } else {
        showToast('Erro', 'Não foi possível excluir o post.', 'error');
    }
}

async function doVote(kind: 'UPVOTE' | 'DOWNVOTE') {
    if (!user.value) {
        return;
    }

    try {
        const lastKind = vote.value?.kind;

        if (vote.value?.kind === kind) {
            if (!await PostVote.delete(post.id)) {
                showToast('Erro', 'Não foi possível remover o voto.', 'error');
                return;
            }

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

        const updatedVote = await PostVote.update(post.id, { kind });
        if (updatedVote) {
            vote.value = updatedVote;
        } else {
            showToast('Erro', 'Não foi possível atualizar o voto.', 'error');
            return;
        }

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
        if (e instanceof Error) {
            showErrorToast(e);
        } else {
            showToast('Erro', 'Não foi possível atualizar o voto.', 'error');
        }
    }
}

function addReply(reply: Reply) {
    replies.value.push({ id: reply.id });
}

function onScroll(e: Event) {
    const boundingRect = document.querySelector('article section.content')?.getBoundingClientRect();
    if (!boundingRect) {
        return;
    }

    const percent = -boundingRect.y / boundingRect.height;

    document.querySelector<HTMLDivElement>('div.container')?.style?.setProperty('--percent', `${clamp(percent * 100, 0, 100)}%`);
}

onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <div class="container">
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
                <li>
                    <button type="button" title="Comentários">
                        <a href="#replies">
                            <IconMessage2 color="black" :size="24" stroke-width="1.25" />
                        </a>
                    </button>
                </li>
            </ul>
        </aside>

        <article>
            <h1 class="title">{{ post.title }}</h1>
            <p class="resume">{{ post.resume }}</p>
            <img class="thumbnail" :src="post.imageUrl" alt="" />
            <section class="info">
                <Badge :title="formatDate(post.createdAt)">{{ dateToRelative(post.createdAt) }}</Badge>
                <Badge v-if="post.updatedAt" :title="formatDate(post.updatedAt)">atualizado
                    <b>{{ dateToRelative(post.updatedAt) }}</b>
                </Badge>
            </section>

            <section class="content">
                <PostContent :content="post.content" />
            </section>

            <hr />

            <section class="author">
                <section class="info">
                    <IconUser class="icon" color="black" :size="64" stroke-width="1.25" />
                    <div class="badges">
                        <Badge :highlight="author.id === user?.id"><router-link :to="`/${author.username}`">{{ author.username }}</router-link></Badge>
                        <Badge>{{ author.posts }} posts</Badge>
                    </div>

                    <div class="about">
                        <p>{{ author.name }}</p>
                        <p>{{ author.bio }}</p>
                    </div>
                </section>

                <section class="posts">
                    <PostList :username="author.username" :exclude="author.id === post.userId ? [post.id] : []" />
                </section>
            </section>

            <hr />

            <section id="replies">
                <ReplyForm v-if="user" :postId="post.id" @submit="addReply" />
                <ReplyList :replies="replies" />
            </section>
        </article>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr minmax(400px, 1200px) 1fr;
    gap: 1rem;
    padding: 1rem 0;
    position: relative;
}

.container::before {
    content: '';
    position: fixed;
    margin-top: -1rem;
    left: 0;
    height: 1rem;
    width: var(--percent, 0%);
    background-color: rgba(195, 101, 238, 0.15);
    z-index: 9999;
}

aside {
    justify-self: right;
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

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

article > .title {
    text-align: center;
    font-size: 3.5em;
    padding: 0 2rem;
    margin: 0;
}

article > .resume {
    text-align: center;
    font-size: 1.25em;
    padding: 0 2rem;
    margin: 0;
}

article > .thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

article > section.info {
    display: flex;
    gap: 0.5em;
    align-self: flex-start;
    padding: 0 2rem;
}

article > section.content {
    padding: 0 2rem;
    width: 100%;
    max-width: 100vw;
}

article > .author {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

article .author .info {
    display: grid;
    grid-template-areas: "icon badges" "icon about";
    justify-content: start;
    gap: 0.5rem;
}

article .author .info .icon {
    grid-area: icon;
}

article .author .info .badges {
    grid-area: badges;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

article .author .info .about {
    grid-area: about;
}

article .author .posts {
    position: relative;
}

article #replies {
    width: 100%;
    max-width: 100vw;
}

hr {
    width: 100%;
    color: #ddd;
}

@media (max-width: 1300px) {
    .container {
        grid-template-columns: 100vw;
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
