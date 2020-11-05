import MapItem from '../p0-models/mapItem'

export const countMapItems = (find: any) => {

    return MapItem.count(find)
        .exec()
}
