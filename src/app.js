require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const charactersRouter = require('./characters/characters-router');
const authRouter = require('./auth/auth-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/characters', charactersRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Let\'s get it started in here!')
})

app.use('/', (req, res) => {
    let response;
    if (NODE_ENV === 'production') {
        response = {error: {messge: 'server error'}}
    }
    else {
        respone = {messge: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app