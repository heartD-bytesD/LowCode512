<script setup lang="ts">
import {nanoid} from 'nanoid';

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
    <div class="lc-radio">
        <input type="radio" :name="id">
        <label :for="id">{{ props.title }}</label>
    </div>
</template>
