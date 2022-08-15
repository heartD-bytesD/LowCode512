<script setup lang="ts">
import { IElement } from "@lowcode512/shared";
import { useProjectStore } from "@/store";
import "./EditorElements.less";

const projectStore = useProjectStore();

function onElementClick(ele: IElement) {
    projectStore.setCurrentElement(ele);
}
</script>

<template>
    <div class="editor-elements">
        <div
            class="element"
            :class="{
                active: projectStore.currentElementId === item.id,
            }"
            v-for="(item, index) in projectStore.currentPage.elements"
            :key="item.id"
            @click="onElementClick(item)"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<style scoped></style>
