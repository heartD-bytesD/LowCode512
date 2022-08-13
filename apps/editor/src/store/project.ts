import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IProject, Project, PageElement, IMaterial, Page } from "@lowcode512/shared";
import {loadMaterial} from '@/utils'
import { getMaterialDefaultProps, getMaterialRenderFun } from "@/data";
import app from '@/app'

const p = Project.create();

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

    function saveProject() {
        localStorage.setItem('__project', JSON.stringify(p.getJson()));
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
    };
});
