export const Checker = {
    string(item: string | undefined, def: string | undefined) {
        return (item === '')
            ? ''
            : !item ? def : item
    },
    number(item: number | undefined, def: number) {
        return (item === 0)
            ? 0
            : !item ? def : item
    },
    arrayString(item: string[], def: string[]) {
        return item.length > 0 && !item[0]
            ? def : item
    },

}
