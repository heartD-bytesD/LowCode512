import { IMaterial } from "@lowcode512/shared";

export const materialList: IMaterial[] = [
    {
        id: 1,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcImage",
        title: "图片",
        thumbnail: "",
        version: "0.0.1",
        source: "/lc-image.0.0.1.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-image.0.0.1.umd.js",
            },
        ],
    },
    {
        id: 2,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcTitle",
        title: "标题",
        thumbnail: "",
        version: "0.0.1",
        source: "/lc-title.0.0.1.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-title.0.0.1.umd.js",
            },
        ],
    },
    {
        id: 3,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcButton",
        title: "按钮",
        thumbnail: "",
        version: "0.0.1",
        source: "/lc-button.0.0.1.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-button.0.0.1.umd.js",
            },
        ],
    },
];

export const materialMap: { [key: string]: IMaterial } = materialList.reduce(
    (pre, item) => {
        pre[item.id] = item;
        return pre;
    },
    {}
);

// 获取props和render并不十分直观，于是封装一下
export function getMaterialEditorProps(material: IMaterial) {
    return (window as any)[material.name]?.editorProps;
}

export function getMaterialRenderFun(material: IMaterial) {
    return (window as any)[material.name]?.render;
}

export function getMaterialDefaultProps(material: IMaterial) {
    const props = getMaterialEditorProps(material);
    if(!props) {
        return {}
    }
    return Object.keys(props).reduce((pre, key) => {
        // console.log("pre:" ,pre)
        // console.log("key:" ,key)
        // console.log("props[key]:" ,props[key])
        pre[key] = props[key].defaultValue;
        return pre;
    }, {})
}
