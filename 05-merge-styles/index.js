const fs = require('fs').promises;
let bundle = '';
async function mergeStyles() {
  const files = await fs.readdir('05-merge-styles/styles', {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const styleText = await fs.readFile(
        `05-merge-styles/styles/${file.name}`,
        'utf-8',
      );
      bundle += styleText;
    }
  }
  await fs.writeFile('05-merge-styles/project-dist/bundle.css', bundle);
  console.log('Saved!');
}

mergeStyles();
