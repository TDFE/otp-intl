const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, './src/index.d.ts');
const destination = path.resolve(__dirname, 'lib', 'index.d.ts');

try {
  fs.copyFileSync(source, destination);
  console.log('File moved successfully!');
} catch (err) {
  console.error('Error moving file:', err);
}
