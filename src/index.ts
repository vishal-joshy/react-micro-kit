#! /usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import prompts from "prompts";

async function main() {
  let result: prompts.Answers<"projectName","variant">;

  try {
    result = await prompts([{
      type: "text",
      name: "projectName",
      message: "Enter project name",
    },
    {
      type: "select",
      name: "variant",
      message: "Select variant",
      choices:[{title:"Default",value:"template"},{title:"Micro-frontend",value:"template-micro-frontend"}, {title:"Micro-frontend shell",value:"template-shell"}]
    }
  ],
  {
    onCancel: ()=>{
      throw new Error("Operation Cancelled")
    }
  });
  } catch (e: any) {
    console.error(e);
    return;
  }

  const cwd = process.cwd();
  const root = path.join(cwd, formatTargetDir(result.projectName));

  if (fs.existsSync(root)) {
    throw Error("Target path already exists");
  }

  fs.mkdirSync(root, { recursive: true });

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    result.variant
  );
  
  function formatTargetDir(targetDir: string) {
    return targetDir?.trim().replace(/\/+$/g, "");
  }

  const files = fs.readdirSync(templateDir);
  const renameFiles = {
    _gitignore: ".gitignore",
  };

  function copy(src: string, dest: string) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file);
      const destFile = path.resolve(destDir, file);
      copy(srcFile, destFile);
    }
  }

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );

  pkg.name = result.projectName;

  write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  console.log(`\nDone. Now run:\n`)
  console.log(`  cd ${result.projectName.includes(' ') ? `"${result.projectName}"` : result.projectName}`,);
  console.log(`  npm install`)
  console.log(`  npm run dev`)
}

main().catch((err) => console.error(err));
