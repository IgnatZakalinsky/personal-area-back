import express from 'express'
import {addPlaylist} from './p1-controllers/addPlaylist'
import {getPlaylists} from './p1-controllers/getPlaylist'

const playlists = express.Router()

playlists.post('/', addPlaylist)
playlists.get('/', getPlaylists)


export default playlists
