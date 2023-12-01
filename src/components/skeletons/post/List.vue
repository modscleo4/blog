<script setup lang="ts">
import { ref } from 'vue';

import CardPost from './Card.vue';
import Skeleton from '../../Skeleton.vue';

const props = defineProps<{
    header?: boolean;
    author?: boolean;
    grid?: boolean;
}>();

const listMode = ref<string>(props.grid ? 'grid' : 'horizontal');
</script>

<template>
    <header v-if="header">
        <section class="info" v-if="author">
            <Skeleton class="icon" />

            <div class="badges">
                <Skeleton />
                <Skeleton />
            </div>

            <div class="about">
                <Skeleton />
                <Skeleton />
            </div>
        </section>

        <div class="layout-container" v-if="grid">
            <Skeleton />
            <Skeleton />
        </div>
    </header>

    <div class="list-container" :class="{ 'grid': listMode == 'grid', 'list': listMode == 'list' }">
        <CardPost v-for="i in new Array(15)" />
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
    grid-template-columns: max-content auto;
    justify-content: stretch;
    gap: 1rem;
    width: 100%;
}

header .info .icon {
    grid-area: icon;
    width: 64px;
    height: 64px;
    border-radius: 50% 50%;
}

header .info .badges {
    grid-area: badges;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

header .info .badges span {
    width: 75px;
    height: 1.5em;
}

header .info .about {
    grid-area: about;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

header .info .about span {
    width: 100%;
    height: 1.5em;
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
