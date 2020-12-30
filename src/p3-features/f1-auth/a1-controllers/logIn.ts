import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {resCookie} from '../../../p2-main/cookie'
import {instance} from '../../../p0-config/config'

export const ADMIN_PASS = process.env.ADMIN_PASS || 'xxx'

export const logIn = async (req: Request, res: Response) => {
    const {token} = req.body
    if (token) {

        if (token === ADMIN_PASS) {
            resCookie(res, ADMIN_PASS, ADMIN_PASS + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                .status(200).json({login: true})
        } else {
            try {
                const p = await instance.post(
                    'api/friends/auth/login',
                    {tempPassword: token}
                )
                console.log('ok: ', {...p.data})

                if (p.data.resultCode === 1) {
                    status400(res, 'login password not valid!', "login", {errors: p.data.messages})
                } else {
                    resCookie(res, p.data.data.token,
                        p.data.data.token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                        .status(200).json({login: true})
                }
            } catch (e) {
                console.log('error: ', {...e})
                status500(res, {...e}, "login", {token})
            }
        }
    } else status400(res, "no token in body!", "login", {body: req.body})
};
