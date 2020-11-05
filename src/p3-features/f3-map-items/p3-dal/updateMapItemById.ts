import MapItem , {MapItemType} from '../p0-models/mapItem'

export const updateMapItemById = (id: string, mapItem: MapItemType) => {

    return MapItem.findByIdAndUpdate(id, mapItem, {new: true})
        .exec()
}
