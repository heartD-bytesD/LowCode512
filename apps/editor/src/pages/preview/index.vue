<template>
    <div class="page">
        <div v-if="loading">loading...</div>
        <div v-else v-for="item in pages[0].elements" :key="item.id" :style="{
            position: 'absolute',
            left: item.style.left + 'px',
            top: item.style.top + 'px',
            width: item.style.width + 'px',
            height: item.style.height + 'px',
        }">
            <component :is="materialMap[item.mId].name" v-bind="item.props"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IProject } from "@lowcode512/shared";
import { materialMap } from "@/data";
import { useMaterial } from "./material";
import "./index.less";

const { loading, pages } = useMaterial();

const project: IProject = JSON.parse(localStorage.getItem("__project") || "{}");
console.log(project);
</script>

<style scoped>
</style>
