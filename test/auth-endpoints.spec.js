const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')

describe('Auth Endpoints', function() {
    let db
    
    const {testUsers} = helpers.makeFixtures()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))
    
    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`POST /api/auth/login`, () => {
        beforeEach('insert users', () => 
            helpers.seedUsers(
                db,
                testUsers,
            )
        )

        it('responds 200 and JWT auth token using secret when valid credentials', () => {
            const validUserCreds = {
                user_name: testUser.user_name,
                password: testUser.password
            }
            const expectedToken = jwt.sign(
                {user_id: testUser.id},
                process.env.JWT_SECRET,
                {
                    subject: testUser.user_name,
                    expiresIn: process.env.JWT_EXPIRY,
                    algorithm: 'HS256',
                }
            )
            console.log('Expected Token =>', expectedToken)
                return supertest(app)
                        .post('/api/auth/login')
                        .send(validUserCreds)
                        .expect(200, {
                            authToken: expectedToken
                        })
            
        })
    })
})