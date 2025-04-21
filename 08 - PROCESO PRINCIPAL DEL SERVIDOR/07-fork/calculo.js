export const calculo = () =>{
    let sum = 0
    for (let i = 0; i < 10000000000; i++) {
        sum += i
    }
    return sum
}

process.on('message', (msg) =>{
    if(msg === 'start'){
        const resultado = calculo()
        process.send(resultado)
    }
})