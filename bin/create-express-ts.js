#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const projectName = process.argv[2];
const projectPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, 'expressjs-ts-template');

if (!projectName) {
  console.error('Please provide a project name as an argument.');
  process.exit(1);
}

if (fs.existsSync(projectPath)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stats = fs.statSync(srcPath);
    if (stats.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirectory(templatePath, projectPath);
const greenConsole="\x1b[32m";

console.log(`Generating project in ${projectName} folder ...`);

exec(`cd ${projectName} && npm install`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  console.log(greenConsole + 'Express.js project created successfully!');
  console.log(greenConsole + `Please navigate to ${projectName} folder and then run 'npm run dev' command!`);

});
