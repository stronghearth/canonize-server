const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Relationship Endpoints', function () {
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
    describe('POST /api/relationships', () => {
        beforeEach('insert users and characters', () => {
            return helpers.seedUsers(
                db,
                testUsers
            )
            .then(() => helpers.seedCharacters(db, testCharacters))
        })
        it('adds new relationship to designated user, returns 201 and new relationship', () => {
            this.retries(3)
            const newRelationship = {
                character_one: testCharacters[0].id,
                character_two: testCharacters[3].id,
                relationship_desc: 'i am a new relationship',
                antagonistic: 0,
                friendly: 6,
                mentor_mentee: 10,
                business: 10,
                romantic: 0,
            }
            const expectedCharacterOneName = testCharacters[0].character_name
            const expectedCharacterTwoName = testCharacters[3].character_name
            const testUser = testUsers[0]
            return supertest(app)
                    .post('/api/relationships')
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .send(newRelationship)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.character_one).to.eql(expectedCharacterOneName)
                        expect(res.body.character_two).to.eql(expectedCharacterTwoName)
                        expect(res.body.relationship_desc).to.eql(newRelationship.relationship_desc)
                        expect(res.body.antagonistic).to.eql(newRelationship.antagonistic)
                        expect(res.body.friendly).to.eql(newRelationship.friendly)
                        expect(res.body.mentor_mentee).to.eql(newRelationship.mentor_mentee)
                        expect(res.body.business).to.eql(newRelationship.business)
                        expect(res.body.romantic).to.eql(newRelationship.romantic)
                        expect(res.body.id_user).to.eql(testUser.id)
                        expect(res.headers.location).to.eql(`/api/relationships/${res.body.id}`)
                        const expectedDate = new Date().toLocaleString()
                        const actualDate = new Date(res.body.created_date).toLocaleString()
                        expect(actualDate).to.eql(expectedDate)
                    })
        })
    })
    describe(`GET /api/relationships/:id`, () => {
        beforeEach('insert users, characters, and relationships', () => {
            return helpers.seedUsers(
                db,
                testUsers
            )
            .then(() => helpers.seedCharacters(db, testCharacters))
            .then(() => helpers.seedRelationships(db, testRelationships))
        })

        it('retrieves one specific relationship depending on the id provided', () => {
            const testUser = testUsers[0]
            const testRelationshipId = testRelationships[0].id
            const expectedCharacterOneName = testCharacters[0].character_name
            const expectedCharacterTwoName = testCharacters[1].character_name
            const expectedRelationship = {id: testRelationships[0].id,
                character_one: expectedCharacterOneName,
                character_two: expectedCharacterTwoName,
                relationship_desc: testRelationships[0].relationship_desc,
                antagonistic: testRelationships[0].antagonistic,
                friendly: testRelationships[0].friendly,
                mentor_mentee: testRelationships[0].mentor_mentee,
                business: testRelationships[0].business,
                romantic: testRelationships[0].romantic,
                id_user: testRelationships[0].id_user,
                created_date: testRelationships[0].created_date}
            return supertest(app)
                        .get(`/api/relationships/${testRelationshipId}`)
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .expect(200, expectedRelationship)

        })
    })
})