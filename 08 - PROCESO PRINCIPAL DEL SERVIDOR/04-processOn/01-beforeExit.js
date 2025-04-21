process.on('beforeExit', (code)=>{
    console.log('El proceso va a terminó con el código:', code);
})

console.log('ejecutando proceso......')

// process.exit()