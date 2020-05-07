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
                return helpers.seedUsers(
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
                return helpers.seedUsers(
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
        beforeEach('insert users and characters', () => {
            return helpers.seedUsers(
                db,
                testUsers
            )
            .then(() => helpers.seedCharacters(db, testCharacters))
        })
        it('returns specified character by id', () => {
            const testUser = testUsers[2]
            const id = testCharacters[2].id
            expectedCharacter = testCharacters[2]
            return supertest(app)
                    .get(`/api/characters/${id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, expectedCharacter)
        })
    })
    describe.only('POST /api/characters', () => {
        beforeEach('insert users and characters', () => {
            return helpers.seedUsers(
                db,
                testUsers
            )
            .then(() => helpers.seedCharacters(db, testCharacters))
        })
        it(`adds new character to designated user, returns 201 and new character `, () => {
            this.retries(3)
            const newCharacter = {
                character_name: 'Joe Schmoe',
                age: '7',
                gender: 'he/him',
                strongest_bonds: 'most animals',
                antagonist: 'most people',
                appearance: 'a regular dude',
                mannerisms: 'slight eye twitch',
                general_desc: 'Hey I am Joe',
                art_img: 'https://exampleurl.com'
            }
            const testUser = testUsers[0]
            return supertest(app)
                        .post('/api/characters')
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .send(newCharacter)
                        .expect(201)
                        .expect(res => {
                            expect(res.body).to.have.property('id')
                            expect(res.body.character_name).to.eql(newCharacter.character_name)
                            expect(res.body.age).to.eql(newCharacter.age)
                            expect(res.body.gender).to.eql(newCharacter.gender)
                            expect(res.body.strongest_bonds).to.eql(newCharacter.strongest_bonds)
                            expect(res.body.antagonist).to.eql(newCharacter.antagonist)
                            expect(res.body.mannerisms).to.eql(newCharacter.mannerisms)
                            expect(res.body.art_img).to.eql(newCharacter.art_img)
                            expect(res.body.user_id).to.eql(testUser.id)
                            expect(res.headers.location).to.eql(`/api/characters/${res.body.id}`)
                            const expectedDate = new Date().toLocaleString()
                            const actualDate = new Date(res.body.date_created).toLocaleString()
                            expect(actualDate).to.eql(expectedDate)
                        })
        })
    })
})