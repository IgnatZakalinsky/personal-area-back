import MapItem from '../p0-models/mapItem'

export const readMapItems = (find: any, sort: any, itemForPageCount = 1000, pageNumber = 1) => {

    return MapItem.find(find)
        .sort(sort)
        .skip(itemForPageCount * (pageNumber - 1))
        .limit(itemForPageCount)
        .lean()
        .exec()
}
