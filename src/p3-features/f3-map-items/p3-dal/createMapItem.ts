import MapItem, {MapItemType} from '../p0-models/mapItem'

export const createMapItem = (checkedMapItem: MapItemType) => {
    return MapItem.create({
        ...checkedMapItem,
        created: new Date(),
        updated: new Date(),
    })
}
