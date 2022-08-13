<template>
    <div class="editor-content">
        <div class="editor-content-header">
            <button @click="onSave">保存</button>
            <button @click="onPreview">预览</button>
        </div>
        <div class="editor-body">
            <div class="editor-body-pages">
                <div
                    v-for="(item, index) in projectStore.project.pages"
                    :key="index"
                    class="page"
                    :class="{ active: projectStore.currentPageIndex === index }"
                    @click="onPageClick(index)"
                >
                    {{ item.name }}
                </div>
                <div class="add" @click="onPageAdd">添加页面</div>
            </div>
            <div class="editor-body-elements">
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
            <div class="editor-body-page" ref="pageRef">
                <div
                    v-for="item in projectStore.currentPageElements"
                    :key="item.id"
                >
                    <VueDragResize
                        @click="projectStore.setCurrentElement(item)"
                        :active="projectStore.currentElement?.id === item.id"
                        @drag-end="onDragEnd"
                        :x="item.style.left || 0"
                        :y="item.style.top || 0"
                        @resize-end="onDragEnd"
                        :width="item.style.width"
                        :height="item.style.height"
                        :rotatable="false"
                    >
                        <component
                            v-if="projectStore.isLoaded(item.mId)"
                            :is="materialMap[item.mId].name"
                            v-bind="item.props"
                        ></component>
                        <div v-else>loading</div>
                    </VueDragResize>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProjectStore } from "@/store";
import { materialMap } from "@/data";
import { IElement } from "@lowcode512/shared";
import VueDragResize from "vue-drag-resize-next";
import "vue-drag-resize-next/lib/style.css";
import { useRouter } from "vue-router";
import "./EditorContent.less";

const projectStore = useProjectStore();
const route = useRouter();
const pageRef = ref<HTMLElement>();
let pageWidth = 0;
let pageHeight = 0;

onMounted(() => {
    if (pageRef.value) {
        pageWidth = pageRef.value.offsetWidth;
        pageHeight = pageRef.value.offsetHeight;
    }
});

function onDragEnd(ev: any) {
    const { x, y, ...reset } = ev;
    const left = Math.min(Math.max(x, 0), pageWidth - reset.width);
    const top = Math.min(Math.max(y, 0), pageHeight - reset.height);
    projectStore.changeElementStyle({
        left,
        top,
        ...reset,
    });
}

function onSave() {
    projectStore.saveProject();
}

function onPreview() {
    route.push("/preview");
}

function onPageAdd() {
    projectStore.addPage();
}

function onPageClick(index: number) {
    projectStore.setCurrentPageIndex(index);
}

function onElementClick(ele: IElement) {
    projectStore.setCurrentElement(ele);
}
</script>

<style scoped></style>
