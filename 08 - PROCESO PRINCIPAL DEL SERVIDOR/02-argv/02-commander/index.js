import express from 'express';
import { program } from 'commander';

const app = express();

program
    .option('-p <port>', 'Port number', 8080)
    .option('-e <env>', 'Environment', 'dev')

program.parse()

// console.log(program.opts())

const PORT = program.opts().p;
const ENV = program.opts().e;

app.listen(PORT, ()=>console.log(`Server on port ${PORT}, env: ${ENV}`));