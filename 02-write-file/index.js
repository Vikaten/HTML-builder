const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  'Hi! Enter the text (Go to an empty line, press Ctrl+C or enter exit to complete the input): ',
);

let text = [];
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    text.push(input);
  }
});

rl.on('close', () => {
  const output = text.join('\n');
  fs.appendFile('./02-write-file/file1.txt', output + '\n', function () {
    console.log('\nThe data has been successfully recorded!');
  });
});
