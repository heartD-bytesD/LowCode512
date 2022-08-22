import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import Preview from "./pages/preview/index.vue"

// 生成页面的地址
routes.push({
    path: "/publish/:id/:page",
    component: Preview,
})
routes.push({
    path: "/publish/:id",
    component: Preview,
})

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
