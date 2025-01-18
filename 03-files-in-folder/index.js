const fs = require('fs/promises');
const path = './03-files-in-folder/secret-folder';
async function filesInfo() {
  const files = await fs.readdir(path, { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      const directNames = file.name.split('.');
      const stat = await fs.stat(`${path}/${file.name}`);
      console.log(`${directNames[0]} - ${directNames[1]} - ${stat.size}b`);
    }
  }
}

filesInfo();
