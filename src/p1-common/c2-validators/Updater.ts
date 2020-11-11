export const Updater = {
    string(item: string | undefined, oldItem: string) {
        return (item === '')
            ? ''
            : !item ? oldItem : item
    },
    number(item: number | undefined, oldItem: number) {
        return (item === 0)
            ? 0
            : !item ? oldItem : item
    },
    arrayString(item: string[], oldItem: string[]) {
        return item.length > 0 && !item[0]
            ? oldItem : item
    },

}
