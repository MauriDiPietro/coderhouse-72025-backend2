import express from 'express'
import { calculo } from './calculo.js'
import { fork } from 'child_process'

// console.log(`${process.cwd()}/calculo.js`)

const app = express()

let visitas = 0

app.get('/', (req, res) => {
    visitas++
    res.json({
        message: 'Servidor no bloqueante',
        visitas
    })
})

app.get('/calculo', (req, res) => {
    const child = fork(`${process.cwd()}/calculo.js`)
    child.send('start')
    child.on('message', (resultado) => {
        res.json({
            resultado
        })
    })
})

app.listen(8080, ()=>{
    console.log('Servidor NO BLOQUEANTE escuchando en el puerto 8080')
})