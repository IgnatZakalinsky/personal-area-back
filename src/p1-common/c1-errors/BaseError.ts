import {Response} from 'express'

export type BaseErrorType = {
    type: 400 | 500 // код ошибки, можно расширять
    e: any // текст ошибки или ошибка
    inTry: string // где произошла ошибка
    more?: any // данные, которые могут помочь понять в чём ошибка
}

export class BaseError {
    constructor(error: BaseErrorType) {
        this.type = error.type
        this.e = error.e
        this.inTry = error.inTry
        this.more = error.more
    }

    type: 400 | 500
    e: any
    inTry: string
    more?: any

    send(res: Response) {
        res.status(this.type).json({
            more: this.more,
            inTry: this.inTry,
            errorObj: this.type === 500 ? {...this.e} : undefined, // превращение ошибки в объект
            error: this.type === 500
                ? 'some error: ' + this.e.message
                : this.e,
            info: this.type === 500 // стандартное описание ошибки
                ? "Back doesn't know what the error is... ^._.^"
                : 'Check your request! /ᐠ-ꞈ-ᐟ\\',
        })
    }
}
