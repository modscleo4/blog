<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import EditorJS, { OutputData } from '@editorjs/editorjs';

import EditorJSHeader from '@editorjs/header';
import EditorJSList from '@editorjs/list';
import EditorJSParagraph from '@editorjs/paragraph';
import EditorJSCode from '@editorjs/code';
import EditorJSQuote from '@editorjs/quote';
import EditorJSWarning from '@editorjs/warning';
import EditorJSDelimiter from '@editorjs/delimiter';
import EditorJSChecklist from '@editorjs/checklist';
import EditorJSImage from '@editorjs/image';
import EditorJSLink from '@editorjs/link';
import EditorJSTable from '@editorjs/table';
import EditorJSMarker from '@editorjs/marker';
import EditorJSInlineCode from '@editorjs/inline-code';
import EditorJSUnderline from '@editorjs/underline';

import { PostContent } from '../../util/Post';

const props = defineProps<{
    input?: PostContent;
    required: boolean;
}>();

const input = ref(props.input);
// const output = computed(() => marked(input.value));

defineExpose({
    input
});

const editor = new EditorJS({
    holder: 'editor',
    tools: {
        header: {
            class: EditorJSHeader,
            inlineToolbar: ['link'],
        },
        list: {
            class: EditorJSList,
            inlineToolbar: true,
        },
        code: {
            class: EditorJSCode,
        },
        paragraph: {
            class: EditorJSParagraph,
            inlineToolbar: true,
        },
        quote: {
            class: EditorJSQuote,
            inlineToolbar: true,
        },
        warning: {
            class: EditorJSWarning,
        },
        delimiter: {
            class: EditorJSDelimiter,
        },
        checklist: {
            class: EditorJSChecklist,
        },
        /*image: {
            class: EditorJSImage,
            config: {
                endpoints: {
                    byFile: 'http://localhost:3000/api/upload',
                    byUrl: 'http://localhost:3000/api/upload',
                },
            },
        },*/
        table: {
            class: EditorJSTable,
        },
        marker: {
            class: EditorJSMarker,
        },
        inlineCode: {
            class: EditorJSInlineCode,
            inlineToolbar: true,
        },
        underline: {
            class: EditorJSUnderline,
            inlineToolbar: true,
        },
    },
    data: props.input as OutputData,
    onChange: () => {
        editor.save().then((output) => {
            input.value = output as PostContent;
        });
    },
});
</script>

<template>
    <div id="editor">

    </div>
</template>

<style scoped>
#editor {
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
</style>
