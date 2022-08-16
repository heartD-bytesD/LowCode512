<template>
    <a-button type="text" class="material-block">
     <span >{{title}}</span>
    </a-button>
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
