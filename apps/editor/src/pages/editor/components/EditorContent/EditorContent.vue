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
                <Grid @click.native="onClickAir" />
                <div
                    v-for="item in projectStore.currentPageElements"
                    :key="item.id"
                    class="element"
                >
                    <!-- 虚线框 VueDragResize-->
                    <VueDragResize
                        @mousedown="projectStore.setCurrentElement(item)"
                        :active="projectStore.currentElement?.id === item.id"
                        @dragging="onDrag"
                        @drag-end="onSaveSnapshot"
                        :x="item.style.left || 0"
                        :y="item.style.top || 0"
                        @resizing="onDrag"
                        @resize-end="onSaveSnapshot"
                        :width="item.style.width"
                        :height="item.style.height"
                        :rotatable="false"
                        :immediate="true"
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
import { getMaterialRenderFun, materialMap } from "@/data";
import VueDragResize from "vue-drag-resize-next";
import app from "@/app";

import "vue-drag-resize-next/lib/style.css";
// 虚线框样式
import "./DargResize.less";
import "./EditorContent.less";

import Grid from "../Grid/index.vue";
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
    const materials = [];
    const loaded = [];
    projectStore.project.pages.map((page) => {
        page.elements.map(
            (item) => {
                if (loaded.includes(item.mId)) {
                    return;
                }
                loaded.push(item.mId);
                materials.push(materialMap[item.mId]);
            } // 通过mId得到物料
        );
    });
    Promise.all(Object.values(materials).map(projectStore.load)).then(() => {
        materials.forEach((m) => {
            app.component(m.name, getMaterialRenderFun(m));
        });
    });
});

function onDrag(ev: any) {
    let { x, y, ...reset } = ev;
    const _left = projectStore.currentElement.style.left;
    const _top = projectStore.currentElement.style.top;
    if (x === 0 && _left && _left !== 0) {
        x = _left;
    }
    if (y === 0 && _top && _top !== 0) {
        y = _top;
    }
    const left = Math.min(Math.max(x, 0), pageWidth - reset.width);
    const top = Math.min(Math.max(y, 0), pageHeight - reset.height);
    projectStore.changeElementStyle({
        left,
        top,
        ...reset,
    });
}
function onSaveSnapshot() {
    projectStore.saveSnapshot();
}

function onClickAir() {
    projectStore.currentElementId = undefined;
}
</script>
