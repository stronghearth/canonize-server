const xss = require('xss');

const CharacterService = {
    getAllCharacters(db) {
        return db 
            .from('canonize_characters')
            .select()
            .orderBy('date_created', 'desc')

    }
}

module.exports = CharacterService