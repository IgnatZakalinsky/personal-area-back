import express from 'express'
import {addMapItem} from './p1-controllers/addMapItem'
import {deleteMapItem} from './p1-controllers/deleteMapItem'
import {putMapItem} from './p1-controllers/putMapItem'
import {getMapItems} from './p1-controllers/getMapItems'

const mapItems = express.Router()

mapItems.post('/', addMapItem)
mapItems.get('/', getMapItems)
mapItems.delete('/:id?', deleteMapItem)
mapItems.put('/', putMapItem)


export default mapItems
