import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {resCookie} from '../../../p2-main/cookie'
import {ADMIN_PASS} from './logIn'
import {instance} from '../../../p0-config/config'

export const me = async (req: Request, res: Response) => {
    const {token} = req.cookies
    if (token) {
        if (token === ADMIN_PASS) {
            resCookie(res, token, ADMIN_PASS + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                .status(200).json({user: {
                    id: 3,
                    level: 100000,
                    telegramId: 746128012,
                    lastUpdateDate: '2020-12-30T10:09:01.0488913Z',
                    inactive: false,
                    courseId: 1,
                    courseTitle: 'Front-end developer',
                    firstName: 'Игнат',
                    lastName: 'Закалинский',
                    isAdmin: true
                }})
        } else {
            try {
                const p = await instance.get('api/friends/auth/students/by-token/' + token)
                console.log('ok: ', {...p})

                // if (p.data.resultCode === 1) {
                //     status400(res, p.data.messages[0], "me")
                // } else {
                resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                    .status(200).json({user: p.data})
                // }
            } catch (e) {
                status500(res, {...e}, "me", {token})
                console.log('error: ', e)
            }
        }
    } else status400(res, "no token in cookies!", "me", {cookies: req.cookies})
};
