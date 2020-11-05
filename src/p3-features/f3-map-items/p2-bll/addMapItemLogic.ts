import {createMapItem} from '../p3-dal/createMapItem'
import {MapItemType} from '../p0-models/mapItem'

export const addMapItemLogic = (checkedMapItem: MapItemType) => {
    return createMapItem(checkedMapItem)
}
