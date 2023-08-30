<script setup lang="ts">
import { computed, ref } from 'vue';

import ContentParagraph from './Content.Paragraph.vue'
import { htmlToStruct, ParagraphData } from '../../util/paragraph';

const props = defineProps<{
    value?: string;
    data?: ParagraphData[];
}>();

const content = computed(() => {
    return (props.value ? htmlToStruct(props.value) : props.data) ?? [];
});
</script>

<template>
    <template v-for="el in content">
        <br v-if="el.type === 'linebreak'" />
        <span v-else-if="el.type === 'text'">{{ el.data.text }}</span>
        <b v-else-if="el.type === 'bold'"><ContentParagraph :data="el.data" /></b>
        <i v-else-if="el.type === 'italic'"><ContentParagraph :data="el.data" /></i>
        <u v-else-if="el.type === 'underline'"><ContentParagraph :data="el.data" /></u>
        <s v-else-if="el.type === 'strikethrough'"><ContentParagraph :data="el.data" /></s>
        <a v-else-if="el.type === 'link'" :href="el.href"><ContentParagraph :data="el.data" /></a>
        <code v-else-if="el.type === 'code'"><ContentParagraph :data="el.data" /></code>
        <mark v-else-if="el.type === 'mark'"><ContentParagraph :data="el.data" /></mark>
    </template>
</template>

<style scoped>
code {
    background: #ccc;
    padding: 2px;
    border-radius: 4px;
    font-weight: normal;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.9em;
}
</style>
