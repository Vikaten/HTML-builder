const fs = require('fs').promises;

async function copyFiles() {
  await fs.mkdir('04-copy-directory/files-copy', { recursive: true });
  const files = await fs.readdir('04-copy-directory/files');
  for (let file of files) {
    const copyFile = '04-copy-directory/files/' + file;
    const pasteFile = '04-copy-directory/files-copy/' + file;
    await fs.copyFile(copyFile, pasteFile);
  }
  console.log('The data has been copied successfully!');
}

copyFiles();
