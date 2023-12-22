<script setup lang="ts">
const props = defineProps<{
    src: string,
    events?: Record<string, any[]>;
}>()

function onClick() {
  (window as any).globalEmitter.emit('common:link', props.events['common:link'])
}
</script>

<template>
  <img :src="props.src" class="lc-image" @click="onClick"/>
</template>

<style>
.lc-image {
    width: 100%;
    height: 100%;
    background-color: #eee;
}
</style>