import { router } from "./router";
import { createPinia } from "pinia";
import app from "@/app";
import "./main.less";
// materialList.forEach((m) => {
//     const renderFun = getMaterialRenderFun(m);
//     app.component(m.name, renderFun);
// });
app.use(router).use(createPinia()).mount("#app");
// });
