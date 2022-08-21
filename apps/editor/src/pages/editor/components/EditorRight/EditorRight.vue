<template>
    <div class="editor-right">
        <!-- 页面属性  -->
        <div class="pagesItem">
            <span id="itemText">画布属性</span>
        </div>
        <!-- 页面名称 -->   
        <div class="pageName" v-if="projectStore.currentElement === undefined">
            <p class="pageNametitle">页面名称</p>
            <input
                :style="{width:'170px'}"
                class="pageNameInput"
                :value="projectStore.currentPage.name"
                @input="onPageNameChange($event)"
            />
            <!-- TODO: 防抖 -->
        </div>

        <!-- 标题属性 | 图片属性 -->
        <div
            class="spin"
            v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)"
        >
              <a-space>
                <a-spin :size="32"/>
            </a-space>
        </div>
        <div class="plugItems" v-else>
            <div class="plugItemList" v-for="key in Object.keys(editorProps)" :key="key">
                <p v-if="editorProps[key].display" class="display">
                    {{ editorProps[key].display }}
                </p>
                <!-- Changes: -->
                <!-- editorProps[key].defaultValue => projectStore.currentElement.props[key]  -->
                <input
                    v-if="editorProps[key].type === 'string'"
                    :value="projectStore.currentElement.props[key]"
                    @change="onPropsChange($event, key)"
                />
                <input
                    v-if="editorProps[key].type === 'number'"
                    :value="projectStore.currentElement.props[key]"
                    @change="onPropsChange($event, key)"
                    type="number"
                />
                <input
                    v-if="editorProps[key].type === 'value'"
                    :value="projectStore.currentElement.props[key]"
                    @change="onPropsChange($event, key)"
                    type="number"
                />
                <input
                    v-if="editorProps[key].type === 'color'"
                    :value="projectStore.currentElement.props[key]"
                    @change="onPropsChange($event, key)"
                />
            </div>
            <div class="plugItemEvent">
                <p class="display">
                    自定义事件
                </p>
                <select
                    class="eventSelect"
                    :value="eventStore.currentType"
                    @change="e => eventStore.onTypeChange((e.target as HTMLSelectElement).value)"
                >
                    <option
                        class="eventOption"
                        v-for="item in eventStore.editorEvents"
                        :key="item.type"
                    >
                        {{ item.type }}
                    </option>
                </select>
                <select 
                    class="eventSelect"
                >
                    <option
                        class="eventOption"
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
                <a-button type="primary" @click="onEventSave">保存</a-button>
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
