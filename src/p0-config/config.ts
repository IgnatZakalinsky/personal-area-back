const USER_NAME = process.env.MONGO_DB_USER_NAME || 'ai73aaa' // user name for test db
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || '1qazxcvBG' // user password for test db
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'neko0-iwojt.mongodb.net/nekobd' // db for tests

export const MONGO_DB_URIS = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`

export const IS_DEVELOPER_VERSION = true // false if release

export const VERSION_1_0 = '/1.0'
