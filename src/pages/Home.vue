<script setup>
import ListPost from '../components/ListPost.vue';
</script>

<template>
    <div id="content">
        <Suspense>
            <ListPost />

            <template #fallback>
                <div>Carregando...</div>
            </template>
        </Suspense>
    </div>
</template>


<style scoped>
#content {
    max-width: 1200px;
    justify-self: center;
}
</style>
