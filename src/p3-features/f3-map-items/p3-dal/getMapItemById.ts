import MapItem from '../p0-models/mapItem'

export const getMapItemById = (id: string) => {

    return MapItem.findById(id)
        .exec()
}
