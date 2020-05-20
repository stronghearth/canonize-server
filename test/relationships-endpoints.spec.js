const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Relationship Endpoints', function () {
    let db

    const {
        testUsers,
        testCharacters,
        testRelationships
    } = helpers.makeFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db' , () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/relationships`, () => {
        context('given there are no relationships in user account', () => {
            beforeEach('insert users', () => {
                return helpers.seedUsers(
                    db,
                    testUsers
                )
            })
            it('responds with a 200 and an empty list', () => {
                const testUser = testUsers[0]
                return supertest(app)
                        .get(`/api/relationships`)
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(200, [])
            })
        })
        context('given there are relationships in user account', () => {
            beforeEach('insert users, characters, and relationships', () => {
                return helpers.seedUsers(
                    db,
                    testUsers
                )
                .then(() => helpers.seedCharacters(db, testCharacters))
                .then(() => helpers.seedRelationships(db, testRelationships))
            })
            it('responds with a 200 and an array of relationships', () => {
                const testUser = testUsers[0]
                const expectedCharacterOneName = testCharacters[0].character_name
                const expectedCharacterTwoName = testCharacters[1].character_name
                const expectedRelationship = [{
                    id: testRelationships[0].id,
                    character_one: expectedCharacterOneName,
                    character_two: expectedCharacterTwoName,
                    relationship_desc: testRelationships[0].relationship_desc,
                    antagonistic: testRelationships[0].antagonistic,
                    friendly: testRelationships[0].friendly,
                    mentor_mentee: testRelationships[0].mentor_mentee,
                    business: testRelationships[0].business,
                    romantic: testRelationships[0].romantic,
                    id_user: testRelationships[0].id_user,
                    created_date: testRelationships[0].created_date
                }]
                
                return supertest(app)
                        .get(`/api/relationships`)
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(200, expectedRelationship)
            })
        })
    })
})