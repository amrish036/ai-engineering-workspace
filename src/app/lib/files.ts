import fs from "fs";
import path from "path";
import { glob } from "glob";

export async function getProjectFiles() {
  const files = await glob("src/**/*.{ts,tsx}", {
    ignore: [
      "node_modules/**",
      ".next/**",
    ],
  });

  const fileContents = files.map((file) => {
    const fullPath = path.join(process.cwd(), file);

    const content = fs.readFileSync(
      fullPath,
      "utf-8"
    );

    return {
      file,
      content,
    };
  });

  return fileContents;
}