import express from 'express'
import mongoose from 'mongoose'
import {MONGO_DB_URIS} from './p0-config/config'
import {appUse} from './p2-main/app'
import {routes} from './p2-main/routes'

const app = express()

appUse(app)
routes(app)

mongoose.connect(MONGO_DB_URIS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log('MongoDB connected successfully!') // need log always

        app.listen(process.env.PORT, () => {
            console.log('personal-area-back listening on port: ' + process.env.PORT) // need log always
        })
    })
    .catch(e => console.log('!!! MongoDB connection error: ', e)) // need log always

process.on('unhandledRejection', (reason, p) => {
    console.log('!!! UnhandledRejection: ', reason, p) // need log always
})
