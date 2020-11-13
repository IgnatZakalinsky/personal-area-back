import express from 'express'
import {addPlaylist} from './p1-controllers/addPlaylist'
import {getPlaylists} from './p1-controllers/getPlaylist'
import {putPlaylist} from './p1-controllers/putPlaylist'
import {PlaylistController} from './p1-controllers'

const playlists = express.Router()

playlists.post('/', addPlaylist)
playlists.get('/', getPlaylists)
playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
playlists.put('/', putPlaylist)


export default playlists
