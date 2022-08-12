<template>
    <div class="editor-right">
        <div v-if="projectStore.currentElement === undefined">点击任意元素</div>
        <div v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)">loading</div>
        <div v-else>
            <div v-for="key in Object.keys(editorProps)" :key="key">
                <input
                    v-if="editorProps[key].type === 'string'"
                    :value="editorProps[key].defaultValue"
                    @change="onPropsChange($event, key)"
                />
                <input
                    v-if="editorProps[key].type === 'number'"
                    :value="editorProps[key].defaultValue"
                    @change="onPropsChange($event, key)"
                    type="number"
                />
                <input
                    v-if="editorProps[key].type === 'color'"
                    :value="editorProps[key].defaultValue"
                    @change="onPropsChange($event, key)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getMaterialEditorProps, materialMap } from "@/data";
import { useProjectStore } from "@/store";
import "./EditorRight.less";

const projectStore = useProjectStore();
const editorProps = computed(() => {
    if (!projectStore.currentElement) {
        return {};
    }
    return getMaterialEditorProps(materialMap[projectStore.currentElement.mId]);
});
const elementProps = computed(() => {
    if (!projectStore.currentElement) {
        return {};
    }
    return projectStore.currentElement.props;
});
function onPropsChange(e: Event, key: string) {
    projectStore.changeElementProps({
        [key]: (e.target as HTMLInputElement).value,
    });
}
</script>

<style scoped></style>
