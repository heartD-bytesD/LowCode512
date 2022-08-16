<script setup lang="ts">
import { useProjectStore } from "@/store";
import { useRouter } from "vue-router";
const projectStore = useProjectStore();
const route = useRouter();
import "./EditorHeader.less"

function onSave() {
    projectStore.saveProject();
}

function onPreview() {
    route.push("/preview");
}

function onReset() {
    projectStore.resetProject();
}


function onUndo() {
    console.log("Undo")
    projectStore.undo()
}

function onRedo() {
    console.log("Redo")
    projectStore.redo()
}

</script>


<template>
    <div class="editor-content-header">
        <a-button type="outline" @click="onUndo">后退</a-button>
        <a-button type="outline" @click="onRedo">前进</a-button>
        <a-button type="outline" @click="onSave">保存</a-button>
        <a-button type="outline" @click="onPreview">预览</a-button>
        <a-button type="outline" @click="onReset">重置</a-button>
    </div>
</template>
