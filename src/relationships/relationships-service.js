const xss = require('xss')

const RelationshipService = {
    getRelationshipsByUser(db, id) {
        return db
                .select('canonize_relationships.*', 'c1.character_name AS character_one', 'c2.character_name AS character_two')
                .from('canonize_relationships')
                .join('canonize_characters AS c1', 'canonize_relationships.character_one', 'c1.id')
                .join('canonize_characters AS c2', 'canonize_relationships.character_two', 'c2.id')
                .where('id_user', id)
                .orderBy('canonize_relationships.created_date', 'desc')
    },
    getRelationshipById(db, id) {
        return db
                .from('canonize_relationships')
                .select()
                .where('id', id)
                .first()
    },
    insertRelationship(db, newRelationship) {
        return db
                .insert(newRelationship)
                .into('canonize_relationships')
                .returning('*')
                .then(([relationship]) => relationship)
                .then(relationship =>
                    RelationshipService.getRelationshipById(db, relationship.id))
    }
}

module.exports = RelationshipService