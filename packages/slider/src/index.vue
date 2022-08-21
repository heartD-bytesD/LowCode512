<script setup lang="ts">

const { title, color, size, value } = defineProps<{
    title: string;
    color: string;
    size: number;
    value: number;
}>();

</script>

<template>
    <div class="lc-slider">
        <input
            type="range"
            min="1"
            max="100"
            :value="value"
            class="slider"
            id="myRange"
        />
    </div>
</template>
