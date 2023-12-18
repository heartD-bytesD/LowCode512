<template>
    <div class="editor-right">
        <a-tabs default-active-key="2" >
            <a-tab-pane key="1">
                <template #title><icon-common /></template>
                <!-- <div
                    class="spin"
                    v-if="!projectStore.isLoaded(projectStore.currentElement.mId)"
                >
                    <a-space>
                        <a-spin :size="32" />
                    </a-space>
                </div> -->
                <!-- <div class="plugItems">
                    <div
                        class="plugItemList"
                        v-for="key in Object.keys(editorProps)"
                        :key="key"
                    >
                        <p v-if="editorProps[key].display" class="display">
                            {{ editorProps[key].display }}
                        </p>
                        <input
                            v-if="editorProps[key].type === 'string'"
                            :value="projectStore.currentElement.props[key]"
                            @change="onPropsChange($event, key)"
                        />
                        <div v-if="editorProps[key].type === 'image'">
                            <a-switch v-model="isLocalImage" />
                            <div v-if="isLocalImage">
                                <input
                                    :value="
                                        projectStore.currentElement.props.local
                                            ? ''
                                            : projectStore.currentElement.props[key]
                                    "
                                    @change="onPropsChange($event, key)"
                                />
                            </div>
                            <div v-else>
                                <form
                                    method="post"
                                    action="/api/fetchImage"
                                    enctype="multipart/form-data"
                                ></form>
                                <input
                                    :value="image_file"
                                    @change="onUpload($event, key)"
                                    ref="imageInput"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    id="image_input"
                                />
                            </div>
                            <a-button type="secondary" @click="onReset">重置</a-button>
                        </div>

                        <input
                            v-if="editorProps[key].type === 'number'"
                            :value="projectStore.currentElement.props[key]"
                            @change="onPropsChange($event, key, 'number')"
                            type="number"
                        />
                        <input
                            v-if="editorProps[key].type === 'value'"
                            :value="projectStore.currentElement.props[key]"
                            @change="onPropsChange($event, key)"
                            type="number"
                        />
                        <div v-if="editorProps[key].type === 'color'">
                            <a-button @click="checkObj[key] = !checkObj[key]">
                                <icon-bg-colors v-if="!checkObj[key]" />
                                <icon-double-up v-if="checkObj[key]" />
                                {{ checkObj[key] ? "收起" : "取色" }}
                            </a-button>
                            <Transition name="slide">
                                <ColorPicker
                                    style="position: fixed;"
                                    theme="light"
                                    :color="projectStore.currentElement.props[key]"
                                    :sucker-hide="false"
                                    :sucker-canvas="null"
                                    :sucker-area="[]"
                                    @changeColor="onChangeColor($event, key)"
                                    v-if="checkObj[key]"
                                />
                            </Transition>
                        </div>
                        <input
                            v-if="editorProps[key].type === 'checkbox'"
                            :value="projectStore.currentElement.props[key]"
                            @change="onPropsChange($event, key, 'boolean')"
                            type="checkbox"
                        />
                        <div v-if="editorProps[key].type === 'group'">
                            <div v-if="projectStore.currentElement.mId === 5">
                                <select
                                    class="eventSelect"
                                    :value="projectStore.currentElement.props[key]"
                                    @change="onPropsChange($event, key)"
                                >
                                    <option
                                        class="eventOption"
                                        v-for="groupName in projectStore.currentRadioGroups"
                                    >
                                        {{ groupName }}
                                    </option>
                                </select>
                            </div>
                            <div v-else>
                                <select
                                    class="eventSelect"
                                    :value="projectStore.currentElement.props[key]"
                                    @change="onPropsChange($event, key)"
                                >
                                    <option
                                        class="eventOption"
                                        v-for="groupName in projectStore.currentCheckboxGroups"
                                    >
                                        {{ groupName }}
                                    </option>
                                </select>
                            </div>

                            <input v-model="newGroup" />
                            <a-button @click="onAddGroup">添加</a-button>
                        </div>
                        <input
                            v-if="editorProps[key].type === 'slider'"
                            :value="projectStore.currentElement.props[key]"
                            @change="onPropsChange($event, key, 'number')"
                            :min="projectStore.currentElement.props[key].min"
                            :max="projectStore.currentElement.props[key].max"
                            type="range"
                        />
                    </div>
                    <div class="plugItemEvent">
                        <p class="display">自定义事件</p>
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
                        <select class="eventSelect">
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
                </div> -->
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #title><icon-file /></template>
                <h3>画布属性</h3>
                <h4>页面名称</h4>
                <a-input :model-value="projectStore.currentPage.name" @input="onPageNameChange" />
            </a-tab-pane>
            <a-tab-pane key="3" >
                <template #title><icon-settings /></template>
                <h3>项目配置</h3>
                <h4>项目名称</h4>
                <a-input :model-value="projectStore.project.name" @input="projectStore.changeProjectName"></a-input>
                <h3>全局设置</h3>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { getMaterialEditorProps, materialMap } from "@/data";
import { useProjectStore, useEventStore, useHttpReqStore } from "@/store";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import "./EditorRight.less";

const eventStore = useEventStore();
const HttpReqStore = useHttpReqStore();
const checkObj = reactive({
    color: false,
    backgroundColor: false,
});
const projectStore = useProjectStore();
const editorProps = computed(() => {
    if (!projectStore.currentElement) {
        return {};
    }
    return getMaterialEditorProps(materialMap[projectStore.currentElement.mId]);
});

let preview = ref(null);
let image = ref(null);
const imageInput = ref(null);
let image_file = "";
const isLocalImage = ref(true);
let newGroup = ref("");
function onPropsChange(e: Event, key: string, type?: string) {
    if (type === "boolean") {
        projectStore.changeElementProps({
            [key]: (e.target as HTMLInputElement).checked,
        });
    } else if (type === "number") {
        projectStore.changeElementProps({
            [key]: parseInt((e.target as HTMLInputElement).value),
        });
    } else {
        projectStore.changeElementProps({
            [key]: (e.target as HTMLInputElement).value,
        });
    }
}

function onPageNameChange(value: string) {
    projectStore.changePageName(value);
}

function onEventSave() {
    eventStore.saveEvent(
        projectStore.currentPageIndex,
        projectStore.currentElementId
    );
}

function onEventArgsChange(e: Event, index: number) {
    const ev = e.target as HTMLInputElement;
    eventStore.saveArgs(ev.value, index);
}

function onChangeColor(color, key: string) {
    projectStore.currentElement.props[key] = color.hex;
    projectStore.changeElementProps({
        [key]: color.hex,
    });
}

function onUpload(e: Event, key?: string) {
    const element = projectStore.currentElement;
    let input = (e.target as HTMLInputElement).files;
    if (input) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.value = e.target.result;
            projectStore.changeElementProps({ src: preview.value }, element);
            HttpReqStore.uploadPicture(element);
        };
        image.value = input[0];
        reader.readAsDataURL(input[0]);
    }
}

function onReset() {
    preview.value = null;
    image.value = null;
    projectStore.changeElementProps({ src: preview.value });
}

function onAddGroup() {
    projectStore.changeElementProps({ group: newGroup.value });
    console.log(projectStore.currentRadioGroups);
}
</script>

<style scoped></style>
