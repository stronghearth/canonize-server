const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function makeUsersArray () {
    return [
        {
            id: 1,
            user_name: 'test-user-1',
            password: 'password',
            full_name: 'Test user 1',
            date_created: '2029-01-22T16:28:32.615Z',
            date_modified: null
          },
          {
            id: 2,
            user_name: 'test-user-2',
            full_name: 'Test user 2',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
            date_modified: null
          },
          {
            id: 3,
            user_name: 'test-user-3',
            full_name: 'Test user 3',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
            date_modified: null
          },
          {
            id: 4,
            user_name: 'test-user-4',
            full_name: 'Test user 4',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
            date_modified: null
          },
    ]
}

function makeCharactersArray (users) {
    return [
        {
            id: 1,
            character_name: 'Test Character One',
            age: '1',
            gender: 'neutral',
            strongest_bonds: '1',
            antagonist: '1',
            appearance: '1',
            mannerisms: '1',
            general_desc: 'I am test one',
            date_created: '2029-01-22T16:28:32.615Z',
            art_img: 'https://exampleurl.com',
            user_id: users[0].id,
            date_modified: null
        },
        {
            id: 2,
            character_name: 'Test Character Two',
            age: '2',
            gender: 'neutral',
            strongest_bonds: '2',
            antagonist: '2',
            appearance: '2',
            mannerisms: '2',
            general_desc: 'I am test two',
            date_created: '2029-01-22T16:28:32.615Z',
            art_img: 'https://exampleurl.com',
            user_id: users[1].id,
            date_modified: null
        },
        {
            id: 3,
            character_name: 'Test Character Three',
            age: '3',
            gender: 'neutral',
            strongest_bonds: '3',
            antagonist: '3',
            appearance: '3',
            mannerisms: '3',
            general_desc: 'I am test three',
            date_created: '2029-01-22T16:28:32.615Z',
            art_img: 'https://exampleurl.com',
            user_id: users[2].id,
            date_modified: null
        },
        {
            id: 4,
            character_name: 'Test Character Four',
            age: '4',
            gender: 'neutral',
            strongest_bonds: '4',
            antagonist: '4',
            appearance: '4',
            mannerisms: '4',
            general_desc: 'I am test four',
            date_created: '2029-01-22T16:28:32.615Z',
            art_img: 'https://exampleurl.com',
            user_id: users[3].id,
            date_modified: null
        },
    ]
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('canonize_users').insert(preppedUsers)
              .then(() => 
                db.raw(
                  `SELECT setval('canonize_users_id_seq', ?)`,
                  [users[users.length -1].id],
                  )
              )
}

function seedCharacters(db, characters) {
    return db.into('canonize_characters').insert(characters)
}

function cleanTables(db) {
    return db.raw(
      `TRUNCATE 
      canonize_characters,
      canonize_users
      RESTART IDENTITY CASCADE`
    )
  }

function makeFixtures() {
    const testUsers = makeUsersArray()
    const testCharacters = makeCharactersArray(testUsers)
    return {testUsers, testCharacters}
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
           subject: user.user_name,
           algorithm: 'HS256',
         })
    return `bearer ${token}`
  }

  module.exports = {
      makeUsersArray,
      makeCharactersArray,
      makeAuthHeader,
      makeFixtures,
      cleanTables,
      seedCharacters,
      seedUsers
  }