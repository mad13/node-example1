'use strict'

const express = require('express')

// funciona como middleware
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const api = require('./routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)
app.engine('hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs',
}))
app.set('view engine', 'hbs')
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/', (req, res) => {
    res.render('product')
})

module.exports = app