<template>
    <div class="material-block">
    {{title}}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import './MaterialBlock.less'
interface IMaterialBlock {
    title: string;

}
const {title}  = defineProps<IMaterialBlock>()
</script>

<style scoped>

</style>