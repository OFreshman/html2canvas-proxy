import { readFile } from "fs/promises";
import { resolve } from "path";

export default defineEventHandler(async () => {
  const filePath = resolve("public/index.html");
  return await readFile(filePath, "utf-8")
});