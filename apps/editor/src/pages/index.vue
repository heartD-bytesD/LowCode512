<template>
    <div>index.vue</div>
    <a-button type="primary" @click="onEditor">Editor</a-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const route = useRouter();

function onEditor() {
    route.push("/editor");
}
</script>

<style>
</style> 
