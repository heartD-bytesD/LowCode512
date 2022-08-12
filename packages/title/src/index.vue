<script setup lang="ts">
const { title, color, size } = defineProps<{
    title: string;
    color: string;
    size: number;
}>();
</script>

<template>
    <p :style="'font-size: ' + size + 'px; color: ' + color" class="lc-title">
        {{ title }}
    </p>
</template>
