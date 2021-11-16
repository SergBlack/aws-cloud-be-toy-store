console.log('Application is running');

process.stdout.write('> ');

process.stdin.on('data', (data) => {
  const inputData = data.toString().trim();

  if (inputData === 'q') {
    console.log('Application has been stopped');
    process.exit(0);
  }

  const outputData = inputData.split('').reverse().join('') + '\n';

  process.stdout.write(outputData);
  process.stdout.write('> ');
});
