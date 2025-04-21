import { exec } from 'child_process';

const comando1 = 'ls -lh';
const comando2 = 'find /'

exec(comando2, (err, stdout, stderr) => {
    if(err) console.log(`Error: ${err.message}`)
    if(stderr) console.log(`Error: ${stderr}`)
    console.log(stdout)
})