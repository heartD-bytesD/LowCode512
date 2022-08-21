import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import pkg from "./package.json";

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ArcoResolver()],
        }),
        Components({
            resolvers: [
                ArcoResolver({
                    sideEffect: true,
                }),
            ],
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "LcRadio",
            fileName: `${pkg.name.split("/")[1]}.${pkg.version}`,
            formats: ["umd"],
        },
        cssCodeSplit: true,
    },
});
