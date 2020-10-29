import Playlist from '../p0-models/playlist'

export const readPlaylists = (find: any, sort: any, itemForPageCount = 1000, pageNumber = 1) => {

    return Playlist.find(find)
        .sort(sort)
        .skip(itemForPageCount * (pageNumber - 1))
        .limit(itemForPageCount)
        .lean()
        .exec()
}
