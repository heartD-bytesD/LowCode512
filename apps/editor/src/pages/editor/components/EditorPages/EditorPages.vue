<script setup lang="ts">
import {useProjectStore} from '@/store' 
import './EditorPages.less'

const projectStore = useProjectStore()

function onPageAdd() {
    projectStore.addPage();
}

function onPageClick(index: number) {
    projectStore.setCurrentPageIndex(index);
}
</script>

<template>
    <div class="editor-pages">
        <div
            v-for="(item, index) in projectStore.project.pages"
            :key="index"
            class="page"
            :class="{ active: projectStore.currentPageIndex === index }"
            @click="onPageClick(index)"
        >
            {{ item.name }}
        </div>
        <a-button type="text" class="add" @click="onPageAdd">添加页面</a-button>
    </div>
</template>

<style scoped></style>
