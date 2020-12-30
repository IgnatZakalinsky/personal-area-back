import express from 'express'
import {logIn} from './a1-controllers/logIn'
import {me} from './a1-controllers/me'
import {logOut} from './a1-controllers/logOut'

const auth = express.Router()

auth.post('/login', logIn)
auth.get('/me', me)
auth.get('/logout', logOut)

export default auth
