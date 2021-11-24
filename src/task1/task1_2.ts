import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';

const sourceFilePath = './src/csv/hw1-ex1.csv';
const destFilePath = './src/task1/files/hw1-ex1.txt';
const readStream = fs.createReadStream(sourceFilePath);
const writeStreamFile = fs.createWriteStream(destFilePath, 'utf8');

function writeLine(line: string) {
  console.log(`Line from file: ${line}`);
  writeStreamFile.write(`${line}\n`);
}

function logSuccess() {
  console.log('File was created');
}

function logError(err: any) {
  console.error(err);
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1. using pipe to write file
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// readStream.pipe(csv()).pipe(writeStreamFile);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2. using readline to write line by line
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const readlineInterface = readline.createInterface({
  input: readStream.pipe(csv()),
});

// readlineInterface
//   .on('line', writeLine)
//   .on('close', logSuccess)
//   .on('error', logError);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 3. using for of to write line by line
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function writeLineByLine() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const line of readlineInterface) {
    writeLine(line);
  }
}

// writeLineByLine().then(logSuccess, logError);
