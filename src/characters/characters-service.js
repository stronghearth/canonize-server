const xss = require('xss');

const CharacterService = {
    getAllCharactersByUser(db, user) {
        return db 
            .from('canonize_characters')
            .select()
            .where('user_id', user.id)
            .orderBy('date_created', 'desc')
    },
    getCharacterbyId(db, id) {
        return db
                .from('canonize_characters')
                .select()
                .where('id', id)
                .first()
    },
    insertCharacter(db, newCharacter) {
        return db  
                .insert(newCharacter)
                .into('canonize_characters')
                .returning('*')
    },
    serializeCharacter(character) {
        return {
            id: character.id,
            character_name: xss(character.character_name),
            age: xss(character.age),
            gender: xss(character.gender),
            strongest_bonds: xss(character.strongest_bonds),
            antagonist: xss(character.antagonist),
            appearance: xss(character.appearance),
            mannerisms: xss(character.mannerisms),
            general_desc: xss(character.general_desc),
            art_img: xss(character.art_img),
            date_created: character.date_created,
            date_modified: character.date_modified,
            user_id: character.user_id
        }
    }
}

module.exports = CharacterService