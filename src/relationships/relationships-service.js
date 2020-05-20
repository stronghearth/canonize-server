const xss = require('xss')

const RelationshipService = {
    getRelationshipsByUser(db, id) {
        return db
                .select('*', 'character_name')
                .from('canonize_relationships')
                .rightJoin('canonize_characters', ['character_one', 'character_two'], 'canonize_characters.id')
                .where('id_user', id)
                .orderBy('canonize_relationships.created_date', 'desc')
    },

}

module.exports = RelationshipService