<script setup lang="ts">
import { nanoid } from "nanoid";

const id = nanoid();
const props = defineProps<{
    title: string;
    color: string;
    size: number;
    group: string;
    events?: Record<string, any[]>;
}>();
</script>

<template>
    <div class="lc-slider">
        <a-slider :default-value="50" :style="{ width: '200px' }" />
    </div>
</template>
