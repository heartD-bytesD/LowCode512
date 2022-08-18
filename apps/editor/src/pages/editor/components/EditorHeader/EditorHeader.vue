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
    projectStore.undo()
}

function onRedo() {
    projectStore.redo()
}

function onCopy() {
    projectStore.copyElement();
}

function onPaste() {
    projectStore.pasteElement();
}

function onRemove() {
    projectStore.removeElement();
}

function onCut() {
    projectStore.cutElement();
}

</script>


<template>
    <div class="editor-content-header">
        <a-button type="outline" @click="onCopy">复制</a-button>
        <a-button type="outline" @click="onPaste">粘贴</a-button>
        <a-button type="outline" @click="onCut">剪切</a-button>
        <a-button type="outline" @click="onRemove" status='danger'>删除</a-button>
        <a-button type="outline" @click="onUndo">后退</a-button>
        <a-button type="outline" @click="onRedo">前进</a-button>
        <a-button type="outline" @click="onSave">保存</a-button>
        <a-button type="outline" @click="onPreview">预览</a-button>
        <a-button type="outline" @click="onReset">重置</a-button>
    </div>
</template>
