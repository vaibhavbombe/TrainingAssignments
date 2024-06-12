const { exec } = require('child_process');
const path = require('path');

//i have added script file in json like as follows
// {
//     "scripts": {
//       "start": "ts-node src/server.ts",
//       "debug": "node debug.js"
//     }
//   }  alson nedd launch configuration with vs externally not added file here but it will work with the help of 'npm run debug' command
  

const startProcess = (script) => {
  const command = `node --inspect-brk ${path.resolve(__dirname, script)}`;  
  const child = exec(command);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const scriptsToDebug = [
  'src/server.ts', 
  'src/controllers/bookController.ts',
  'src/controllers/authorController.ts',
  'src/controllers/reviewController.ts',
  'src/controllers/ratingController.ts',
  'src/controllers/userController.ts',
  'src/services/paymentService.ts',
  'src/services/googleBooksService.ts'
];

scriptsToDebug.forEach(startProcess);
