import fs from "fs/promises";
import path from "path";

/**
 * 读取目录内容
 * @param {string} dir - 目录路径
 * @returns {Promise<Object>} - 文件名和内容组成的对象
 */
async function readDirRecursive(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const result = {};

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            result[entry.name] = await readDirRecursive(fullPath);
        } else if (entry.isFile()) {
            const content = await fs.readFile(fullPath, "utf-8");
            result[entry.name] = content;
        }
    }

    return result;
}

const distPath = path.resolve("./dist");
const source = await readDirRecursive(distPath);

export default source;
