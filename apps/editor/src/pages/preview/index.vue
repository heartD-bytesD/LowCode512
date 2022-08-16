<template>
    <div class="page">
        <div v-if="loading">loading...</div>
        <div
            v-else
            v-for="item in page.elements"
            :key="item.id"
            :style="{
                position: 'absolute',
                left: item.style.left + 'px',
                top: item.style.top + 'px',
                width: item.style.width + 'px',
                height: item.style.height + 'px',
            }"
        >
            <component
                :is="materialMap[item.mId].name"
                v-bind="item.props"
            ></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { materialMap } from "@/data";
import "./index.less";
import {useProjectStore} from "@/store";

const project = useProjectStore()
const page = project.currentPage
</script>

<style scoped></style>
