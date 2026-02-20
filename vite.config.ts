import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html";
import {readFileSync} from "fs";
import {join} from "path";

let packageJson=JSON.parse(readFileSync(join(__dirname, "package.json"), "utf-8"));
let version=packageJson.version;

export default defineConfig({
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        minify: "esbuild",
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            }
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    version,
                },
            },
        }),
    ],
    server: {
        port: 1331,
        open: false
    },
    preview: {
        port: 1331,
        open: false
    }
});