export class Validators {
    static string<D>(item: string | undefined, def: string | D) {
        return (item === '')
            ? ''
            : !item ? def : item
    }

    static number<D>(item: number | undefined, def: number | D) {
        return (item === 0)
            ? 0
            : !item ? def : item
    }

    static array<D, T>(item: T[] | undefined, def: T[] | D, checkType: T) {
        const answer = item && item.constructor === Array && item

        let i = 0
        if (answer) {

            while (answer.length > i && typeof answer[i] === typeof checkType) {
                i++
            }
        }

        if (!answer || answer.length !== i) {
            return def
        } else {
            return answer
        }
    }
}
