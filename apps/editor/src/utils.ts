import { IMaterial } from "@lowcode512/shared";

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

export async function loadMaterial(m: IMaterial) {
    await delay(1000);
    return loadScript(m.source);
}

export function loadMaterials(materials: IMaterial[]) {
    return Promise.all(materials.map((m) => loadMaterial(m)));
}