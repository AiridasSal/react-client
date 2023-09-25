const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const componentsPath = './components'; // Change this to the path of your components folder
const outputFilePath = path.join(__dirname, '..', 'public', 'assets', 'locales', 'en', 'source.json');


const walkSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      fileList = walkSync(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const extractTextFromComponent = (componentPath) => {
  const componentSource = fs.readFileSync(componentPath, 'utf8');
  const ast = parser.parse(componentSource, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const textNodes = [];

  traverse(ast, {
    JSXText(path) {
      const text = path.node.value.trim();
      if (text.length > 0) {
        textNodes.push(text);
      }
    },
  });

  return textNodes;
};

const extractTextFromComponents = (components) => {
  const text = [];

  components.forEach((componentPath) => {
    const componentText = extractTextFromComponent(componentPath);
    text.push(...componentText);
  });

  return text;
};

const components = walkSync(componentsPath).filter((filePath) => /\.js$/.test(filePath));
const extractedText = extractTextFromComponents(components);

const translationSource = extractedText.reduce((obj, text, index) => {
  obj[`key_${index}`] = text;
  return obj;
}, {});

fs.writeFileSync(outputFilePath, JSON.stringify(translationSource, null, 2), 'utf8');
console.log(`Source file for translation saved at ${outputFilePath}`);
