const fs = require('fs').promises;

async function replaceLayout() {
  await fs.mkdir('./06-build-page/project-dist', { recursive: true });
  const header = await fs.readFile(
    '06-build-page/components/header.html',
    'utf-8',
  );
  const footer = await fs.readFile(
    '06-build-page/components/footer.html',
    'utf-8',
  );
  const articles = await fs.readFile(
    '06-build-page/components/articles.html',
    'utf-8',
  );
  let template = await fs.readFile('06-build-page/template.html', 'utf-8');
  template = template
    .replace('{{header}}', header)
    .replace('{{footer}}', footer)
    .replace('{{articles}}', articles);
  await fs.writeFile('./06-build-page/project-dist/index.html', template);
  console.log('Данные в template.html успешно записались!');
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
  console.log('Стили успешно собраны!');
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
  console.log('Данные успешно скопировались');
}

async function buildPage() {
  await replaceLayout();
  await mergeStyles();
  const sourceFolder = '06-build-page/assets';
  const destinationFolder = '06-build-page/project-dist/assets';
  await copyFolder(sourceFolder, destinationFolder);
}

buildPage();
