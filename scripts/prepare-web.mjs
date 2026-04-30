import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "web");
const files = ["index.html", "styles.css", "app.js", "image.png"];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const file of files) {
  await copyFile(join(root, file), join(outDir, file));
}

console.log(`Prepared ${files.length} web assets in ${outDir}`);
