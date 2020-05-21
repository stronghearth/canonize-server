const express = require('express');
const path = require('path');
const RelationshipsService = require('./relationships-service');
const { requireAuth } = require('../middleware/jwt-auth');
const relationshipsRouter = express.Router();
const jsonParser = express.json();

relationshipsRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const user = req.user

        RelationshipsService.getRelationshipsByUser(knexInstance, user.id)
            .then(relationships => {
                res.json(relationships)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const user = req.user
        const {character_one, character_two, relationship_desc, antagonistic, friendly, mentor_mentee, business, romantic} = req.body
        const newRelationship = {character_one, character_two, relationship_desc, antagonistic, friendly, mentor_mentee, business, romantic}

        for (const field of ['character_one', 'character_two', 'relationship_desc']) {
            if(!req.body[field]) {
                return res.status(400).send(`'${field}' is required`)
            }
        }

        newRelationship.id_user = user.id

        RelationshipsService.insertRelationship(knexInstance, newRelationship)
            .then(relationship => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${relationship.id}`))
                    .json(relationship)
            })
            .catch(next)
    })


module.exports = relationshipsRouter