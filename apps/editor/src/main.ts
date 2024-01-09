import { router } from "./router";
import { createPinia } from "pinia";
import app from "@/app";
import "./main.less";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import { loadScript } from './utils'
// materialList.forEach((m) => {
//     const renderFun = getMaterialRenderFun(m);
//     app.component(m.name, renderFun);
// });
app.use(router).use(createPinia()).use(ArcoVue).use(ArcoVueIcon).mount("#app");
// });
Promise.all([
  '/core.0.0.3.umd.js'
].map(umd => loadScript(umd))).then((umds) => {
  console.log('已加载插件：', umds)
})