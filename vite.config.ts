import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html";
import {readFileSync} from "fs";
import {join } from "path";
const packageJson=JSON.parse(readFileSync(join(__dirname, "package.json"), "utf-8"));
const version=packageJson.version;
export default defineConfig({
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        minify: "terser",
        cssMinify: true,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    version: version,
                },
            },
        }),
    ],
    server: {
        port: 1331,
        open: false,
        strictPort: true
    },
    preview: {
        port: 1331,
        open: false,
        strictPort: true
    }
});