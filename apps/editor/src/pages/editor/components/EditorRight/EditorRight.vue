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
                :style="{ width: '170px' }"
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
                <a-spin :size="32" />
            </a-space>
        </div>
        <div class="plugItems" v-else>
            <div
                class="plugItemList"
                v-for="key in Object.keys(editorProps)"
                :key="key"
            >
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
                <select
                    v-if="editorProps[key].type === 'group'"
                    :value="projectStore.currentElement.props[key]"
                    @change="onPropsChange($event, key)"
                >
                    <option disabled>请选择</option>
                </select>
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
        </div>
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
    eventStore.saveArgs(ev.value, index);
}

function onChangeColor(color, key: string) {
    projectStore.currentElement.props[key] = color.hex;
    projectStore.changeElementProps({
        [key]: color.hex,
    });
}

function onUpload(e: Event, key: string) {
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
</script>

<style scoped></style>
