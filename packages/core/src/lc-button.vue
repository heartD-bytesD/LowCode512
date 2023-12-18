<script setup lang="ts">
const props = defineProps<{
    title: string;
    color: string;
    size: number;
    borderRadius: number;
    backgroundColor: string;
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
            borderRadius: borderRadius + 'px',
            '--bgc': backgroundColor,
            '--color': color,
        }"
        class="lc-button"
        @click="onClick"
    >
        {{ title }}
    </button>
</template>

<style scoped>
.lc-button {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: var(--color);
    text-overflow: ellipsis;
    text-align: center;
    border: 1px solid #ddd;
    background-color: var(--bgc);
    transition: all 0.1s linear;
}

button:hover {
    filter: brightness(85%);
}

button:active {
    transform: translateY(2px);
}
</style>