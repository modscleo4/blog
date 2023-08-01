<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconArrowUp, IconArrowDown, IconEdit, IconTrash } from '@tabler/icons-vue';

import Badge from '../../Badge.vue';
import ReplyList from './List.vue';
import PostContent from '../Content.vue';
import Reply from '../../../util/Reply.js';
import User from '../../../util/User.js';
import ReplyVote from '../../../util/ReplyVote';
import { useAuthStore } from '../../../store';
import { dateToRelative, formatDate, formatThousands } from '../../../util/formatter.js';

const props = defineProps<{
    replyId: string;
}>();

const emit = defineEmits<{
    (e: 'delete', id: string): void;
}>();

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const reply = await Reply.get(props.replyId);
const author = await User.get(reply.userId);
const vote = ref<ReplyVote | null>(await ReplyVote.get(reply.id));

const upvotes = ref<number>(reply.votes['UPVOTE'] ?? 0);
const downvotes = ref<number>(reply.votes['DOWNVOTE'] ?? 0);
const votes = computed(() => upvotes.value - downvotes.value);

const collapsed = ref<boolean>(false);

async function deleteReply() {
    if (!confirm(('Tem certeza que deseja excluir esta resposta?'))) {
        return;
    }

    try {
        await Reply.delete(reply.id);
        emit('delete', reply.id);
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
            await ReplyVote.delete(reply.id);
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

        vote.value = await ReplyVote.update(reply.id, { kind });

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
    <div class="reply" :class="{'collapsed': collapsed}">
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
            </ul>

            <div class="divisor" @click="collapsed = !collapsed"></div>
        </aside>

        <header>
            <Badge :highlight="author.id === user?.id"><router-link :to="`/${author.username}`">{{ author.username }}</router-link></Badge>
            <Badge v-if="collapsed">{{ formatThousands(votes) }} voto{{ votes !== 1 ? 's' : '' }}</Badge>
            <Badge :title="formatDate(reply.createdAt)">{{ dateToRelative(reply.createdAt) }}</Badge>
            <Badge v-if="reply.updatedAt" :title="formatDate(reply.updatedAt)">atualizado <b>{{ dateToRelative(reply.updatedAt) }}</b></Badge>
            <button v-if="user && reply.userId === user.id" type="button" title="Editar">
                <IconEdit color="blue" :size="24" stroke-width="1.25" />
            </button>
            <button v-if="user && reply.userId === user.id" type="button" title="Excluir">
                <IconTrash color="red" :size="24" stroke-width="1.25" @click="deleteReply()" />
            </button>
        </header>

        <article>
            <PostContent :content="reply.content" />
        </article>

        <ReplyList class="replies" :replies="reply.replies" />
    </div>
</template>

<style scoped>
.reply {
    border-radius: 0.5rem;
    display: grid;
    grid-template-areas: "aside header" "aside article" "aside replies";
    grid-template-columns: 2rem auto;
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

aside ul button,
header button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 50% 50%;
    aspect-ratio: 1 / 1;
}

aside ul button:hover,
header button:hover {
    background-color: #ddd;
}

.reply.collapsed aside ul {
    display: none;
}

aside .divisor {
    width: 2px;
    height: 100%;
    cursor: pointer;
    padding: 0 0.5rem;
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
    align-items: center;
    gap: 0.5em;
    padding: 0 0.75rem;
}

article {
    grid-area: article;
    padding: 0 0.75rem;
    overflow: auto;
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
