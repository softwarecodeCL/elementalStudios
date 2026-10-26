// Project-local Node keeps the current Astro toolchain independent of the
// globally installed Node version. Nothing is installed system-wide.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, delimiter } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const binaryDirectory = join(root, "node_modules/node/bin");
const binary = join(
  binaryDirectory,
  process.platform === "win32" ? "node.exe" : "node",
);
const metadata = JSON.parse(
  readFileSync(join(root, "node_modules/astro/package.json"), "utf8"),
);
const cli = join(
  root,
  "node_modules/astro",
  typeof metadata.bin === "string" ? metadata.bin : metadata.bin.astro,
);
const runtime = existsSync(binary) ? binary : process.execPath;
const child = spawn(runtime, [cli, ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    PATH: `${binaryDirectory}${delimiter}${process.env.PATH || ""}`,
  },
});
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
