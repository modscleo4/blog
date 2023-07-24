<script setup lang="ts">
import { ref } from 'vue';

import ContentParagraph from './Content.Paragraph.vue';
import { PostContent } from '../../util/Post';

const props = defineProps<{
    content: PostContent;
}>();
</script>

<template>
    <div id="content">
        <template v-for="block in props.content?.blocks">
            <p v-if="block.type === 'paragraph'"><ContentParagraph :value="block.data.text" /></p>

            <h1 v-else-if="block.type === 'header' && block.data.level === 1"><ContentParagraph :value="block.data.text" /></h1>
            <h2 v-else-if="block.type === 'header' && block.data.level === 2"><ContentParagraph :value="block.data.text" /></h2>
            <h3 v-else-if="block.type === 'header' && block.data.level === 3"><ContentParagraph :value="block.data.text" /></h3>
            <h4 v-else-if="block.type === 'header' && block.data.level === 4"><ContentParagraph :value="block.data.text" /></h4>
            <h5 v-else-if="block.type === 'header' && block.data.level === 5"><ContentParagraph :value="block.data.text" /></h5>
            <h6 v-else-if="block.type === 'header' && block.data.level === 6"><ContentParagraph :value="block.data.text" /></h6>

            <pre v-else-if="block.type === 'code'"><code>{{ block.data.code }}</code></pre>

            <hr v-else-if="block.type === 'delimiter'" />

            <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'">
                <li v-for="item in block.data.items"><ContentParagraph :value="item" /></li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'">
                <li v-for="item in block.data.items"><ContentParagraph :value="item" /></li>
            </ol>

            <div v-else-if="block.type === 'checklist'">
                <ul style="list-style: none; margin: 0; padding: 0;">
                    <li v-for="item in block.data.items">
                        <input type="checkbox" :checked="item.checked" disabled /> <span><ContentParagraph :value="item.text" /></span>
                    </li>
                </ul>
            </div>

            <blockquote v-else-if="block.type === 'quote'">
                <p><ContentParagraph :value="block.data.text" /></p>
                <footer>{{ block.data.caption }}</footer>
            </blockquote>

            <div v-else-if="block.type === 'warning'">
                <p>{{ block.data.title }}</p>
                <p><ContentParagraph :value="block.data.message" /></p>
            </div>

            <table v-else-if="block.type === 'table'">
                <template v-if="block.data.withHeadings">
                    <thead>
                        <tr>
                            <th v-for="item in block.data.content[0]"><ContentParagraph :value="item" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in block.data.content.slice(1)">
                            <td v-for="item in row"><ContentParagraph :value="item" /></td>
                        </tr>
                    </tbody>
                </template>

                <template v-else>
                    <tbody>
                        <tr v-for="row in block.data.content">
                            <td v-for="item in row"><ContentParagraph :value="item" /></td>
                        </tr>
                    </tbody>
                </template>
            </table>
        </template>
    </div>
</template>

<style scoped>


code.inline-code {
    background: #ccc;
    padding: 4px;
    border-radius: 4px;
}

pre {
    background: #ccc;
    padding: 4px;
    border-radius: 4px;
}

table, th, td {
    border: 1px solid #aaa;
}

table td,
table th {
    padding: 4px;
}
</style>
