import MapItem from '../p0-models/mapItem'

export const removeMapItemById = (id: string) => {

    return MapItem.findByIdAndDelete(id)
        .exec()
}
