const fs = require('fs').promises;

async function copyFiles() {
  await fs.mkdir('04-copy-directory/files-copy', { recursive: true });
  const filesSource = await fs.readdir('04-copy-directory/files');
  const filesTarget = await fs.readdir('04-copy-directory/files-copy');
  for (let file of filesTarget) {
    await fs.unlink('04-copy-directory/files-copy/' + file, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Файл успешно удалён');
    });
  }
  for (let file of filesSource) {
    const copyFile = '04-copy-directory/files/' + file;
    const pasteFile = '04-copy-directory/files-copy/' + file;
    await fs.copyFile(copyFile, pasteFile);
  }
  console.log('The data has been copied successfully!');
}

copyFiles();
