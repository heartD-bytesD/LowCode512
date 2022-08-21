<script setup lang="ts">
const props = defineProps<{
    title: string;
    // color: string;
    size: number;
    borderRadius: number;
    events?: Record<string, any[]>;
}>();

function onClick() {
    const link: string = props.events["common:link"][0];
    window.open(link, "_blank");
}
</script>

<template>
    <button
        :style="{
            fontSize: size + 'px',
            // color: color,
            borderRadius: borderRadius + 'px',
        }"
        class="lc-button"
        @click="onClick"
    >
        {{ title }}
    </button>
</template>
