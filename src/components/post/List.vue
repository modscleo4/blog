<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconLayoutGrid, IconLayoutList, IconUser } from '@tabler/icons-vue';

import { useAuthStore } from '../../store.js';
import Post from '../../util/Post.js';
import User from '../../util/User.js';
import Badge from '../Badge.vue';
import CardPost from './Card.vue';
const props = defineProps<{
    username?: string,
    exclude?: string[];
    header?: boolean;
    grid?: boolean;
}>();

const authStore = useAuthStore();

const posts = (await Post.getAll(props.username)).filter(post => !props.exclude?.includes(post.id));
const user = computed(() => authStore.user);

const author = props.username && await User.getByUsername(props.username) || null;

const listMode = ref<string>(props.grid ? 'grid' : 'horizontal');
</script>

<template>
    <header v-if="header">
        <section class="info" v-if="posts && author">
            <IconUser class="icon" color="black" :size="64" stroke-width="1.25" />
            <div class="badges">
                <Badge :highlight="author.id === user?.id">{{ author.username }}</Badge>
                <Badge>{{ posts.length }} posts</Badge>
            </div>

            <div class="about">
                <p>{{ author.name }}</p>
                <p>{{ author.bio }}</p>
            </div>
        </section>

        <div class="layout-container" v-if="grid">
            <button type="button" :disabled="listMode == 'grid'" @click="listMode = 'grid'">
                <IconLayoutGrid color="black" :size="24" stroke-width="1.25" />
            </button>
            <button type="button" :disabled="listMode == 'list'" @click="listMode = 'list'">
                <IconLayoutList color="black" :size="24" stroke-width="1.25" />
            </button>
        </div>
    </header>

    <div v-if="posts && posts.length > 0" class="list-container" :class="{ 'grid': listMode == 'grid', 'list': listMode == 'list' }">
        <CardPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else>
        <p>Nenhum post encontrado :(</p>
    </div>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

header h1 {
    text-align: center;
}

header .layout-container {
    align-self: end;
}

header .info {
    display: grid;
    grid-template-areas: "icon badges" "icon about";
    justify-content: start;
    gap: 0.5rem;
}

header .info .icon {
    grid-area: icon;
}

header .info .badges {
    grid-area: badges;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

header .info .about {
    grid-area: about;
}

.list-container {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    align-items: start;
    overflow: auto;
}

.list-container.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 320px);
    align-items: start;
    justify-content: center;
}

.list-container.list {
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    padding: 0 1rem;
    margin: 0 auto;
}

.list-container.list:deep(.card-container) {
    max-width: unset;
    width: 100%;
}
</style>
