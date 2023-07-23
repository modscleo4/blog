<script setup lang="ts">
import { ref } from 'vue';

import { PostContent } from '../../util/Post';

const props = defineProps<{
    content: PostContent;
}>();
</script>

<template>
    <div id="content">
        <div v-for="block in props.content?.blocks">
            <p v-if="block.type === 'paragraph'" v-html="block.data.text"></p>

            <h1 v-if="block.type === 'header' && block.data.level === 0">{{ block.data.text }}</h1>
            <h2 v-if="block.type === 'header' && block.data.level === 1">{{ block.data.text }}</h2>
            <h3 v-if="block.type === 'header' && block.data.level === 2">{{ block.data.text }}</h3>
            <h4 v-if="block.type === 'header' && block.data.level === 3">{{ block.data.text }}</h4>
            <h5 v-if="block.type === 'header' && block.data.level === 4">{{ block.data.text }}</h5>
            <h6 v-if="block.type === 'header' && block.data.level === 5">{{ block.data.text }}</h6>

            <code v-if="block.type === 'code'">{{ block.data.code }}</code>
        </div>
    </div>
</template>

<style scoped>
</style>
