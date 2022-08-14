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

    function setCurrentElement(element: PageElement) {
        currentElementId.value = element.id;
    }

    function addElement(ele: PageElement) {
        currentElementId.value = ele.id;
        p.getPageByIndex(currentPageIndex.value).addElement(ele);
        // p._pages[currentPageIndex.value].addElement(ele);
        project.value = p.getJson();
    }

    function changeElementProps(props: Record<string, any>) {
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
        p = project.value = Project.create()
        saveProject()
        // sorry for doing that, but i don't really understand the structure for now
        // so i choose this way to refresh page
        // router.push("/").then( () => {
        //         setTimeout(() => {
        //             router.push("/editor")
        //         }, 200)
        //     }
        // )
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
        resetProject
    };
});
