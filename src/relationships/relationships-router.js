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
    })


module.exports = relationshipsRouter