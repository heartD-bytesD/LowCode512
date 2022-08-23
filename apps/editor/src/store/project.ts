import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import {
    IProject,
    Project,
    PageElement,
    IMaterial,
    Page,
} from "@lowcode512/shared";
import { loadMaterial } from "@/utils";
import { getMaterialDefaultProps, getMaterialRenderFun } from "@/data";
import app from "@/app";

const LOCAL_STORAGE_PROJECT = "__project";

// read saved Project if having one
export let p = computed(() => {
    // JSON.parse(localStorage.getItem("__project") || "{}");
    let pJson = localStorage.getItem(LOCAL_STORAGE_PROJECT);
    if (!pJson) {
        console.info("没有已保存的项目数据");
        return Project.create();
    }
    console.info(`读取到已保存的项目数据: ${pJson}`);
    return Project.create(JSON.parse(pJson));
}).value as Project;

export const useProjectStore = defineStore("project", () => {
    const materials = ref<Record<string, IMaterial>>({});
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
    const currentElement = computed(() => {
        if (currentElementId) {
            return p
                .getPageByIndex(currentPageIndex.value)
                .getElementById(currentElementId.value);
        }
        return currentPageElements[currentElementIndex.value];
    });
    const currentSnapshots = reactive({
        value: [
            // 因Vue3的bug，这里多保存一层
            currentPageElements.value.map((e) => PageElement.create(e)),
        ],
    });
    const currentSnapshotIndex = ref(0);
    // 复制，仅保存一次操作
    const currentCopyStack = reactive({
        value: [],
    });

    function setCurrentElement(element: PageElement) {
        currentElementId.value = element.id;
        currentElementIndex.value = currentPageElements.value.findIndex(
            (e) => e.id === element.id
        );
    }

    function addElement(ele: PageElement) {
        currentElementId.value = ele.id;
        const page = p.getPageByIndex(currentPageIndex.value);
        page.addElement(ele);
        // p._pages[currentPageIndex.value].addElement(ele);
        project.value = p.getJson();
    }

    function changeElementProps(props: Record<string, any>, element?: PageElement) {
        if (!currentElement.value) {
            return;
        }
        if(!element) {
            var element = p
            .getPageByIndex(currentPageIndex.value)
            .getElementById(currentElement.value.id);
        }
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
        return materials.value[mId];
    }

    async function load(material: IMaterial) {
        if (isLoaded(material.id)) {
            return; // 已经加载过的
        }
        await loadMaterial(material);
        const renderFun = getMaterialRenderFun(material);
        app.component(material.name, renderFun);
        materials.value = {
            ...materials.value,
            [material.id]: material,
        };
        changeElementProps(getMaterialDefaultProps(material));
        project.value = p.getJson();
    }

    function _saveProject(content) {
        localStorage.setItem(LOCAL_STORAGE_PROJECT, content);
    }

    function saveProject() {
        _saveProject(JSON.stringify(p.getJson()));
    }

    function resetProject() {
        p = project.value = Project.create();
    }

    function publishProject() {
        return p.getJson()
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

    function saveSnapshot() {
        if(currentSnapshotIndex.value < currentSnapshots.value.length - 1) {
            removeSnapshots(currentSnapshotIndex.value);
        }
        currentSnapshots.value.push(
            currentPageElements.value.map((e) => PageElement.create(e, false))
        );
        currentSnapshotIndex.value++;
        project.value = p.getJson();
    }

    // Maintain all snapshots before arr[index + 1];
    function removeSnapshots(index: number) {
        currentSnapshots.value = currentSnapshots.value.slice(0, index + 1);
    }

    function undo() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (
            currentSnapshotIndex.value === 0 ||
            currentSnapshots.value.length === 0 ||
            page === undefined
        ) {
            return;
        }
        currentSnapshotIndex.value--;
        page.clearElements();
        const snapshot = currentSnapshots.value[currentSnapshotIndex.value];
        snapshot.map((element) => page.addElement(PageElement.create(element)));
        project.value = p.getJson();
    }

    function redo() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (
            currentSnapshotIndex.value >= currentSnapshots.value.length - 1 ||
            page === undefined
        ) {
            return;
        }
        currentSnapshotIndex.value++;
        page.clearElements();
        const snapshot = currentSnapshots.value[currentSnapshotIndex.value];
        snapshot.map((element) => page.addElement(PageElement.create(element)));
        project.value = p.getJson();
    }
    // Control the copy stack (just clear before push in fact).
    function pushStack(element) {
        currentCopyStack.value = [element];
    }

    function copyElement(differentId: boolean = false) {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (page == null || !currentElement.value) {
            return;
        }
        const element = page.elements[currentElementIndex.value];
        const copyElement = PageElement.create(element, differentId);
        pushStack(copyElement);
    }

    function pasteElement() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (page == null || currentCopyStack.value.length === 0) {
            return;
        }
        saveSnapshot();
        // Continuously paste element, with different Id
        page.addElement(PageElement.create(...currentCopyStack.value, true));
        project.value = p.getJson();
        // For multi-selected, just spread the array
        setCurrentElement(currentPageElements.value[currentPageElements.value.length - 1]);
    }

    function removeElement() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (page == null || !currentElement.value) {
            return;
        }
        saveSnapshot();
        page.removeElement(currentElement.value);
        currentElementId.value = undefined;
        project.value = p.getJson();
    }
    // BUG: 剪切的时候无元素stack里也一直有新元素
    function cutElement() {
        const page = p.getPageByIndex(currentPageIndex.value);
        if (page == null || !currentElement.value) {
            return;
        }
        copyElement(false);
        saveSnapshot();
        page.removeElement(currentElement.value);
        currentElementId.value = undefined;
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
        copyElement,
        pasteElement,
        removeElement,
        cutElement,

        addPage,
        changePageName,
        setCurrentPageIndex,

        load,
        isLoaded,

        saveProject,
        resetProject,
        publishProject,

        saveSnapshot,
        undo,
        redo,
    };
});
