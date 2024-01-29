#! /usr/bin/env node

import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
import prompts from "prompts"

async function main(){

    let result;

    try {
        result = await prompts({
            type:'text',
            name:'projectName',
            message:"Enter project name"
        })
    }catch(e){
        console.error(e)
    }
    
    const cwd = process.cwd()
    const root = path.join(cwd, formatTargetDir(result.projectName))
    
    fs.mkdirSync(root,{recursive:true})
    
    const templateDir = path.resolve(fileURLToPath(import.meta.url), "../", "template")
    
    function formatTargetDir(targetDir) {
        return targetDir?.trim().replace(/\/+$/g, '')
    }
    
    const files = fs.readdirSync(templateDir)
    const renameFiles = {
        _gitignore: '.gitignore',
    }
    
    function copy(src, dest) {
        const stat = fs.statSync(src)
        if (stat.isDirectory()) {
            copyDir(src, dest)
        } else {
            fs.copyFileSync(src, dest)
        }
    }
    const write = (file, content) => {
        const targetPath = path.join(root, renameFiles[file] ?? file)
        if (content) {
            fs.writeFileSync(targetPath, content)
        } else {
            copy(path.join(templateDir, file), targetPath)
        }
    }
    
    for (const file of files) {
        write(file)
    }
    
    function copyDir(srcDir, destDir) {
        fs.mkdirSync(destDir, { recursive: true })
        for (const file of fs.readdirSync(srcDir)) {
          const srcFile = path.resolve(srcDir, file)
          const destFile = path.resolve(destDir, file)
          copy(srcFile, destFile)
        }
      }
    
}

main().catch(err=>console.error(err))