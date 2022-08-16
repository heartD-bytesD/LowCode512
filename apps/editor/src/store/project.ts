import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IProject, Project, PageElement, IMaterial, Page } from "@lowcode512/shared";
import {loadMaterial} from '@/utils'
import { getMaterialDefaultProps, getMaterialRenderFun } from "@/data";
import app from '@/app'
import {router} from "@/router";

const LOCAL_STORAGE_PROJECT = "__project"

// read saved Project if having one
export let p = computed(() => {
    // JSON.parse(localStorage.getItem("__project") || "{}");
    let pJson = localStorage.getItem(LOCAL_STORAGE_PROJECT)
    if(!pJson){
        console.info("没有已保存的项目数据")
        return Project.create()
    }
    console.info(`读取到已保存的项目数据: ${pJson}`)
    return Project.create(JSON.parse(pJson))
}).value as Project;

export const useProjectStore = defineStore("project", () => {

    const materials = ref<Record<string, IMaterial>>({})
    const project = ref<IProject>(p.getJson());
    const currentPageIndex = ref(0);
    const currentPage = computed(
        () => project.value.pages[currentPageIndex.value]
    );
    const currentPageElements = computed(
        () => project.value.pages[currentPageIndex.value].elements
    );
    const currentElementIndex = ref(0);
    const currentElementId = ref("");
    const currentElement = computed(
        () => {
            if(currentElementId) {
                return p
                .getPageByIndex(currentPageIndex.value)
                .getElementById(currentElementId.value)
            }
            return currentPageElements[currentElementIndex.value]
        }
    );
    const currentSnapshotIndex = ref(0);

    function setCurrentElement(element: PageElement) {
        currentElementId.value = element.id;
    }

    function addElement(ele: PageElement) {
        currentElementId.value = ele.id;
        const page = p.getPageByIndex(currentPageIndex.value)
        page.addElement(ele);
        console.log("Add element: ", page);
        saveSnapshot()
        // p._pages[currentPageIndex.value].addElement(ele);
        project.value = p.getJson();
    }

    function changeElementProps(props: Record<string, any>) {
        if(!currentElement.value) {
            return;
        }
        const element = p
            .getPageByIndex(currentPageIndex.value)
            .getElementById(currentElement.value.id);
        element.props = {
            ...element.props,
            ...props,
        };
        project.value = p.getJson();
    }

    function changeElementStyle(style: Record<string, any>) {
        const element = p
            .getPageByIndex(currentPageIndex.value)
            .getElementById(currentElement.value.id);
        element.style = {
            ...element.style,
            ...style,
        };
        project.value = p.getJson();
    }

    function isLoaded(mId: number) {
        return materials.value[mId]
    }


    async function load(material: IMaterial) {
        if(isLoaded(material.id)) {
            return; // 已经加载过的
        }
        await loadMaterial(material);
        const renderFun = getMaterialRenderFun(material);
        app.component(material.name, renderFun);
        materials.value = {
            ...materials.value,
            [material.id] : material
        }
        changeElementProps(getMaterialDefaultProps(material));
        project.value = p.getJson();
    }

    function _saveProject(content){
        localStorage.setItem(LOCAL_STORAGE_PROJECT, content);
    }

    function saveProject() {
        _saveProject(JSON.stringify(p.getJson()))
    }

    function resetProject() {
        const check = confirm("确定全部清空吗?")
        if(!check){
            return
        }
        p = project.value = Project.create()
    }

    function setCurrentPageIndex(index: number) {
        currentPageIndex.value = index;
        currentElementId.value = undefined; // 每次切换页面，清空选中，可以根据需要配置
    }

    function addPage() {
        const page = Page.create();
        p.addPage(page);
        project.value = p.getJson();
    }

    function changePageName(name: string) {
        const page = p.getPageByIndex(currentPageIndex.value);
        page.name = name; 
        project.value = p.getJson();

    }

    // For redo and undo
    function saveSnapshot() {
        const page = p.getPageByIndex(currentPageIndex.value);
        // if(currentSnapshotIndex.value != page.snapshots.length - 1) {
        //     console.log("Removed")
        //     page.snapshots = page.snapshots.slice(0, currentSnapshotIndex.value + 1)
        //     // page.removeSnapshots(currentSnapshotIndex.value)
        //     const c = page.snapshots[currentSnapshotIndex.value][0]?.style.left
        //     console.log(c)
        // }
        page.saveSnapshot();
        currentSnapshotIndex.value++;
        project.value = p.getJson();
    }

    function undo() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if(--currentSnapshotIndex.value < 0) {
            currentSnapshotIndex.value = 0
        }
        page.refreshElements(currentSnapshotIndex.value)
        project.value = p.getJson();
    }
    function redo() {
        const elementsLength: number = p.getPageByIndex(currentPageIndex.value).snapshots.length;
        if(elementsLength == 0) {
            return;
        }
        if(++currentSnapshotIndex.value >= elementsLength) {
            currentSnapshotIndex.value = elementsLength - 1;
        }
        const page = p.getPageByIndex(currentPageIndex.value);
        console.log("currentSnapshotIndex: ", currentSnapshotIndex.value)
        page._elements = [...page.snapshots[currentSnapshotIndex.value]];
        project.value = p.getJson();
    }

    return {
        currentPage,
        currentPageIndex,
        currentPageElements,
        currentElement,
        currentElementId,
        project,

        addElement,
        setCurrentElement,
        changeElementProps,
        changeElementStyle,
        addPage,
        changePageName,
        setCurrentPageIndex,

        load,
        isLoaded,

        saveProject,
        resetProject,

        saveSnapshot,
        undo,
        redo,
    };
});
