import { spawn } from "node:child_process";
import { join } from "node:path";

const mode = (process.argv[2] || "debug").toLowerCase();
const task = mode === "release" ? "assembleRelease" : "assembleDebug";
const gradle = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
const androidDir = join(process.cwd(), "android");

const child = spawn(gradle, [task], {
  cwd: androidDir,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    GRADLE_USER_HOME: process.env.GRADLE_USER_HOME || join(process.cwd(), ".gradle-cache"),
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
