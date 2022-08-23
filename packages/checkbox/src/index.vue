<script setup lang="ts">
import {nanoid} from 'nanoid';

const id = nanoid();
const props = defineProps<{
    title: string;
    color: string;
    size: number;
    group: string;
    checkAll: boolean;
    events?: Record<string, any[]>;
}>();
</script>

<template>
    <div class="lc-checkbox">
        <input type="checkbox" :name="id">
        <label :for="id">{{ props.title }}</label>
    </div>
</template>
