const fs = require('fs').promises;

async function replaceLayout() {
  await fs.mkdir('./06-build-page/project-dist', { recursive: true });
  let template = await fs.readFile('06-build-page/template.html', 'utf-8');
  const templateDir = './06-build-page/components';
  const templateFiles = await fs.readdir(templateDir);
  for (let file of templateFiles) {
    const extname = path.extname(file);
    const basename = path.basename(file, extname);
    const componentContent = await fs.readFile(
      path.join(templateDir, file),
      'utf-8',
    );
    const ph = `{{${basename}}}`;
    template = template.replace(new RegExp(ph, 'g'), componentContent);
    await fs.writeFile('./06-build-page/project-dist/index.html', template);
  }
  console.log('Data in template.html you signed up successfully!');
}

async function mergeStyles() {
  let bundle = '';
  const files = await fs.readdir('06-build-page/styles', {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const styleText = await fs.readFile(
        `06-build-page/styles/${file.name}`,
        'utf-8',
      );
      bundle += styleText;
    }
  }
  await fs.writeFile('06-build-page/project-dist/style.css', bundle);
  console.log('Styles have been successfully bundled!');
}

const path = require('path');

async function copyFolder(source, destination) {
  await fs.mkdir(destination, { recursive: true });
  const items = await fs.readdir(source, { withFileTypes: true });
  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const destinationPath = path.join(destination, item.name);
    if (item.isDirectory()) {
      await copyFolder(sourcePath, destinationPath);
    } else if (item.isFile()) {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
  console.log('The data has been copied successfully');
}

async function buildPage() {
  await replaceLayout();
  await mergeStyles();
  const sourceFolder = '06-build-page/assets';
  const destinationFolder = '06-build-page/project-dist/assets';
  await copyFolder(sourceFolder, destinationFolder);
}

buildPage();
