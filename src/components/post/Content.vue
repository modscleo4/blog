<script setup lang="ts">
import { ref } from 'vue';

import ContentParagraph from './Content.Paragraph.vue';
import { PostContent } from '../../util/content.js';

const props = defineProps<{
    content: PostContent;
}>();
</script>

<template>
    <template v-for="block in props.content?.blocks">
        <p v-if="block.type === 'paragraph'">
            <ContentParagraph :value="block.data.text" />
        </p>

        <h1 v-else-if="block.type === 'header' && block.data.level === 1">
            <ContentParagraph :value="block.data.text" />
        </h1>
        <h2 v-else-if="block.type === 'header' && block.data.level === 2">
            <ContentParagraph :value="block.data.text" />
        </h2>
        <h3 v-else-if="block.type === 'header' && block.data.level === 3">
            <ContentParagraph :value="block.data.text" />
        </h3>
        <h4 v-else-if="block.type === 'header' && block.data.level === 4">
            <ContentParagraph :value="block.data.text" />
        </h4>
        <h5 v-else-if="block.type === 'header' && block.data.level === 5">
            <ContentParagraph :value="block.data.text" />
        </h5>
        <h6 v-else-if="block.type === 'header' && block.data.level === 6">
            <ContentParagraph :value="block.data.text" />
        </h6>

        <div v-else-if="block.type === 'code'" class="code">
            <header v-if="block.data.language">{{ block.data.language }}</header>
            <pre><code v-for="code in block.data.code.split('\n')">{{ code }}
</code></pre>
        </div>

        <hr v-else-if="block.type === 'delimiter'" />

        <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'">
            <li v-for="item in block.data.items">
                <ContentParagraph :value="item" />
            </li>
        </ul>

        <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'">
            <li v-for="item in block.data.items">
                <ContentParagraph :value="item" />
            </li>
        </ol>

        <ul v-else-if="block.type === 'checklist'" style="list-style: none; padding: 0;">
            <li v-for="item in block.data.items">
                <input type="checkbox" :checked="item.checked" disabled />
                <span>
                    <ContentParagraph :value="item.text" />
                </span>
            </li>
        </ul>

        <blockquote v-else-if="block.type === 'quote'">
            <p>
                <ContentParagraph :value="block.data.text" />
            </p>
            <footer v-if="block.data.caption">{{ block.data.caption }}</footer>
        </blockquote>

        <div v-else-if="block.type === 'warning'">
            <p>{{ block.data.title }}</p>
            <p>
                <ContentParagraph :value="block.data.message" />
            </p>
        </div>

        <table v-else-if="block.type === 'table'">
            <template v-if="block.data.withHeadings">
                <thead>
                    <tr>
                        <th v-for="item in block.data.content[0]">
                            <ContentParagraph :value="item" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in block.data.content.slice(1)">
                        <td v-for="item in row">
                            <ContentParagraph :value="item" />
                        </td>
                    </tr>
                </tbody>
            </template>

            <template v-else>
                <tbody>
                    <tr v-for="row in block.data.content">
                        <td v-for="item in row">
                            <ContentParagraph :value="item" />
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
    </template>
</template>

<style scoped>
p {
    margin: 0;
    margin-bottom: 1rem;
}

.code {
    display: block;
    background: #ccc;
    border-radius: 0.25rem;
    margin: 0;
    margin-bottom: 1rem;
    overflow: hidden;
    font-family: 'Source Code Pro', monospace;
}

.code header {
    background: #bbb;
    padding: 0.125rem;
    font-weight: 400;
    user-select: none;
}

.code pre {
    margin: 0;
    padding: 0.25rem;
    overflow: auto;
    counter-reset: line;
}

.code pre code {
    font-weight: 300;
}

.code pre code::before {
    counter-increment: line;
    content: counter(line);
    display: inline-block;
    border-right: 1px solid #bbb;
    padding: 0 0.5em;
    margin-right: 0.5em;
    color: #888;
    user-select: none;
    min-width: 2.5rem;
    text-align: right;
}

blockquote {
    border-left: 4px solid #ccc;
    padding-left: 8px;
    margin: 0;
    margin-bottom: 1rem;
}

blockquote footer {
    font-size: 0.75em;
}

hr {
    color: #ddd;
}

ul,
ol {
    margin: 0;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    border: 1px solid #ccc;
}

table thead {
    border-bottom: 2px solid #ccc;
}

table td,
table th {
    padding: 0.5rem;
}

table tbody tr:nth-child(odd) {
    /* background: rgba(0, 0, 0, 0.05); */
}

table tbody tr:nth-child(even) {

}
</style>
