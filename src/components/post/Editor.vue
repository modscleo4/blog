<script setup>
import {ref, computed, watch} from 'vue';
import {marked} from 'marked';

const props = defineProps({
    input: {
        type: String,
        default: '',
    },
    inputId: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const input = ref(props.input);
const output = computed(() => marked(input.value));

defineExpose({
    input
});
</script>

<template>
    <div class="editor">
        <textarea :id="inputId" class="input form-control" :required="required" v-model="input" autofocus></textarea>
        <span class="separator"></span>
        <div class="output" v-html="output"></div>
    </div>
</template>

<style scoped>

.editor {
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    gap: 8px;
    padding: 0;
}

.input,
.output {
    overflow: auto;
    box-sizing: border-box;
    min-height: 400px;
    max-height: 400px;
}

.input {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
}

.separator {
    border-right: 1px solid #ccc;
}
</style>
