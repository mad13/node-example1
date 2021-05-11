'use strict'

const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')

const port = config.port
const db = config.db

mongoose.connect(db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')

    app.listen(3000, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})




