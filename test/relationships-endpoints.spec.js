const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

// describe('Relationship Endpoints', function () {
//     let db

//     const {
//         testUsers,
//         testCharacters,
//         testRelationships
//     } = helpers.makeFixtures()

//     before('make knex instance', () => {
//         db = knex({
//             client: 'pg',
//             connection: process.env.TEST_DB_URL
//         })
//         app.set('db', db)
//     })

//     after('disconnect from db' , () => db.destroy())

//     before('cleanup', () => helpers.cleanTables(db))

//     afterEach('cleanup', helpers.cleanTables(db))

//     describe(`GET /api/relationships`, () => {
//         context('given there are no relationships in user account', () => {
//             beforeEach('insert users', () => {
//                 return helpers.seedUsers(
//                     db,
//                     testUsers
//                 )
//             })
//             it('responds with a 200 and an empty list', () => {
//                 const testUser = testUsers[0]
//                 return supertest(app)
//                         .get(`/api/relationships`)
//                         .set('Authorization', helpers.makeAuthHeader(testUser))
//                         .expect(200, [])
//             })
//         })
//     })
// })