const express = require('express');
const CharactersService = require('./characters-service');
const charactersRouter = express.Router();

charactersRouter
    .route('/')
    .get((req, res, next) => {
        knexInstance = req.app.get('db')
        CharactersService.getAllCharacters(knexInstance)
            .then(characters => {
                res.json(characters)
            })
            .catch(next)
    })


module.exports = charactersRouter;