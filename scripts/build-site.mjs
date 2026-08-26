import { cp, mkdir, rm } from "node:fs/promises";

const publicFiles = [
  "index.html",
  "support.js",
  "favicon.ico",
  "favicon.svg",
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist/client", { recursive: true });
await mkdir("dist/server", { recursive: true });

for (const file of publicFiles) {
  await cp(file, `dist/client/${file}`);
}

await cp("worker/site-worker.js", "dist/server/index.js");
