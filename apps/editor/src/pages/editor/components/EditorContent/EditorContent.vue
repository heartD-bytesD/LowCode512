<!-- TODOs -->
<!-- 1. [BUG]组件放大时会超出画布 -->

<template>
    <EditorHeaderVue />
    <div class="editor-content">
        <div class="editor-body">
            <!-- <div class="editor-body-pages">
                <div v-for="(item, index) in projectStore.project.pages" :key="index" class="page"
                    :class="{ active: projectStore.currentPageIndex === index }" @click="onPageClick(index)">
                    {{ item.name }}
                </div>
                <div class="add" @click="onPageAdd">添加页面</div>
            </div> -->


            <!-- <div class="editor-body-elements">
                <div class="element" :class="{
                    active: projectStore.currentElementId === item.id,
                }" v-for="(item, index) in projectStore.currentPage.elements" :key="item.id"
                    @click="onElementClick(item)">
                    {{ item.name }}
                </div>
            </div> -->

            <div class="editor-body-page" ref="pageRef">
                <!-- 添加网格  -->
                <Grid />
                <div v-for="item in projectStore.currentPageElements" :key="item.id" class="element">
                    <VueDragResize @mousedown="projectStore.setCurrentElement(item)"
                        :active="projectStore.currentElement?.id === item.id" @dragging="onDragEnd" @drag-end="onSaveSnapshot"
                        :x="item.style.left || 0" :y="item.style.top || 0" @resizing="onDragEnd" @resize-end="onSaveSnapshot"
                        :width="item.style.width" :height="item.style.height" :rotatable="false" :immediate="true">
                        <component v-if="projectStore.isLoaded(item.mId)" :is="materialMap[item.mId].name"
                            v-bind="item.props"></component>
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
import { getMaterialRenderFun, materialMap } from "@/data";
import VueDragResize from "vue-drag-resize-next";
import app from '@/app'

import "vue-drag-resize-next/lib/style.css";
import "./EditorContent.less";

import Grid from "../Grid/index.vue"
import EditorHeaderVue from "../EditorHeader/EditorHeader.vue";
const projectStore = useProjectStore();
const pageRef = ref<HTMLElement>();
let pageWidth = 0;
let pageHeight = 0;

onMounted(() => {
    if (pageRef.value) {
        pageWidth = pageRef.value.offsetWidth;
        pageHeight = pageRef.value.offsetHeight;
    }
    // Load materials
    const materials = projectStore.project.pages[0].elements.map(item => 
        materialMap[item.mId] // 通过mId得到物料
    )
    Promise.all(Object.values(materials).map(projectStore.load)).then(() => {
            materials.forEach(m => {
                app.component(m.name, getMaterialRenderFun(m))
            })
        });
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
function onSaveSnapshot() {
    console.log("Add snapshot:", projectStore.currentPage)
    projectStore.saveSnapshot()
}

</script>

