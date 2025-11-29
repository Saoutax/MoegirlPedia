import { defineConfig } from "vite";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import * as sass from "sass";

const srcFiles = glob.sync("src/**/*.{js,scss}");

const jsEntries = Object.fromEntries(
    srcFiles
        .filter(f => f.endsWith(".js"))
        .map(f => [path.relative("src", f).replace(/\.js$/, ""), path.resolve(f)])
);

export default defineConfig({
    plugins: [{
        name: "scss",
        closeBundle() {
            srcFiles.filter(f => f.endsWith(".scss")).forEach(f => {
                const out = f.replace(/^src/, "dist").replace(/\.scss$/, ".css");
                fs.mkdirSync(path.dirname(out), { recursive: true });
                fs.writeFileSync(out, sass.compile(f, { style: "compressed" }).css);
            });
        }
    }],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "terser",
        terserOptions: {
            mangle: false,
            compress: true,
        },
        rollupOptions: {
            input: jsEntries,
            output: { entryFileNames: "[name].js", chunkFileNames: "[name].js" }
        }
    }
});