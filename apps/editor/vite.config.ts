import { defineConfig, PluginOption } from "vite";
// import path from "path";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import paths from "vite-tsconfig-paths";
import viteMocker from "vite-plugin-mocker";

export default defineConfig({
    // TODO paths不生效
    plugins: [
        paths(
            {
                loose: true,
            }
        ),
        vue(),
        Pages({ exclude: ["**/components/*"] }),
        viteMocker({
            // 请求响应延迟时间区间
            delay: [0, 1000],
        }) as unknown as PluginOption,
    ],

    define: {
        "process.env": process.env,
    },
    // resolve: {
    //     alias: {
    //         "@": path.resolve(__dirname, "src"),
    //     },
    // },
});
