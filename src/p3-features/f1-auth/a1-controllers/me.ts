import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {resCookie} from '../../../p2-main/cookie'
import {instance} from './logIn'

export const me = async (req: Request, res: Response) => {
    const {token} = req.cookies
    if (token) {
        try {
            const p = await instance.get('api/friends/auth/students/by-token/' + token)
            console.log('ok: ', {...p.data})

            if (p.data.resultCode === 1) {
                status400(res, p.data.messages[0], "me")
            } else {
                resCookie(res, p.data.data.token).status(200).json(p.data.data)
            }
        } catch (e) {
            status500(res, {...e}, "me", {token, response: e.response.data})
            console.log('error: ', e.response.data)
        }
    } else status400(res, "no token in cookie!", "me", {cookie: req.body.cookie})
};
