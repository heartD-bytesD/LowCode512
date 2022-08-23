<script setup lang="ts">
const { title, color, size } = defineProps<{
    title: string;
    color: string;
    size: number;
    bold: boolean;
    italic: boolean;
    backgroundColor: string;
}>();

</script>

<template>
<div
    class="lc-div"
    :style="{
    backgroundColor: backgroundColor,
}">
    <div :style="{
        fontSize: size + 'px',
        color: color,
        fontWeight: bold? 'bold' : 'normal' ,
        fontStyle: italic? 'italic' : 'normal' ,
        }" 
        class="lc-title">
        {{ title }}
    </div>
</div>

</template>
