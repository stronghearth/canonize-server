const express = require('express');
const path = require('path');
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
                    .location(path.posix.join(req.originalUrl, `/${character.id}`))
                    .json(CharactersService.serializeCharacter(character))
            })
            .catch(next)
    })

charactersRouter
    .route('/:id')
    .all(requireAuth)
    .all((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db');

        CharactersService.getCharacterbyId(knexInstance, id)
            .then(character => {
                if(!character) {
                    return res
                            .status(404)
                            .json({
                                error: { message: 'Character not found'}
                            })
                }
                res.character = character
                next()
            })
            .catch(next)
        })
    .get((req, res) => {
        res.json(CharactersService.serializeCharacter(res.character))
    })
    .patch(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img} = req.body;
        const {id} = req.params;
        
        const characterToUpdate = {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img};

        characterToUpdate.date_created = new Date()

        const numberOfValues = Object.values(characterToUpdate).filter(Boolean).length
            if(numberOfValues === 0) {
                return res.status(400).json({
                    error: {
                        message: `Request must include either 'character_name', 'age', 'gender', 'strongest_bonds', 'antagonist', 'appearance', 'mannerisms', 'general_desc', or 'art_img'`
                    }
                })
            }
        CharactersService.updateCharacter(
            knexInstance,
            id,
            characterToUpdate
        )
        .then(charAffected => {
            return res
            .status(204)
            .json(CharactersService.serializeCharacter(charAffected))
            .end()
        })
        .catch(next)
    })
    .delete((req, res, next) => {
      const knexInstance = req.app.get('db')
      const { id } = req.params

      CharactersService.deleteCharacter(knexInstance, id)
            .then(charAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = charactersRouter;