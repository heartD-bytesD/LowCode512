<script setup lang="ts">
import { nanoid } from "nanoid";

const id = nanoid();
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
        <input :group="group" type="radio" :name="id" />
        <label
            :for="id"
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
