const express = require('express');
const path = require('path');
const RelationshipService = require('./relationships-service');
const { requireAuth } = require('../middleware/jwt-auth');
const relationshipsRouter = express.Router();
const jsonParser = express.json();

relationshipsRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const user = req.user

        RelationshipService.getRelationshipsByUser(knexInstance, user.id)
            .then(rels => {
                res.json(rels.map(rel => RelationshipService.serializeRelationship(rel)))
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

        RelationshipService.insertRelationship(knexInstance, newRelationship)
            .then(rel => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${rel.id}`))
                    .json(rel)
            })
            .catch(next)
    })

    relationshipsRouter
        .route('/:id')
        .all(requireAuth)
        .all((req, res, next) => {
            const knexInstance = req.app.get('db')
            const { id } = req.params

            RelationshipService.getRelationshipById(knexInstance, id)
                .then(rel => {
                    if(!rel) {
                        return res  
                                .status(404)
                                .json({
                                    error: {message: 'Relationship not found'}
                                })
                    }
                    res.relationship = rel
                    next()
                })
                .catch(next)
        })
        .get((req, res) => {
            res.json(RelationshipService.serializeRelationship(res.relationship))
        })


module.exports = relationshipsRouter