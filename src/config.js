module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/canonize',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://postgres@localhost/canonize-test",
    JWT_SECRET: process.env.JWT_SECRET || 'i-am-a-lich-mimic-hear-my-random-flute',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3hrs'
}