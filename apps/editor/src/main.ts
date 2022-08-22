import { router } from "./router";
import { createPinia } from "pinia";
import app from "@/app";
import "./main.less";
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
// materialList.forEach((m) => {
//     const renderFun = getMaterialRenderFun(m);
//     app.component(m.name, renderFun);
// });
app.use(router).use(createPinia()).use(ArcoVue).use(ArcoVueIcon).mount("#app");
// });
