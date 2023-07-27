<script setup lang="ts">
import { computed, ref } from 'vue';

import CardPost from './Card.vue';
</script>

<template>
    <header>

    </header>

    <div id="list-container">
        <CardPost v-for="i in new Array(15)" />
    </div>
</template>

<style scoped>
header {
    text-align: center;
}

#list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px 0;
}
</style>
