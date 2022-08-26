import { getMaterialRenderFun, materialMap } from "@/data";
import { loadMaterial } from "@/utils";
import { IProject } from "@lowcode512/shared";
import { ref, onMounted } from "vue";
import app from '@/app'

export function useMaterial() {
    const project: IProject = JSON.parse(
        localStorage.getItem("__project") || "{}"
    );
    const materials = [];
    const loaded = [];
    project.pages.map((page) => {
        page.elements.map(
            (item) => {
                if (loaded.includes(item.mId)) {
                    return;
                }
                loaded.push(item.mId);
                materials.push(materialMap[item.mId]);
            } // 通过mId得到物料
        );
    });
    const loading = ref(false);
    onMounted(() => {
        loading.value = true;
        Promise.all(Object.values(materials).map(loadMaterial)).then(() => {
            loading.value = false;
            materials.forEach(m => {
                app.component(m.name, getMaterialRenderFun(m))
            })
        });
        
    });

    return {
        loading,
        pages: project.pages,
    };
}
