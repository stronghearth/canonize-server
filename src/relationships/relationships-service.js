const xss = require('xss')

const RelationshipService = {
    getAllRelationships(db) {
        return db
                .select('*', 'character_name')
                .from('canonize_relationships')
                .rightJoin('canonize_characters', 'character_one', 'canonize_characters.id')
                .rightJoin('canonize_characters', 'character_two', 'canonize_characters.id')
    }
}

module.exports = RelationshipService