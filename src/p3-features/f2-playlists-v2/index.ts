import express from 'express'
import {addPlaylist} from './p1-controllers/addPlaylist';

const playlists2 = express.Router()

playlists2.post('/', addPlaylist)
// playlists.get('/', getPlaylists)
// playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
// playlists.put('/', putPlaylist)


export default playlists2
