<script setup lang="ts">
import { ref } from 'vue';

import ContentParagraph from './Content.Paragraph.vue';
import { PostContent } from '../../util/Post';

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
            <pre><code>{{ block.data.code }}</code></pre>
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
.code {
    display: block;
    background: #ccc;
    border-radius: 0.25rem;
    margin: 0;
    margin-bottom: 0.5rem;
    overflow: hidden;
}

.code header {
    background: #bbb;
    padding: 0.125rem;
}

.code pre {
    margin: 0;
    padding: 0.25rem;
    overflow: auto;
}

pre code {
    font-family: 'Source Code Pro', monospace;
}

blockquote {
    border-left: 4px solid #ccc;
    padding-left: 8px;
    margin: 0;
    margin-bottom: 0.5rem;
}

blockquote footer {
    font-size: 0.75em;
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
}

table,
th,
td {
    border: 1px solid #aaa;
    border-collapse: collapse;
}

table thead {
    border-bottom: 2px solid;
    border-bottom-color: inherit;
}

table td,
table th {
    padding: 4px;
}
</style>
