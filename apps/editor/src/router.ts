import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import Preview from "./pages/preview/index.vue"
import Editor from "./pages/editor/index.vue"

// 生成页面的地址
routes.push({
    path: "/publish/:id/:pageIndex",
    component: Preview,
},{
    path: "/publish/:id",
    component: Preview,
})
// 预览页面的地址
routes.push({
    path: "/preview/:pageIndex",
    component: Preview
})
// 原地编辑
routes.push({
    path: "/editor/:id",
    component: Editor
})

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
