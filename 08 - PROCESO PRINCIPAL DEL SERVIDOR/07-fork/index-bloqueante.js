import express from 'express'
import { calculo } from './calculo.js'

const app = express()

let visitas = 0

app.get('/', (req, res) => {
    visitas++
    res.json({
        message: 'Servidor bloqueante',
        visitas
    })
})

app.get('/calculo', (req, res) => {
    const resultado = calculo()
    res.json({
        resultado
    })
})

app.listen(8080, ()=>{
    console.log('Servidor BLOQUEANTE escuchando en el puerto 8080')
})