import { IMaterial } from "@lowcode512/shared";
import {LOCAL_STORAGE_PROJECT, ProjectDatabaseJson} from "@/store";
import {Router} from "vue-router";

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));

}

export function loadScript(src: string) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        function onLoad() {
            resolve(src);
            script.onload = script.onerror = null;
        }
        script.onload = onLoad;
        script.onerror = reject;
        script.src = src;
        script.crossOrigin = "anonymous";
        document.head.append(script);
    });
}

export async function loadMaterial(m: any) {
    return loadScript(m.source);
}

export function loadMaterials(materials: IMaterial[]) {
    return Promise.all(materials.map((m) => loadMaterial(m)));
}

export function MenuOnPreview(project_json: ProjectDatabaseJson, route: Router){
    window.location.href = '/publish/'+project_json.project_id
}

export function MenuOnEdit (project_json: ProjectDatabaseJson, route: Router){
    let confirmResult = confirm("这将会覆盖上次编辑器的保存，你确定吗?")
    if(!confirmResult){
        return
    }
    localStorage[LOCAL_STORAGE_PROJECT] = project_json.project_data
    window.location.href = '/editor/' + project_json.project_id
}