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
        title: "文字",
        thumbnail: "",
        version: "0.0.2",
        source: "/lc-title.0.0.2.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-title.0.0.1.umd.js",
            },
            {
                version: "0.0.2",
                source: "/lc-title.0.0.2.umd.js",
            }
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
        version: "0.0.2",
        source: "/lc-button.0.0.2.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-button.0.0.1.umd.js",
            },
            {
                version: "0.0.2",
                source: "/lc-button.0.0.2.umd.js",
            }
        ],
    },
    {
        id: 4,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcCheckbox",
        title: "复选框",
        thumbnail: "",
        version: "0.0.2",
        source: "/lc-checkbox.0.0.2.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-checkbox.0.0.1.umd.js",
            },
            {
                version: "0.0.2",
                source: "/lc-checkbox.0.0.2.umd.js",
            },
        ],
    },
    {
        id: 5,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcRadio",
        title: "单选框",
        thumbnail: "",
        version: "0.0.1",
        source: "/lc-radio.0.0.1.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-radio.0.0.1.umd.js",
            },
        ],
    },
    {
        id: 6,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcSelector",
        title: "选择器",
        thumbnail: "",
        version: "0.0.1",
        source: "/lc-selector.0.0.1.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-selector.0.0.1.umd.js",
            },
        ],
    },
    {
        id: 7,
        type: "component",
        category: {
            name: "基础组件",
        },
        name: "LcSlider",
        title: "滑条",
        thumbnail: "",
        version: "0.0.2",
        source: "/lc-slider.0.0.2.umd.js",
        data: [
            {
                version: "0.0.1",
                source: "/lc-slider.0.0.1.umd.js",
            },
            {
                version: "0.0.2",
                source: "/lc-slider.0.0.2.umd.js",
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
    if (!props) {
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
