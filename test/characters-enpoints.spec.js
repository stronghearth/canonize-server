const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Characters Endpoints', function () {
    let db

    const {
        testUsers,
        testCharacters
    } = helpers.makeFixtures()

    before('make knex instance', () => {
        db= knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))
    
    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/characters`, () => {
        context(`Given no characters are in user account`, () => {
            beforeEach('insert users', () => {
                helpers.seedUsers(
                    db,
                    testUsers
                )})
            it('responds with a 200 and an empty list', () => {
                const testUser = testUsers[0]
                return supertest(app)
                        .get('/api/characters')
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(200, [])
            })
        })
        context(`Given there are characters in user account`, () => {
            beforeEach('insert characters', () => {
                helpers.seedUsers(
                    db,
                    testUsers
                )
                .then(() => helpers.seedCharacters(db, testCharacters))
                
            })
            it('responds with a 200 and list of characters', () => {
                const expectedCharacter = testCharacters[0]
                const expectedCharactersArray = [expectedCharacter]
                const testUser = testUsers[0]
                return supertest(app)
                            .get('/api/characters')
                            .set('Authorization', helpers.makeAuthHeader(testUser))
                            .expect(200, expectedCharactersArray)
            })
        })
    })
    describe('GET /api/characters/:id', () => {
        beforeEach('insert users', () => {
            helpers.seedUsers(
                db,
                testUsers
            )})
        
    })
})