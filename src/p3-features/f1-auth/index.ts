import express from 'express'
import {logIn} from './a1-controllers/logIn'
import {me} from './a1-controllers/me'

const auth = express.Router()

auth.post('/login', logIn)
auth.get('/me', me)

export default auth
