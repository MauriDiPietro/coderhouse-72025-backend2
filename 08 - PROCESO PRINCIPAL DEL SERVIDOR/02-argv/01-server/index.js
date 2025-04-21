import express from 'express';

const app = express();

// console.log(process.argv[2])

const PORT = process.argv[2] || 8080;
const ENV = process.argv[3] || 'dev';

app.listen(PORT, ()=>console.log(`Server on port ${PORT}, env: ${ENV}`));