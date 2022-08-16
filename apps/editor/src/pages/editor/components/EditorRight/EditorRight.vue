<template>
    <div class="editor-right">
        <div v-if="projectStore.currentElement === undefined">
            <p>页面名称</p>
            <input
                :value="projectStore.currentPage.name"
                @input="onPageNameChange($event)"
            />
            <!-- TODO: 防抖 -->
        </div>
        <div
            v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)"
        >
            loading
        </div>
        <div v-else>
            <div v-for="key in Object.keys(editorProps)" :key="key">
                <p v-if="editorProps[key].display" class="display">
                    {{ editorProps[key].display }}
                </p>
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
            <div>
                <p class="display">
                    自定义事件
                </p>
                <select
                    :value="eventStore.currentType"
                    @change="e => eventStore.onTypeChange((e.target as HTMLSelectElement).value)"
                >
                    <option
                        v-for="item in eventStore.editorEvents"
                        :key="item.type"
                    >
                        {{ item.type }}
                    </option>
                </select>
                <select>
                    <option
                        v-for="item in eventStore.currentEvents"
                        :key="item.name"
                    >
                        {{ item.name }}
                    </option>
                </select>
                <div v-if="eventStore.currentEventArgs">
                    <div
                        v-for="(item, index) in eventStore.currentEventArgs"
                        :key="index"
                    >
                        <input
                            v-if="item.type === 'string'"
                            @input="onEventArgsChange($event, index)"
                        />
                    </div>
                </div>
                <button @click="onEventSave">保存</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getMaterialEditorProps, materialMap } from "@/data";
import { useProjectStore, useEventStore } from "@/store";
import "./EditorRight.less";

const eventStore = useEventStore();

const projectStore = useProjectStore();
const editorProps = computed(() => {
    if (!projectStore.currentElement) {
        return {};
    }
    return getMaterialEditorProps(materialMap[projectStore.currentElement.mId]);
});
// const elementProps = computed(() => {
//     if (!projectStore.currentElement) {
//         return {};
//     }
//     return projectStore.currentElement.props;
// });
function onPropsChange(e: Event, key: string) {
    projectStore.changeElementProps({
        [key]: (e.target as HTMLInputElement).value,
    });
}

function onPageNameChange(e: Event) {
    projectStore.changePageName((e.target as HTMLInputElement).value);
}

function onEventSave() {
    eventStore.saveEvent(
        projectStore.currentPageIndex,
        projectStore.currentElementId
    );
}

function onEventArgsChange(e: Event, index: number) {
    const ev = e.target as HTMLInputElement;
    console.log(ev.value, index);
    eventStore.saveArgs(ev.value, index);
}
</script>

<style scoped></style>
