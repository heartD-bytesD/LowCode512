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
    ],

    define: {
        "process.env": process.env,
    },

    server: {
        proxy: {
        // 请求项目json
            '/api/fetchProjectData': {
                target: "http://localhost:5197",
                changeOrigin: true,
            },
            '/api/fetchImage': {
                target: "http://localhost:5197",
                changeOrigin: true,
            }
        }
    }
    // resolve: {
    //     alias: {
    //         "@": path.resolve(__dirname, "src"),
    //     },
    // },
});
