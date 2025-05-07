import { createTransport } from 'nodemailer'
import { templateHtml } from './template.js';
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import 'dotenv/config'

export const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const mailHbsConfig = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views'),
    extName: '.handlebars',
}

transporter.use('compile', hbs(mailHbsConfig))

export const mailConfigHbs = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    template: 'email',
    context: {
        name: 'Juan',
        text: '¡Bienvenido a Coderhouse!'
    },
    attachments: [
        {
            path: process.cwd() + '/src/services/hola.txt',
            filename: "resumen-de-cuenta.txt"
        },
    ]
}

export const mailConfig = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    // text: '¡Te damos la bienvenida a Coderhouse!'
    // html: '<h1>¡Te damos la bienvenida a Coderhouse!</h1>'
    html: templateHtml,
    attachments: [
        {
            path: process.cwd() + '/src/services/hola.txt',
            filename: "resumen-de-cuenta.txt"
        },
    ]
}