<script setup lang="ts">

const props = defineProps<{
    title: string;
    color: string;
    size: number;
    bold: boolean;
    italic: boolean;
    backgroundColor: string;
    group: string;
    events?: Record<string, any[]>;
}>();
</script>

<template>
    <div class="lc-radio">
        <input type="radio" :name="group" />
        <label
            :for="group"
            :style="{
                fontSize: size + 'px',
                color: color,
                backgroundColor: backgroundColor,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
            }"
            >{{ props.title }}</label
        >
    </div>
</template>
