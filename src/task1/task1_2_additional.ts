import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';

const sourceFilePath = './src/csv/hw1-ex1.csv';
const destFilePath = './src/task1/files/hw1-ex1_2-add.txt';
const readStream = fs.createReadStream(sourceFilePath);
const writeStreamFile = fs.createWriteStream(destFilePath, 'utf8');

const writeBookToDb = async (book: string): Promise<void> => {
  return new Promise((resolve) => {
    console.log({ book });
    setTimeout(() => resolve(), 2000);
  });
};

const readlineInterface = readline.createInterface({
  input: readStream.pipe(csv()).subscribe(writeBookToDb),
});

readlineInterface
  .on('line', (line) => {
    console.log(`Line from file: ${line}`);
    writeStreamFile.write(`${line}\n`);
  })
  .on('close', () => console.log('File was created'))
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
