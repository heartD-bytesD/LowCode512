import App from "./index.vue";
import "./index.css";

export default {
    render: App,
    editorProps: {
        bvid: {
            type: "string", // 类型，并非值的类型，而是在渲染时决定显示什么类型的输入框（如选择器、滑块）
            defaultValue: "BV1xx411c7mu", // 默认图的cdn
            display: "内容", // 在输入框上方显示的名称，无则不显示
        },
        page: {
            type: "number",
            defaultValue: 1,
            display: "分p数",
        },
        high_quality: {
            type: "number",
            defaultValue: 1,
            display: "允许播放高清",
        },
        danmaku: {
            type: "number",
            defaultValue: 1,
            display: "默认开启弹幕",
        }
    },
};
