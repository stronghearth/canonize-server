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
                .select('cr.id' , 'cr.antagonistic', 'cr.friendly', 'cr.business', 'cr.relationship_desc', 'cr.mentor_mentee', 'cr.romantic', 'cr.created_date', 'cr.id_user', 'c1.character_name AS character_one', 'c2.character_name AS character_two')
                .from('canonize_relationships AS cr')
                .join('canonize_characters AS c1', 'cr.character_one', 'c1.id')
                .join('canonize_characters AS c2', 'cr.character_two', 'c2.id')
                .where('cr.id', id)
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
    },
    serializeRelationship(rel) {
        return {
            id: rel.id,
            character_one: xss(rel.character_one),
            character_two: xss(rel.character_two),
            relationship_desc: xss(rel.relationship_desc),
            antagonistic: rel.antagonistic,
            friendly: rel.friendly,
            mentor_mentee: rel.mentor_mentee,
            business: rel.business,
            romantic: rel.romantic,
            id_user: rel.id_user,
            created_date: rel.created_date
        }
    }
}

module.exports = RelationshipService