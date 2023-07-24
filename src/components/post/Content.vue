<script setup lang="ts">
import { ref } from 'vue';

import { PostContent } from '../../util/Post';

const props = defineProps<{
    content: PostContent;
}>();
</script>

<template>
    <div id="content">
        <template v-for="block in props.content?.blocks">
            <p v-if="block.type === 'paragraph'" v-html="block.data.text"></p>

            <h1 v-else-if="block.type === 'header' && block.data.level === 1">{{ block.data.text }}</h1>
            <h2 v-else-if="block.type === 'header' && block.data.level === 2">{{ block.data.text }}</h2>
            <h3 v-else-if="block.type === 'header' && block.data.level === 3">{{ block.data.text }}</h3>
            <h4 v-else-if="block.type === 'header' && block.data.level === 4">{{ block.data.text }}</h4>
            <h5 v-else-if="block.type === 'header' && block.data.level === 5">{{ block.data.text }}</h5>
            <h6 v-else-if="block.type === 'header' && block.data.level === 6">{{ block.data.text }}</h6>

            <pre v-else-if="block.type === 'code'"><code>{{ block.data.code }}</code></pre>

            <hr v-else-if="block.type === 'delimiter'" />

            <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'">
                <li v-for="item in block.data.items">{{ item }}</li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'">
                <li v-for="item in block.data.items">{{ item }}</li>
            </ol>

            <div v-else-if="block.type === 'checklist'">
                <ul style="list-style: none; margin: 0; padding: 0;">
                    <li v-for="item in block.data.items">
                        <input type="checkbox" :checked="item.checked" disabled /> <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>

            <blockquote v-else-if="block.type === 'quote'">
                <p>{{ block.data.text }}</p>
                <footer>{{ block.data.caption }}</footer>
            </blockquote>

            <div v-else-if="block.type === 'warning'">
                <p>{{ block.data.title }}</p>
                <p>{{ block.data.message }}</p>
            </div>

            <table v-else-if="block.type === 'table'" style="border: 1px solid #aaa;">
                <template v-if="block.data.withHeadings">
                    <thead>
                        <tr style="border: 1px solid #aaa;">
                            <th v-for="item in block.data.content[0]" style="border: 1px solid #aaa;">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in block.data.content.slice(1)" style="border: 1px solid #aaa;">
                            <td v-for="item in row" style="border: 1px solid #aaa;">{{ item }}</td>
                        </tr>
                    </tbody>
                </template>

                <template v-else>
                    <tbody>
                        <tr v-for="row in block.data.content" style="border: 1px solid #aaa;">
                            <td v-for="item in row" style="border: 1px solid #aaa;">{{ item }}</td>
                        </tr>
                    </tbody>
                </template>
            </table>
        </template>
    </div>
</template>

<style scoped>
</style>
