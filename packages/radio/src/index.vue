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
        <label
            :for="group"
            :style="{
                fontSize: size + 'px',
                backgroundColor: backgroundColor,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                color: color,
            }"
            ><input type="radio" :name="group" />
            <span>{{ props.title }}</span>
        </label>
    </div>
</template>
