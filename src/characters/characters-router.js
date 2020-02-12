const express = require('express');
const CharactersService = require('./characters-service');
const charactersRouter = express.Router();
const jsonParser = express.json()

charactersRouter
    .route('/')
    .get((req, res, next) => {
       const knexInstance = req.app.get('db')
        CharactersService.getAllCharacters(knexInstance)
            .then(characters => {
                res.json(characters.map(char => CharactersService.serializeCharacter(char)))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        for (const field of ['character_name', 'general_desc']) {
            if(!req.body[field]) {
                return res.status(400).send(`'${field}' is required`)
            }
        }

        const {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img, user_id} = req.body;
        const newCharacter = {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img, user_id};

        const knexInstance = req.app.get('db');

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