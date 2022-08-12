<script setup lang="ts">
const {src} = defineProps<{
    src: string,
}>()
</script>

<template>
  <img :src="src" class="lc-image"/>
</template>