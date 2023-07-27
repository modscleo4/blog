<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
    <span class="skel">&nbsp;</span>
</template>

<style scoped>
@keyframes skeleton {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.skel {
    user-select: none;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #ddd;
}

.skel::after {
    position: absolute;
    inset: 0;
    animation: skeleton 3s infinite;
    background-image: linear-gradient(90deg, #ddd 0px, #eee 40px, #ddd 80px);
    transform: translateX(-100%);
    content: '';
}
</style>
