const express = require('express');
const CharactersService = require('./characters-service');
const { requireAuth } = require('../middleware/jwt-auth');
const charactersRouter = express.Router();
const jsonParser = express.json();

charactersRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
       const knexInstance = req.app.get('db')
       const user = req.user
        CharactersService.getAllCharactersByUser(knexInstance, user)
            .then(characters => {
                res.json(characters.map(char => CharactersService.serializeCharacter(char)))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img} = req.body;
        const newCharacter = {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img};

        const knexInstance = req.app.get('db');

        for (const field of ['character_name', 'general_desc']) {
            if(!req.body[field]) {
                return res.status(400).send(`'${field}' is required`)
            }
        }

        newCharacter.user_id = req.user.id

        CharactersService.insertCharacter(knexInstance, newCharacter)
            .then(character => {
                res
                    .status(201)
                    .json(CharactersService.serializeCharacter(character))
            })
            .catch(next)
    })

/*charactersRouter
    .route('/:characterId')
    .get((req, res, next) => {
       const knexInstance = req.app.get('db')
       const { id } = req.params
       CharactersService.getCharacterbyId(knexInstance, id)
    })*/

module.exports = charactersRouter;