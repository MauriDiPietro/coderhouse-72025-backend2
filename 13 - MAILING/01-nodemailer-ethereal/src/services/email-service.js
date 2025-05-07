import { createTransport } from 'nodemailer'
import { templateHtml } from './template.js';
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

export const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ashleigh.auer@ethereal.email',
        pass: 'tCBXCBd4uBDERnwGA1'
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
    from: 'ashleigh.auer@ethereal.email',
    to: 'ashleigh.auer@ethereal.email',
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
    from: 'ashleigh.auer@ethereal.email',
    to: 'ashleigh.auer@ethereal.email',
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