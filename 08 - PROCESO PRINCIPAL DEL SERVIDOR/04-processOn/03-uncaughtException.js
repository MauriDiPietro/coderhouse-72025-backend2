process.on('uncaughtException', (error) => {
    console.log(error.message);
    console.log(error.stack);
    process.exit(1)
})

const funcionError = () => {
    console.log('ejecutando algo.....');
    throw new Error('Error en la función')
}

funcionError()