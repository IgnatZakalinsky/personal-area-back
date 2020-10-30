import express from 'express'
import {addPlaylist} from './p1-controllers/addPlaylist'
import {getPlaylists} from './p1-controllers/getPlaylist'
import {deletePlaylist} from './p1-controllers/deletePlaylist'
import {putPlaylist} from './p1-controllers/putPlaylist'

const playlists = express.Router()

playlists.post('/', addPlaylist)
playlists.get('/', getPlaylists)
playlists.delete('/:id?', deletePlaylist)
playlists.put('/', putPlaylist)


export default playlists
